CREATE TABLE IF NOT EXISTS users (
                                     name varchar primary key,
                                     password varchar
);

drop table users;

CREATE TABLE IF NOT EXISTS guess (
                                     id INT primary key ,
                                     guess varchar not null ,
                                     user_name varchar not null ,
                                     foreign key (user_name) references users (name)
    );

delete from guess;
drop table guess;

CREATE TABLE IF NOT EXISTS game (
                                    id int primary key ,
                                    user_name varchar not null ,
                                    win bool not null ,
                                    winWord int not null ,
                                    date timestamp not null ,
                                    foreign key (user_name) references users (name)
    );

drop table game;

insert into users (name, password)
values ('alex', 'theman');

drop table user;