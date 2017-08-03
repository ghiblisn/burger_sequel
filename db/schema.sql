CREATE DATABASE burgers_db;
USE burgers_db;
CREATE TABLE burgers(
    id int auto_increment primary key not null,
    burger_name varchar(255) not null,
    devoured boolean DEFAULT false,
    date TIMESTAMP
);
