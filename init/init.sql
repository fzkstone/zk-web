drop database zk_test;
create database zk_test;
use zk_test;

CREATE table playerlog (
  playerId CHAR(34),
  apiPath TEXT,
  apiParam TEXt,
  logDateTime INT,
  PRIMARY KEY (playerId, logDateTime)
);

CREATE table itemlog (
  itemId CHAR(34),
  apiPath TEXT,
  apiParam TEXt,
  logDateTime INT,
  PRIMARY KEY (itemId, logDateTime)
);

CREATE TABLE book (
  id INT,
  category_id INT(11),
  title VARCHAR(64),
  author_id INT(11),
  detail TEXT,
  price INT(11),
  image VARCHAR(64),
  PRIMARY KEY (id)
);

CREATE TABLE author (
  id INT,
  name VARCHAR(32),
  detail TEXT,
  image VARCHAR(64),
  PRIMARY KEY (id)
);

CREATE TABLE category (
  id INT,
  name VARCHAR(32),
  detail TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE incretest (
  id INT AUTO_INCREMENT,
  name VARCHAR(32),
  detail TEXT,
  PRIMARY KEY (id)
);

INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (1, 1, 'title01', 1, 'detail01', 780, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (2, 2, 'title02', 1, 'detail02', 520, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (3, 3, 'title03', 1, 'detail03', 600, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (4, 1, 'title04', 2, 'detail04', 160, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (5, 2, 'title05', 2, 'detail05', 250, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (6, 3, 'title06', 2, 'detail06', 1090, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (7, 1, 'title07', 2, 'detail07', 900, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (8, 2, 'title08', 3, 'detail08', 450, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (9, 3, 'title09', 3, 'detail09', 320, 'aaa');
INSERT INTO book (id, category_id, title, author_id, detail, price, image) VALUES (10, 1, 'title10', 3, 'detail010', 600, 'aaa');

INSERT INTO author (id, name, detail, image) VALUES (1, 'author01', 'author_detail01', 'bbb.png');
INSERT INTO author (id, name, detail, image) VALUES (2, 'author02', 'author_detail02', 'bbb.png');
INSERT INTO author (id, name, detail, image) VALUES (3, 'author03', 'author_detail03', 'bbb.png');

INSERT INTO category (id, name, detail) VALUES (1, 'category01', 'category_detail01');
INSERT INTO category (id, name, detail) VALUES (2, 'category02', 'category_detail02');
INSERT INTO category (id, name, detail) VALUES (3, 'category03', 'category_detail03');

INSERT INTO incretest (name, detail) VALUES ('incretest01', 'incre_detail01');

