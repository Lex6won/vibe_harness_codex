---
name: package-policy
description: 개발 중 Python/npm 패키지를 추가해야 할 때 승인 패키지 카탈로그, 위험 패턴, 예외신청 기준을 적용한다. 초기에는 넓게 승인하고 위험한 것만 강하게 막는 원칙을 따른다.
---

# package-policy

## 원칙
- core/approved는 넓게 허용한다.
- restricted는 경고와 조건을 붙인다.
- unknown은 대체 패키지를 먼저 제안하고, 대체 불가 시 예외신청으로 보낸다.
- denied는 강하게 차단한다.

## 강차단 후보
외부 BaaS SDK, CDN 의존, postinstall 필수, eval/new Function, typosquat 의심, 미유지 패키지, 금지 라이선스.

## 출력
- 승인 패키지 사용
- restricted 경고
- denied 대체안
- 패키지 예외신청서 후보
