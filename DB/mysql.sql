-- User 테이블
CREATE TABLE User (
    userKey INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) UNIQUE NOT NULL,
    userName VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    gender ENUM('MALE', 'FEMALE') NOT NULL,
    birth DATETIME NOT NULL,
    mbti ENUM('INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
              'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP') NOT NULL
);

-- PlantDict 테이블
CREATE TABLE PlantDict (
    dictKey INT AUTO_INCREMENT PRIMARY KEY,
    getDate DATETIME NOT NULL,
    getPlace VARCHAR(255) NOT NULL,
    userKey INT NOT NULL,
    FOREIGN KEY (userKey) REFERENCES User(userKey) ON DELETE CASCADE
);

-- Plant 테이블
CREATE TABLE Plant (
    plantKey INT AUTO_INCREMENT PRIMARY KEY,
    plantName VARCHAR(255) NOT NULL,
    plantStatus ENUM('Seed', 'Germination', 'Seedling', 'Mature') NOT NULL
);

-- PlantDict와 Plant 연결 테이블 (다대다 관계)
CREATE TABLE PlantDictPlantLink (
    linkKey INT AUTO_INCREMENT PRIMARY KEY,
    userKey INT NOT NULL,
    plantKey INT NOT NULL,
    FOREIGN KEY (userKey) REFERENCES User(userKey) ON DELETE CASCADE,
    FOREIGN KEY (plantKey) REFERENCES Plant(plantKey) ON DELETE CASCADE
);

-- TaskTable 테이블
CREATE TABLE TaskTable (
    taskKey INT AUTO_INCREMENT PRIMARY KEY,
    taskName VARCHAR(255) NOT NULL,
    taskProgress VARCHAR(255) NOT NULL,
    taskStartDate DATETIME NOT NULL,
    taskEndDate DATETIME NOT NULL,
    userKey INT NOT NULL,
    projectKey INT NOT NULL,
    memoKey INT NULL,
    FOREIGN KEY (userKey) REFERENCES User(userKey) ON DELETE CASCADE,
    FOREIGN KEY (projectKey) REFERENCES Project(projectKey) ON DELETE CASCADE,
    FOREIGN KEY (memoKey) REFERENCES ProjectCalendar(memoKey) ON DELETE SET NULL
);

-- ProjectCalendar 테이블
CREATE TABLE ProjectCalendar (
    memoKey INT AUTO_INCREMENT PRIMARY KEY,
    memoName VARCHAR(255) NOT NULL,
    calendarDate DATETIME NULL,
    memo TEXT NOT NULL,
    projectKey INT UNIQUE NOT NULL,
    privateCalKey INT NULL,
    FOREIGN KEY (projectKey) REFERENCES Project(projectKey) ON DELETE CASCADE,
    FOREIGN KEY (privateCalKey) REFERENCES PrivateCalendar(privateCalendarKey) ON DELETE SET NULL
);

-- ProjectInfo 테이블
CREATE TABLE ProjectInfo (
    projectInfoKey INT AUTO_INCREMENT PRIMARY KEY,
    userKey INT NOT NULL,
    projectKey INT NOT NULL,
    importance BOOLEAN NOT NULL,
    authority ENUM('ADMIN', 'MANAGER', 'MEMBER') NOT NULL,
    FOREIGN KEY (userKey) REFERENCES User(userKey) ON DELETE CASCADE,
    FOREIGN KEY (projectKey) REFERENCES Project(projectKey) ON DELETE CASCADE
);

-- PrivateCalendar 테이블
CREATE TABLE PrivateCalendar (
    privateCalendarKey INT AUTO_INCREMENT PRIMARY KEY,
    userKey INT NOT NULL,
    FOREIGN KEY (userKey) REFERENCES User(userKey) ON DELETE CASCADE
);

-- Project 테이블
CREATE TABLE Project (
    projectKey INT AUTO_INCREMENT PRIMARY KEY,
    totalPeople INT NOT NULL,
    totalProgress INT NOT NULL,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    projectName VARCHAR(255) NOT NULL,
    taskCount INT NOT NULL,
    plantKey INT NULL,
    privateCalKey INT NULL,
    currentProgress VARCHAR(255) NOT NULL,
    FOREIGN KEY (plantKey) REFERENCES Plant(plantKey) ON DELETE SET NULL,
    FOREIGN KEY (privateCalKey) REFERENCES PrivateCalendar(privateCalendarKey) ON DELETE SET NULL
);
