CREATE TABLE users (id text primary key ,
    name text ,
    email text ,isadmin boolean);
CREATE TABLE docs (id integer primary key autoincrement , path text , filename text,keys text,batch_id text,created_by text,creation_date INTEGER,update_date INTEGER);
CREATE INDEX docs_batch_id  ON docs (batch_id);
CREATE TABLE "docs_group" (
        `batch_id`      text,
        `description`   text,
        `content`       text,
        `created_by`    text,
        `props` TEXT,
        `active`        INTEGER
, creation_date INTEGER, update_date INTEGER, props1 text, props2 text, props3 text);
CREATE INDEX docs_group_idx1  ON docs (batch_id);
CREATE TABLE props (cat1 text , cat2 text ,cat3 text);
CREATE TABLE batch (id text ,seq number);
