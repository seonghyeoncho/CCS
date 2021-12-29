# Slack을 이용해서 CodeDeploy Report 만들기

현재 맡고 있는 팀에서 CI/CD 과정은 다음과 같다.
`git [push]` -> `Github Action` -> `Upload to S3` -> `CodeDeploy` -> `EC2`

이 과정에서 수동으로 AWS에 들어가서 `CodeDelpoy`배포를 확인했어야 했고, 매우 불편했다.

물론 처음에 잘 짜놓고 예측 가능하도록 해야하지만, 아직 미흡한 점이 많기 때문에 몸이 조금 더 편하고자 팀에서 사용하고 있는 Slack과 연동하여 알림을 받도록 만들어 보았다.

여기서 받고 싶은 알람은 
  1. CodeDeploy의 배포 시작, 중단, 완료
  2. 인스턴스 시작, 중단, 완료

이 두 가지이다.

일단 먼저 AWS SNS 주제를 생성한다.

다음으로는 AWS Lambda 함수를 생성한다.


참고

https://blog.cowkite.com/blog/2001151846/

https://anattaguy.medium.com/slack-notifications-for-aws-codedeploy-events-b2a771f29e8d
