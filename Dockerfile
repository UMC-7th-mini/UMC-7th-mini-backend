FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /app

# 현재 작업 디렉토리에서 WORKDIR로 복사
COPY . .

RUN npm install
# RUN npm install

CMD ["bash"]

