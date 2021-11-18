# EC2에 CodeDeployAgent 설치

```s
sudo yum update
```
```s
sudo yum install ruby
```
```s
sudo yum install wget
```

```s
wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install
```

```s
chmod +x ./install
```

```s
sudo ./install auto
```

```s
sudo service codedeploy-agent status
```

**실행이 안되었다면**
```s
sudo service codedeploy-agent start
```