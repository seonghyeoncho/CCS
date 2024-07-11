# AWS와 Github action을 통해서 파이프 라인을 구축하는 방법


## *가장 저예산으로 할 수 있는 방법이지만, 보안상 좋은 방법은 아닙니다.*

- github -> s3 -> codedeploy -> EC2

정적파일을 배포할 거라면 EC2까지 갈 필요도 없습니다.

# GitHub Action

먼저 루트에 .github/workflows 디렉토리를 생성해야 합니다.

```
|_.github
|        |_workflows
|                  |_deploly.yml
|_src/*
```

실행할 모든 플로우는 workflows 하위에 생성하면 자동으로 실행됩니다.

workflow를 작성하는 방법은 Github 공식 사이트에서 모든 내용을 알 수 있습니다.

각 프로그램에 맞는 방법들을 알려주고 있으니 여기 없다면 [여기에서](https://docs.github.com/ko/actions) 확인하면 됩니다.

또한 레포지토리에서 이미 작성된 workflow를 사용하거나 직접 작성할 수 있습니다.

저는 다음과 같은 방법으로 해당 파일을 작성합니다. 




이 workflow에서 빌드를 하다보면 시간이 오래 걸리는 경우가 있습니다.

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: npm install, build, and test
      run: |
        npm install
        npm run build --if-present
        npm run test --if-present

    - name: Upload artifact for deployment job
      uses: actions/upload-artifact@v3
      with:
        name: node-app
        path: .
```

github action은 매번 새로운 환경을 만들고, 이 환경 위해서 해당 프로그램을 빌드하는 하게 됩니다.

이 때문에 시간이 많이 소요될 수 있기에 Action의 cache를 이용하도록 합니다.

캐싱에 관한 자세한 내용은 [공식 문서](https://docs.github.com/ko/actions/using-workflows/caching-dependencies-to-speed-up-workflows)에서 확인할 수 있습니다.

```yml
- name: Cache node modules
    id: cache-npm
    uses: actions/cache@v3
    env:
      cache-name: cache-node-modules
    with:
      # npm cache files are stored in `~/.npm` on Linux/macOS
      path: ~/.npm
      key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-build-${{ env.cache-name }}-
        ${{ runner.os }}-build-
        ${{ runner.os }}-
  - if: ${{ steps.cache-npm.outputs.cache-hit != 'true' }}
    name: List the state of node modules
    continue-on-error: true
    run: npm list

  - name: Install dependencies
    run: npm install

```


캐싱 가능한 크기는 5GB입니다. 이 크기를 넘어가게 되면 Miss Rate가 증가하게 되니 상황에 맞는 캐싱 전략을 구상하면 좋을 것 같습니다.

예를 들어 파일의 크기가 크고 변하지 않는 종속성 파일은 무조건 캐싱하고 변화에 대한 가능성이 높은 종속성 파일은 캐싱의 순위를 뒤로 미루는 전략을 취할 수 있을 것 같습니다.


# S3
위 과정을 통해서 빌드된 파일을 이제는 S3에 올려야 합니다.

압축을 해야 비용이 줄어드니 압축하는 과정도 있어야 합니다.압축한 파일의 이름이 고정된 상태라면 보안 측면에서 취약하므로
매번 값이 바뀔 수 있도록 합니다.

```yml
- name: Make zip file
    # $GITHUB_SHA는 github에서 기본으로 제공되는 환경변수로 고유합니다.
    run: zip -r $GITHUB_SHA.zip build/libs/*.jar scripts/*.sh appspec.yml
    shell: bash
```
빌드한 파일을 압축했다면 이젠 진짜 S3에 올릴 차례입니다.

github action을 통해서 AWS의 서비스를 이용하기 위해서는 AWS 자격 증명을 해야합니다.

```yml
- name: Configure AWS credentials
  uses: aws-action/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ${{ secrets.AWS_REGION }}
```

민감한 정보는 모두 시크릿에 감춰야합니다.

이제는 진짜 올릴 수 있습니다.

```yml
- name: Upload to S3
  run: aws s3 cp --region ap-northeast-2 ./$GITHUB_SHA.zip s3://$S3_BUCKET_NAME/$GITHUB_SHA.zip
```
이렇게 S3에 파일이 올라갔습니다. 현재 상태로 계속 파일을 올리기만하면 파일이 쌓이게 되니 나중에는 람다나 s3의 설정을 통해서 파일을 관리할 수 있게 합니다.

# CodeDeploy
s3에 올라갔다면 EC2에 배포를 해야합니다.

설정은 간단합니다. AWS에 CodeDeploy Agent를 설치합니다.

CodeDeploy의 애플리케이션을 생성하고 배포 그룹을 만들어줍니다.

```yml
- name: Code Deploy  
  run: |
    aws deploy create-deployment \
    --deployment-config-name CodeDeployDefault.AllAtOnce \
    --application-name ${{ env.CODE_DEPLOY_APPLICATION_NAME }} \
    --deployment-group-name ${{ env.CODE_DEPLOY_DEPLOYMENT_GROUP_NAME }} \
    --s3-location bucket=$S3_BUCKET_NAME,bundleType=zip,key=$GITHUB_SHA.zip \
    --region ${{ secrets.AWS_REGION }} --file-exists-behavior OVERWRITE

```

애플리케이션의 이름, 그룹이름, 올릴 파일, 리전을 입력하면 S3에 올라간 파일을 CodeDeploy를 통해 EC2에 배포될 수 있습니다.