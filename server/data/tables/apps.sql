-- Drop the old instance of APPS
drop table apps
/

create table apps
    (appkey                         varchar2(11 byte) not null,
    appname                        varchar2(100 byte) not null,
    description                    varchar2(200 byte) not null,
    creation_date                  date not null,
    update_date                    date,
    effective_date                 date not null,
    expiration_date                date,
    url_redirect                   varchar2(300 byte),
    active                         number)


prompt Disabling triggers for APPS...
alter table APPS disable all triggers;
prompt Loading APPS...
insert into APPS (APPKEY, APPNAME, DESCRIPTION, CREATION_DATE, UPDATE_DATE, EFFECTIVE_DATE, EXPIRATION_DATE)
values ('HASHKAL', 'חשכ"ל"', 'ניהול חנות חשכ"ל"', to_date('28-03-2017', 'dd-mm-yyyy'), null, to_date('28-03-2017', 'dd-mm-yyyy'), null);
insert into APPS (APPKEY, APPNAME, DESCRIPTION, CREATION_DATE, UPDATE_DATE, EFFECTIVE_DATE, EXPIRATION_DATE)
values ('GMOBILE', 'מכר חבילות', 'מכר חבילות', to_date('07-03-2017 17:05:55', 'dd-mm-yyyy hh24:mi:ss'), null, to_date('25-02-2017 17:05:55', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into APPS (APPKEY, APPNAME, DESCRIPTION, CREATION_DATE, UPDATE_DATE, EFFECTIVE_DATE, EXPIRATION_DATE)
values ('DEVICES', 'מכר ברזלים', 'מכר ברזלים', to_date('16-03-2017 15:58:18', 'dd-mm-yyyy hh24:mi:ss'), null, to_date('06-03-2017 15:58:18', 'dd-mm-yyyy hh24:mi:ss'), null);
insert into APPS (APPKEY, APPNAME, DESCRIPTION, CREATION_DATE, UPDATE_DATE, EFFECTIVE_DATE, EXPIRATION_DATE)
values ('RETAIL', 'ריטייל', 'ריטייל', to_date('16-03-2017 15:58:57', 'dd-mm-yyyy hh24:mi:ss'), null, to_date('06-03-2017 15:58:57', 'dd-mm-yyyy hh24:mi:ss'), null);
commit;
prompt 4 records loaded
prompt Enabling triggers for APPS...
alter table APPS enable all triggers;
set feedback on
set define on
prompt Done.
