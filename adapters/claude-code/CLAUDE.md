# Claude Code Adapter

이 파일은 Codex 중심 하네스를 Claude Code에서 사용할 때의 호환 지침이다. 저장소의 원본 기준은 루트 `AGENTS.md`, `shared/harness.yaml`, `shared/institution-profile.yaml`, `shared/references/permission-model.yaml`, `shared/references/harness-enforcement-contract.yaml`이다.

공식 설치·업데이트 기준은 Codex 하네스 `https://github.com/Lex6won/vibe_harness_codex`, 체커 `https://github.com/Lex6won/vibecode-checker`다. 로컬 폴더는 작업 복사본이며, 다른 기관 적용은 우선 `shared/institution-profile.yaml`로 분리한다.

공무원에게는 쉬운 업무 질문만 하고, 기술 결정은 기관 프로파일과 공통 reference로 정한다. 운영 코드는 기관별 Track, 개발/운영 환경, 언어, DBMS, 패키지 제한을 우선 따른다.

핵심 규칙:

- 기능 구현은 Python, JavaScript, TypeScript로만 한다.
- 패키지 판정은 `vibecode-checker/gvskb` verdict를 집행한다.
- 하네스는 일반 패키지 결정을 위해 레지스트리를 직접 호출하지 않는다.
- `malicious`, `registry_rejected`, `not_found`, `in_kev=true`는 모든 mode에서 차단한다.
- 차단 시 대체 패키지, no-new-package 구현, 안전 버전, cooldown 대기, 검토요청 또는 예외신청 경로를 함께 제시한다.
- 사용자가 명시하지 않으면 GitHub push, 운영 배포, 외부 메시지 발송, 외부 시스템 쓰기를 하지 않는다.
