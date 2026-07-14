---
name: gg-release
description: 개발 완료된 바이브코딩 산출물을 공식 개발환경 이관, 서버 설치, 보안성검토, 배포신청에 필요한 제출 패키지로 정리한다. MCP full 검증, 배포가이드, 신청서, 예외신청서를 생성할 때 사용한다.
---

# gg-release

## 절차
1. `release-packager`가 `_workspace`와 manifest를 읽고 누락 산출물을 확인한다.
2. 개발스택 최종본을 확정한다: 언어, 프레임워크, DB, 패키지, 포트, healthcheck, 로그, 환경변수, 설치경로.
3. 행정망/외부망 차이를 확인한다.
4. `security-checker(full)`로 vibecode-checker MCP 결과를 생성한다.
5. `deploy-doc-writer`가 `07_서버설치_배포가이드.md`를 최종본으로 작성한다.
6. `submit-packager`가 `08_배포신청서.md`, 필요 시 `09_예외신청서.md`, `10_패키지예외신청서.md`를 작성한다.

## 완료 표현
- 제출 준비 완료
- 누락 있음
- 사람 승인 필요

“배포 승인 완료”라고 표현하지 않는다.
