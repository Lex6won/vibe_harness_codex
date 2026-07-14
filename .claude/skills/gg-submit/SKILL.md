---
name: gg-submit
description: PRD, 설계서, DB 테이블정의서, 개발스택 문서, 보안점검, 소스, 배포가이드를 모아 배포신청서와 예외신청서, 반입 패키지 목록을 만들 때 사용한다.
---

# gg-submit

## Steps
1. 완료 산출물이 모두 있는지 확인한다.
2. `07_서버설치_배포가이드.md`를 만든다.
3. `08_배포신청서.md`를 만든다.
4. 외부통신, 개인정보, 미승인 패키지, DMZ, checker 오탐이 있으면 `09_예외신청서.md`를 만든다.
5. manifest의 G1~G5 준비 상태를 갱신한다.
6. 반입 패키지에 포함할 파일 목록을 출력한다.

## Required package
source, Dockerfile, PRD, 설계서, DB정의서, 개발스택 문서, 보안보고서, 배포가이드, manifest.
