# EC2 [Cannot allocate memory]

최근 들어 가장 처음 만든 EC2에서 계속적으로 
'Connat allocate memory' 오류가 난다.

이 오류가 나는 이유에는
  - 물리적 RAM 또는 SWAP 공간의 부족
  - 프로세스 크기 제한에 도달

이를 해결하는 방법에는
  - 시스템의 메모리 로드 줄이기
  - 물리적 메모리 또는 SWAP 공간 늘리기
  - SWAP 백킹 저장소가 가득 차 있는지 확인

등이 있다. 

실행시키는 어플리케이션이 프로세스 크기 제한에 도달한 문제는 아니므로, RAM or SWAP 공간의 부족의 문제라고 판단했다.

ec2의 초기 상태에서는 swap이 지정이 되어있지 않고, 대부분의 리눅스의 SWAP 파티션 설정을 권장한다.

일단 ssh로 인스턴스에 접근을 했다.

```
free -h
```
로 스왑공간을 확인해보았다.

0GB라서 SWAP 공간을 2.0GB로 늘려주기로 했다.

SWAP 공간 생성 방법은 다음과 같다.
  1. SWAP 파일 생성, 1.5 - 2배 정도로 설정한다. SWAP 디렉토리가 없을 수도 있다. 그런 경우에는 만들어주자.
  2. 시스템에서 접근 가능하도록 권한을 설정한다.
  3. 파일 포맷을 SWAP으로 변환 후 SWAP 파일을 등록한다.
  4. 파일 시스템 테이블에 등록한다. 
  5. 정상적으로 등록이 되어 있는지 확인한다.

### SWAP 파일 생성
다음과 같이 입력한다.

```
sudo touch /var/spool/swap/swapfile 
sudo dd if=/dev/zero of=/var/spool/swap/swapfile count=2048000 bs=1024
```

처음 명령어에서 디렉토리가 없다는 메세지가 나올 수 있다.
그럴때는 그냥 만들어주면 된다. 

```
sudo mkdir /var/spool/swap
```

이후에 다시 위의 명령어를 진행해준다.
시간이 조금 걸릴 수 있다.

### 시스템에서 접근 가능하도록 권한을 설정한다.
```
sudo chmod 600 /var/spool/swap/swapfile
```
### 파일 포맷을 접근 가능하도록 권한을 설정한다.
```
sudo mkswap /var/spool/swap/swapfile
sudo swapon /var/spool/swap/swapfile
```
### 파일 시스템 테이블에 등록한다.
```
sudo vi /etc/fstab
```
### 정상적으로 등록이 되어 있는지 확인한다.
```
free -h
```










