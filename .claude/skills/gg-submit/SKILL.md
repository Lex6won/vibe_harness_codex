---
name: gg-submit
description: 배포 전 기본 제출자료를 vibecode-checker 최종 리포트 2종으로 최소화하고, 기관 양식·예외·패키지 검토가 필요한 경우에만 추가 문서를 만들 때 사용한다.
---

# gg-submit

## Steps
1. `security-checker(full)` 결과에서 체커가 저장한 HTML 리포트와 JSON 증적 경로를 확인한다.
2. 두 파일 중 하나라도 없으면 제출 준비 완료로 처리하지 않는다.
3. 사용자에게 최종 리포트 2종을 보안팀 또는 AX 전담팀에 제출해야 한다고 안내한다.
4. 이 리포트가 공식 승인서가 아니라 보안 검토 요청 증적임을 명확히 말한다.
5. 기관 내부 시스템이 별도 양식을 요구할 때만 `08_배포신청서.md`를 만든다.
6. 외부통신, 개인정보, 미승인 패키지, DMZ, checker 오탐 등 예외가 있으면 필요한 예외/패키지 검토 문서만 만든다.
7. 운영팀이 설치 절차를 요구할 때만 `07_서버설치_배포가이드.md`를 만든다.
8. manifest의 G1~G5 준비 상태와 제출 안내 여부를 갱신한다.

## Default submission package
- vibecode-checker saved HTML report
- vibecode-checker saved JSON evidence

## Conditional package
- `08_배포신청서.md`: 기관 양식 요구 시
- `09_예외신청서.md`: 정책·보안 예외 필요 시
- `10_패키지예외신청서.md` 또는 `11_패키지검토요청서.md`: 패키지 검토 필요 시
- `07_서버설치_배포가이드.md`: 운영팀 설치 인계 필요 시
