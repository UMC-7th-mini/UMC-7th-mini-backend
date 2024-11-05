export default {
  extends: [
    "eslint:recommended", // 기본 ESLint 권장 규칙
    "airbnb", // Airbnb 스타일 가이드
    "prettier", // Prettier와 충돌하지 않게 설정
  ],
  parserOptions: {
    ecmaVersion: 12, // 최신 ECMAScript 문법
    sourceType: "module", // ES 모듈 사용
  },
  plugins: ["prettier"], // Prettier 플러그인 추가
  rules: {
    "prettier/prettier": "error", // Prettier 규칙 위반 시 오류로 표시
    semi: ["error", "always"], // 세미콜론을 항상 사용
    quotes: ["error", "single"], // 작은따옴표 사용
    "no-console": "warn", // console.log 사용 시 경고
  },
};
