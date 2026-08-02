---
name: gg-design
description: PRD를 바탕으로 화면/기능 설계, DB 테이블 구조, 개발 Track, 운영환경, 인증, 배포 위치를 확정할 때 사용한다.
---

# gg-design

## Steps
1. PRD와 risk profile을 읽는다.
2. `shared/institution-profile.yaml`을 읽어 개발/운영 서버, 허용 언어, DBMS, 플러그인, 라이브러리 제한을 확인한다.
3. 기관 프로파일에서 활성화된 Track 중 하나를 정한다.
4. 행정망 내부 서비스인지 DMZ 대민 서비스인지 정한다.
5. `02_화면_기능설계서.md`를 만든다.
6. `03_DB_테이블정의서.md`를 만든다.
7. `04_개발스택_운영환경.md`를 만든다.
8. 승인 Track 밖 요구는 전환 안내 또는 예외 후보로 기록한다.

## Rules
- DB는 기관 프로파일의 운영 DBMS 기준을 따른다.
- 인증은 기관 프로파일과 운영망 정책을 따른다. 명시값이 없으면 Keycloak OIDC를 기본 후보로 둔다.
- CDN/외부 SDK는 운영 전 self-host 또는 제거.
