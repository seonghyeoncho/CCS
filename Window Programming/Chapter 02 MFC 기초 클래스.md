# Chapter 02 MFC 기초 클래스

## MFC 클래스 실습을 위한 준비
### MFC 콘솔 응용 프로그램 작성
### MFC 콘솔 응용 프로그램 분석
- `framework.h`, `pch.h`, `pch.cpp`
  - 미리 컴파일된 헤더 생성
- `Console.rc`, `Resource.h`
  - 윈도우 응용 프로그램에 포함해서 사용할 리소스의 목록은 *.RC 파일로 작성
  - 리소스 ID 는 Resource.h vkdlfdp `#define`으로 정의되어 있음
- `Console.h`, `Console.cpp`
  - 응용 프로그램 구현 코드가 있는 부분
- `targetVer.h`
  - 개발 대상이 되는 윈도우 운영체제의 버전을 지정하기 위한 헤더 파일

#### 실행 파일 생성 과정
![실행 파일 생성 과정](./img/1.png)

## 유틸리티 클래스
### CString Class
#### CString Class 객체 생성과 초기화
`CString::Format()`
```cpp
CString str;
str.Format(_T("x=%d, y=%d"), 100, 200);
MessageBox(NULL, str, _T("CString::Format()"), MB_OK);
```

`CString::LoadString()`
```cpp
CString str;
str.LoadString(IDS_APP_TITLE); // 문자열 리소스를 로드한다. 
str.Insert(0, _T("Hello from ")); // 맨 앞에 문자열을 삽입한다. 
str.Append(_T("!")); // 맨 끝에 문자열을 덧붙인다.
MessageBox(NULL, str, _T("CString::LoadString() 연습"), MB_OK);
```

### CPoint Class

### CRect Class

### CSize Class
### CTime, CTimeSpan Class

## 집합 클래스
- MFC 집합 클래스 
  - 배열 연결 리스트와 같은 자료 구조를 좀 더 편리하게 사용할 수 있도록 MFC에서 제공하는 클래스

### 배열 클래스 
#### 템플릿 클래스
- `afxtempl.h` 필요

#### 비템플릿 클래스
- `afxcoll.h` 필요

### 리스트 클래스
#### 템플릿 클래스
- `afxtempl.h` 필요

#### 비템플릿 클래스
- `afxcoll.h` 필요

### 맵 클래스
#### 템플릿 클래스
- `afxtempl.h` 필요

#### 비템플릿 클래스