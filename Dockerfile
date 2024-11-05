# 베이스 이미지 설정 (예: Node.js 최신 버전)
FROM node:latest

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# 애플리케이션이 사용할 포트 노출
EXPOSE 3000

# 애플리케이션 시작 명령
CMD ["npm", "start"]
