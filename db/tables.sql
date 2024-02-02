CREATE TABLE person (
  name varchar(50) NOT NULL,
  email varchar(50) NOT NULL PRIMARY KEY,
  password varchar(50) NOT NULL,
  phone char(10),
  address text
);
CREATE TABLE users (
  personId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(50) NOT NULL,
  email varchar(50) NOT NULL UNIQUE,
  password varchar(50) NOT NULL,
  phone char(10),
  address text
);
INSERT INTO users SET name= 'user1', email= 'user1@mail.com', password='test';
INSERT INTO users SET name= 'user3', email= 'user3@mail.com', password='test';
INSERT INTO users SET name= 'user4', email= 'user4@mail.com', password='test';

CREATE TABLE images (
  personId int NOT NULL,
  url varchar(500) NOT NULL,
  primary key (personId, url)
);
