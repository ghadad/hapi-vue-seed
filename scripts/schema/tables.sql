drop table users ;
create table users (id number primary key ,
    name text ,
    email text ,isadmin boolean);

drop table docs ;
CREATE TABLE docs (id integer primary key autoincrement ,
      path text , filename text,keys text,
      batch_id text,
      created_by text,creation_date INTEGER,
      update_date INTEGER,
      description text);

drop INDEX if exists docs_batch_id ;
CREATE INDEX docs_batch_id  ON docs (batch_id);

drop table docs_group ;
CREATE TABLE  docs_group (batch_id text , description text  , content text ,created_by text);

drop index if exists docs_group_idx1;
CREATE INDEX docs_group_idx1  ON docs (batch_id);

drop table props ;
CREATE TABLE props (cat1 text ,cat2 text ,cat3 text) ;

drop table batch ;
CREATE TABLE batch (id integer primary key ,seq number) ;
