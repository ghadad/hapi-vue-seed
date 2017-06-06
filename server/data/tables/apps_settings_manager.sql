-- Start of DDL Script for Table BM_APP.APPS_SETTINGS_MANAGER
-- Generated 07/05/2017 11:02:31 from BM_APP@logdev

-- Drop the old instance of APPS_SETTINGS_MANAGER
drop table apps_settings_manager
/

create table apps_settings_manager
    (appkey                         varchar2(11 byte) not null,
    updater                        varchar2(100 byte),
    label                          varchar2(200 byte) not null,
    description                    CLOB,
    creation_date                  date not null,
    update_date                    date,
    effective_date                 date not null,
    expiration_date                date,
    table_name                     varchar2(200 byte),
    properties                     CLOB,
    query_sql                      CLOB,
    auth_profiles                  varchar2(200 byte),
    auth_emails                    varchar2(200 byte),
    auth_mode                      varchar2(10 byte),
    edit_status                    varchar2(10 byte),
    draft_value                    CLOB,
    active                         number,
    url_redirect                   varchar2(300 byte))
    /
insert into  apps_settings_manager
VALUES('DEVICES',
    'simple',
    'מינימום לחיוב סל',
    'עדכון תבנית מייל - תיאור ארוך',
TO_DATE('2017-03-16 15:54:12', 'YYYY-MM-DD HH24:MI:SS'),NULL,
TO_DATE('2017-03-06 15:54:12', 'YYYY-MM-DD HH24:MI:SS'),NULL,
    'apps_templates',
'propname ='eai.doDeal.d2d.store.total'
and sysdate between effectivedate
and nvl(cancellationdate,sysdate +1)','*','*','w',NULL,null);
