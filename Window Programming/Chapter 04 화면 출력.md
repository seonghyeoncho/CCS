# Chapter 04 화면 출력

## 화면 출력 기초
### 윈도우 운영체제에서 출력 시스템을 설계 시 고려 사항
- 장치 변경에 따른 프로그램 수정 없음
- 프로그램 출력 영역 제약

### GDI
- 윈도우 운영체제의 하위 시스템 중 하나로 DLL로 존재
- 응용 프로그램의 요청을 방아 실제 출력 장치인 모니터나 프린터에 출력하는 역할을 담당

### 디바이스 컨텍스트
- GDI가 생성하고 관리하는 데이터 구조체
- 멀티태스팅 GUI 환경에서 발생할 수 있는 복잡한 상황들을 신경쓰지 않고 장치에 자유롭게 출력 가능

### 윈도우 응용 프로그램의 출력 과정
![ㅇㄹㅇ]()

1.  운영체제에 디바이스 컨택스트를 요청
2.  요청을 받은 운영체제의 GDI가 내부적으로 DC를 만든 후, 디바이스 컨텍스트를 가리키는 핸들을 응용 프로그램에 돌려둠
3. 응용 프로그램은 받은 DC의 속성을 일부 변경한다. 그런 다음, DC 핸들을 윈도우 API 함수에 전달하여 출력을 요청. 이 요청은 다시 운영체제의 GDI에 전달됨
4. GDI가 DC에 포함된 벙보를 토대로 다양한 사오항을 고려하여 출력. 이때 장치별 출력을 위해 장치 드라이버를 사용함

### 무효 영역의 개념

## CDC 클래스
### CPaintDc Class
- WM_PAINT 메시지 핸들러에서만 사용 가능
- 클라이언트 영역에만 출력 가능

```cpp
void CChildView::OnPaint() 
{
  CPaintDC dc(this);
}
```
### CWindowDc Class
- 윈도우 전체 영역에 출력
- CPaintDc/CClientDc 클래스와 사용법 동일
- 단, 좌표의 원점 위치가 다름

![DC별 원점 위치]()

### CMetafile Class
#### 메타파일(Metafile)
GDI 명령을 저장할 수 있는 파일

### 그리기 함수
#### 점 찍기
```cpp
void CChildView::OnPaint()
{
  CPaintDC dc(this);
  for (int x = 0; x < 256; x++)
    for (int y = 0; y < 256; y++) 
      dc.SetPixelV(x, y, RGB(x, y, 0));
}
```
#### 선 그리기
1. 현재 위치를 (x1, y1)으로 옮긴다.
  - 현재 위ㅣ치는 DC의 속성 중 하나.
2. 현재 위치에서 (x2, y2)까지 선을 그린다.
  - 완료되면 현재 위치는 (x2, y2)로 자동 변경됨

```cpp
void CChildView::OnPaint()
{
CPaintDC dc(this);
// 클라이언트 영역의 좌표를 얻는다. CRect rect;
GetClientRect(&rect);
// 수평선과 수직선을 그린다. 
dc.MoveTo(0, rect.bottom / 2); 
dc.LineTo(rect.right, rect.bottom / 2); 
dc.MoveTo(rect.right / 2, 0); 
dc.LineTo(rect.right / 2, rect.bottom);
// 마름모꼴을 그린다.
POINT points[] = { {rect.right / 2, 0}, {rect.right, rect.bottom / 2},
{ rect.right / 2, rect.bottom}, {0, rect.bottom / 2}, {rect.right / 2, 0} }; 
dc.Polyline(points, 5);
}
```

#### 도형 그리기

### 텍스트 함수

### 매핑 모드

### 좌표 변환

### 속성 함수

### 그리기 모드

## GDI 객체
GDI에서 출력할 때 사용하는 도구

### GDI 객체 사용 방법
1. GDI 객체를 스택에 생성
2. 생성된 GDI 객체를 `CDC::SelectObject()` 함수에 전달하여 DC에 선택
3. CDC 클래스 멤버 함수를 호출하여 출력
4. 이전의 GDI 객체를 `CDC::SelectObject()` 함수에 전달하여 복원
5. 함수가 끝나면 GDI 객체의 소멸자가 자동으로 호출되어 파괴됨

### 펜
### 브러쉬
### 폰트
#### 내장 객체
### 비트맵
### 리전
