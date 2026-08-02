# 기관 프로파일 작성 가이드

`shared/institution-profile.yaml`은 시군·기관별로 먼저 수정하는 단일 설정 파일이다.

## 원칙

- 기관별 차이는 이 파일에 모은다.
- 값은 가능한 한 ASCII slug를 사용한다. 한글 설명은 문서와 산출물 템플릿에 적는다.
- `shared/references/*.yaml`은 공통 기본값과 카탈로그로 둔다.
- 에이전트는 기관 프로파일을 먼저 읽고, 값이 비어 있을 때만 공통 reference를 참고한다.
- 운영 반입 전에는 운영팀과 보안팀이 이 파일의 production, plugins, libraries 값을 확인한다.

## 반드시 정할 항목

| 항목 | 의미 |
|---|---|
| `institution` | 기관명, 코드, 담당 부서 |
| `environment.development` | 개발 PC/개발망, 인터넷 접근, 개발용 DBMS |
| `environment.production` | 운영망/DMZ, OS, 컨테이너, 설치 경로, healthcheck |
| `allowed_languages` | 개발/운영에서 허용되는 언어와 버전 |
| `allowed_dbms` | 개발/운영에서 허용되는 DBMS와 버전 |
| `tracks.enabled` | 기관에서 사용할 수 있는 하네스 Track |
| `plugins` | AI 도구, MCP, 브라우저/클라우드 플러그인 사용 정책 |
| `libraries` | 공통 승인 목록 외 추가 허용/제한/차단 라이브러리 |

## 운영 판단

`status: allowed`는 하네스 안에서 사용할 수 있다는 뜻이지, 정식 운영 승인을 의미하지 않는다. L3/L4 단계에서는 기관 보안·운영 담당자의 별도 승인이 필요하다.
