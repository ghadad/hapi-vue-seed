-- Start of DDL Script for Table BM_APP.TEMPLATE_VALUES
-- Generated 07/05/2017 11:12:06 from BM_APP@logdev

-- Drop the old instance of TEMPLATE_VALUES
drop table template_data
/

create table template_data
    (
    tpl_data_id                     number  not null,
    title                          varchar2(200 byte) not null,
    template_id                    varchar2(100 byte) not null,
    template_data                  CLOB,
    rendered                       CLOB,
    creation_date                  date not null,
    update_date                    date,
    effective_date                 date not null,
    expiration_date                date,
    active                         number,
    draft_data			   clob,
    last_update_by 	           varchar2(100))
  /


-- End of DDL Script for Table BM_APP.TEMPLATE_VALUES


ALTER TABLE template_data
ADD CONSTRAINT template_data_pk1  PRIMARY KEY (tpl_data_id);


