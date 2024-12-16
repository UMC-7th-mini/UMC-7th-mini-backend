import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // 환경 변수로 설정 권장
const EXPIRES_IN = "1h"; // 토큰 만료 시간

// JWT 토큰 생성
const generateToken = payload => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
};

const authenticateToken = (req, res, next) => {
  // 요청 헤더에서 토큰 가져오기
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // 'Bearer <token>' 형태에서 토큰만 추출

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token is missing" });
  }

  // 토큰 검증
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // 토큰 유효 -> 사용자 정보 추가
    req.user = user;
    next();
  });
};

export { generateToken, authenticateToken };
