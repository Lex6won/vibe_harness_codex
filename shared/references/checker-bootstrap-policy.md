# vibecode-checker 설치·연결 정책

하네스의 보안점검은 `vibecode-checker(gvskb)`가 담당한다. 하네스는 보안검사 로직을 직접 구현하지 않는다. 따라서 보안점검 단계에 들어가기 전에 체커가 설치되어 있거나 MCP/CLI로 연결되어 있어야 한다.

## 1. 기본 원칙

1. 먼저 `vibecode-checker` MCP의 `server_status` 또는 동등한 상태 확인을 시도한다.
2. MCP가 없으면 로컬 CLI 또는 로컬 소스 경로를 확인한다.
3. 둘 다 없으면 사용자에게 체커가 없음을 알리고 설치 여부를 확인한다.
4. 사용자가 명시적으로 동의하기 전에는 GitHub clone, pip install, npm install, MCP 설정 변경을 하지 않는다.
5. 설치 출처는 기본적으로 GitHub `https://github.com/Lex6won/vibecode-checker`만 사용한다.
6. 망분리/offline 모드(`GVSKB_MODE=offline`)에서는 외부 GitHub clone을 시도하지 않는다. 외부망에서 받은 폴더를 반입해 로컬 경로로 지정하게 한다.
7. 하네스 자체의 배포·업데이트 기준도 GitHub `https://github.com/Lex6won/vibe_harness_codex`다. 로컬 폴더는 작업 복사본이며, 기관별 차이는 우선 `shared/institution-profile.yaml`로 관리한다.

## 2. 사용자 안내 문구

체커가 없으면 다음처럼 안내한다.

```text
보안점검용 vibecode-checker가 현재 연결되어 있지 않습니다.
기획·설계는 계속할 수 있지만, 패키지 검사와 보안점검 완료 처리는 체커 연결 후 가능합니다.

GitHub https://github.com/Lex6won/vibecode-checker 를 기준으로 로컬에 설치/준비할까요?
설치 과정에서는 GitHub clone과 Python 패키지 설치가 발생할 수 있습니다.
```

사용자가 동의하면 설치 절차로 넘어간다. 동의하지 않으면 보안검증 상태를 `incomplete`로 기록하고, 구현·배포 게이트에서는 차단 또는 보류한다.

## 3. 설치/준비 방식

권장 기본 경로는 기관 또는 사용자 환경에 맞춰 정하되, 예시는 다음과 같다.

```text
tools/vibecode-checker/
```

하네스가 설치를 돕는 경우에도 다음을 지킨다.

- GitHub 주소를 사용자에게 보여준다.
- 설치 대상 경로를 사용자에게 보여준다.
- 외부 네트워크 사용과 패키지 설치가 발생함을 알린다.
- 설치 후 `server_status` 또는 CLI 상태 확인 결과를 기록한다.
- 실패하면 실패 원인과 수동 설치 경로를 남긴다.

## 4. 제공 스크립트

하네스는 JavaScript 기반 준비 스크립트를 제공할 수 있다.

```powershell
node .\shared\scripts\checker-bootstrap.mjs --target .\tools\vibecode-checker
```

이 명령은 기본적으로 설치하지 않고 안내만 출력한다. 실제 GitHub clone을 하려면 사용자가 확인한 뒤 `--yes`를 붙인다.

```powershell
node .\shared\scripts\checker-bootstrap.mjs --target .\tools\vibecode-checker --yes
```

Python 패키지 설치까지 진행하려면 추가 확인 후 `--install-python`을 붙인다.

```powershell
node .\shared\scripts\checker-bootstrap.mjs --target .\tools\vibecode-checker --yes --install-python
```

## 5. 기록 항목

설치 또는 연결 확인 결과는 `_workspace/vibecode-manifest.json`의 `security_check` 또는 `enforcement`에 기록한다.

- checker_status: connected / installed / missing / failed / user-declined
- checker_source: MCP / CLI / GitHub clone / local path
- checker_repository: `https://github.com/Lex6won/vibecode-checker`
- checker_path
- checked_at
- install_user_confirmed: true / false
- install_result
- server_status_result_id 또는 버전

## 6. 금지사항

- 사용자 확인 없이 외부 네트워크에 접속하지 않는다.
- 사용자 확인 없이 Python 패키지를 설치하지 않는다.
- GitHub 주소를 임의로 바꾸지 않는다.
- 개인 이름, 이메일, 사번, PC명, IP 등 개인식별자를 caller 또는 설치 로그에 넣지 않는다.
- 체커가 없는데 보안검증 완료, 패키지 승인 완료, 배포 준비 완료라고 표시하지 않는다.
