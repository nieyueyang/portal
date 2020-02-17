DROP TABLE IF EXISTS file_manager;
CREATE TABLE file_manager (
id BIGINT ( 64 ) NOT NULL AUTO_INCREMENT,
title VARCHAR( 256 ) NULL COMMENT '标题',
upload_project VARCHAR(512) NULL COMMENT '上传项目',
content varchar(19000) NULL COMMENT '内容',
path    VARCHAR(1024) NULL COMMENT  '附件路径',
is_deleted  int(1) DEFAULT 0 COMMENT '是否删除,0:未删除，1:删除',
operator VARCHAR(256) COMMENT '上传者',
operator_id BIGINT(32) COMMENT '上传者id',
upload_time TIMESTAMP(6) COMMENT '上传时间',
views int(12) default '0' COMMENT '浏览次数',
create_user BIGINT ( 32 ) NULL DEFAULT NULL COMMENT '创建人',
create_user_name VARCHAR ( 32 ) NULL DEFAULT NULL COMMENT '创建人名称',
create_time datetime ( 0 ) NULL DEFAULT NULL COMMENT '创建时间',
modify_user BIGINT ( 32 ) NULL DEFAULT NULL,
modify_time datetime ( 0 ) NULL DEFAULT NULL,
PRIMARY KEY ( id ) USING BTREE
)  COMMENT = '文件管理';