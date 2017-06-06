-- Start of DDL Script for Table BM_APP.TEMPLATE_VALUES
-- Generated 07/05/2017 11:12:06 from BM_APP@logdev

-- Drop the old instance of TEMPLATE_VALUES
drop table corporate_template_data
/

create table corporate_template_data
    (
    corporate_id                        number not null ,
    tpl_data_list                  clob not null,
    template_id                    varchar2(100 byte) not null,
    creation_date                  date not null,
    update_date                    date,
    effective_date                 date not null,
    expiration_date                date,
    last_update_by 	               varchar2(100))
  /


ALTER TABLE corporate_template_data
ADD CONSTRAINT corporate_template_data_pk1  PRIMARY KEY (corporate_id);


