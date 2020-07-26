alter table user_profile rename to user_profile_old;
 CREATE TABLE IF NOT EXISTS user_profile( id INTEGER  not null   primary key ,
 google_user_id varchar  not null   ,
 value_type varchar  not null   ,
 value_name varchar  not null   ,
 value varchar  not null   );
insert  into  user_profile (google_user_id, value_type, value_name, value) select google_user_id, value_type, value_name, value FROM user_profile_old;
