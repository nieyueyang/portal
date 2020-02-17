DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user (
id BIGINT ( 20 ) NOT NULL AUTO_INCREMENT,
account VARCHAR ( 32 ) NOT NULL,
name VARCHAR ( 32 ) NOT NULL COMMENT '用户名',
password VARCHAR ( 100 ) NULL DEFAULT NULL COMMENT '密码',
salt VARCHAR ( 20 ) NULL DEFAULT NULL COMMENT '盐',
sex INT ( 1 ) NULL DEFAULT NULL COMMENT '性别',
email VARCHAR ( 100 ) NULL DEFAULT NULL COMMENT '邮箱',
mobile VARCHAR ( 100 ) NULL DEFAULT NULL COMMENT '手机号',
status TINYINT ( 4 ) NULL DEFAULT NULL COMMENT '状态  0：正常   1：禁用',
dept_id BIGINT ( 20 ) NULL DEFAULT NULL COMMENT '部门ID',
dept_name VARCHAR ( 128 ) NULL DEFAULT NULL COMMENT '部门名称',
create_user VARCHAR ( 32 ) NULL DEFAULT NULL COMMENT '创建人',
create_user_name VARCHAR ( 32 ) NULL DEFAULT NULL COMMENT '创建人名称',
create_time datetime ( 0 ) NULL DEFAULT NULL COMMENT '创建时间',
modify_user VARCHAR ( 32 ) NULL DEFAULT NULL,
modify_time datetime ( 0 ) NULL DEFAULT NULL,
PRIMARY KEY ( id ) USING BTREE,
UNIQUE INDEX sys_user_100 ( account ) USING BTREE
)  COMMENT = '系统用户';


DROP TABLE IF EXISTS sys_role;
CREATE TABLE sys_role  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  role_code varchar(255) NULL DEFAULT NULL,
  role_name varchar(100) NULL DEFAULT NULL COMMENT '角色名称',
  remark varchar(100)  NULL DEFAULT NULL COMMENT '备注',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX sys_role101(role_code) USING BTREE,
  UNIQUE INDEX sys_role102(role_name) USING BTREE
)  COMMENT = '角色';

DROP TABLE IF EXISTS sys_user_role;
CREATE TABLE sys_user_role  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  user_id bigint(20) NULL DEFAULT NULL COMMENT '用户ID',
  role_id bigint(20) NULL DEFAULT NULL COMMENT '角色ID',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
)  COMMENT = '用户与角色对应关系';

DROP TABLE IF EXISTS sys_menu;
CREATE TABLE sys_menu  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  parent_id bigint(20) NULL DEFAULT NULL COMMENT '父菜单ID，一级菜单为0',
  name varchar(50) NULL DEFAULT NULL COMMENT '菜单名称',
  url varchar(200) NULL DEFAULT NULL COMMENT '菜单URL',
  perms varchar(500) NULL DEFAULT NULL COMMENT '授权(多个用逗号分隔，如：user:list,user:create)',
  type int(11) NULL DEFAULT NULL COMMENT '类型   0：目录   1：菜单   2：按钮',
  icon varchar(50) NULL DEFAULT NULL COMMENT '菜单图标',
  open_type int(1) NULL DEFAULT 0 COMMENT '打开方式，0：当前窗口打开，1：新窗口打开',
  order_num int(11) NULL DEFAULT NULL COMMENT '排序',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) COMMENT = '菜单管理';

DROP TABLE IF EXISTS sys_role_menu;
CREATE TABLE sys_role_menu  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  role_id bigint(20) NULL DEFAULT NULL COMMENT '角色ID',
  menu_id bigint(20) NULL DEFAULT NULL COMMENT '菜单ID',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) COMMENT = '角色与菜单对应关系';

DROP TABLE IF EXISTS sys_dept;
CREATE TABLE sys_dept  (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  dept_code varchar(32) NULL DEFAULT NULL,
  dept_name varchar(50) NULL DEFAULT NULL COMMENT '部门名称',
  parent_id bigint(20) NULL DEFAULT NULL COMMENT '上级部门ID，一级部门为0',
  order_num int(11) NULL DEFAULT NULL COMMENT '排序',
  del_flag int(4) UNSIGNED NULL DEFAULT 0 COMMENT '是否删除  1：已删除  0：正常',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
)  COMMENT = '部门管理';

DROP TABLE IF EXISTS sys_config;
CREATE TABLE sys_config  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  param_key varchar(50) NULL DEFAULT NULL COMMENT 'key',
  param_value varchar(2000) NULL DEFAULT NULL COMMENT 'value',
  status tinyint(4) NULL DEFAULT 1 COMMENT '状态   0：隐藏   1：显示',
  remark varchar(500) NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX param_key(param_key) USING BTREE
) COMMENT = '系统配置信息表';

DROP TABLE IF EXISTS sys_dict;
CREATE TABLE sys_dict  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(100)  NOT NULL COMMENT '字典名称',
  type varchar(100)  NOT NULL COMMENT '字典类型',
  code varchar(100)  NOT NULL COMMENT '字典码',
  value varchar(1000)  NOT NULL COMMENT '字典值',
  order_num int(11) NULL DEFAULT 0 COMMENT '排序',
  remark varchar(255)  NULL DEFAULT NULL COMMENT '备注',
  del_flag tinyint(4) NULL DEFAULT 0 COMMENT '删除标记  -1：已删除  0：正常',
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX type(type, code) USING BTREE
) COMMENT = '数据字典表';


DROP TABLE IF EXISTS sys_log;
CREATE TABLE sys_log  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  username varchar(50) NULL DEFAULT NULL COMMENT '用户名',
  operation varchar(50) NULL DEFAULT NULL COMMENT '用户操作',
  method varchar(200) NULL DEFAULT NULL COMMENT '请求方法',
  params varchar(5000) NULL DEFAULT NULL COMMENT '请求参数',
  time bigint(20) NOT NULL COMMENT '执行时长(毫秒)',
  ip varchar(64) NULL DEFAULT NULL COMMENT 'IP地址',
  create_date datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (id) USING BTREE
) COMMENT = '系统日志';

DROP TABLE IF EXISTS sys_oss;
CREATE TABLE sys_oss  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  url varchar(200) NULL DEFAULT NULL COMMENT 'URL地址',
  create_date datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (id) USING BTREE
) COMMENT = '文件上传';

DROP TABLE IF EXISTS sys_role_dept;
CREATE TABLE sys_role_dept  (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  role_id bigint(20) NULL DEFAULT NULL COMMENT '角色ID',
  dept_id bigint(20) NULL DEFAULT NULL COMMENT '部门ID',
  PRIMARY KEY (id) USING BTREE
) COMMENT = '角色与部门对应关系';

---库存模块

DROP TABLE IF EXISTS inv_material_category;
CREATE TABLE inv_material_category  (
  id bigint(32) NOT NULL AUTO_INCREMENT,
  category_code varchar(32) NULL DEFAULT NULL COMMENT '物料类别编码',
  category_name varchar(64) NULL DEFAULT NULL COMMENT '物料类别名称',
  category_type tinyint(1) NULL DEFAULT NULL COMMENT '0：大类，1：小类',
  parent_id bigint(32) NULL DEFAULT NULL COMMENT '上级ID',
  status tinyint(1) NULL DEFAULT NULL COMMENT '0：启用，1：停用',
  is_delete tinyint(1) NULL DEFAULT NULL COMMENT '0：未删除，1：删除',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX inv_material_category_001(category_code) USING BTREE,
  UNIQUE INDEX inv_material_category_002(category_name) USING BTREE
) COMMENT = '物料类别设置表';

DROP TABLE IF EXISTS inv_unit;
CREATE TABLE inv_unit  (
  id bigint(32) NOT NULL AUTO_INCREMENT,
  unit_code varchar(32) NOT NULL COMMENT '单位编码',
  unit_name varchar(64) NOT NULL COMMENT '单位名称',
  status tinyint(1) NULL DEFAULT NULL COMMENT '0：启用，1：停用',
  is_delete tinyint(1) NULL DEFAULT NULL COMMENT '0：未删除，1：删除',
  create_user bigint(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user bigint(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX inv_unit_001(unit_code) USING BTREE,
  UNIQUE INDEX inv_unit_002(unit_name) USING BTREE
) COMMENT = '计量单位设置表';

DROP TABLE IF EXISTS inv_item_material;
CREATE TABLE inv_item_material  (
  id bigint(32) NOT NULL AUTO_INCREMENT,
  material_code varchar(32) NOT NULL COMMENT '物料编码',
  description varchar(128) NOT NULL COMMENT '物料描述',
  material_category varchar(32) NULL DEFAULT NULL COMMENT '大类编码',
  material_category_name varchar(64) NULL DEFAULT NULL COMMENT '大类名称',
  small_category varchar(32) NULL DEFAULT NULL COMMENT '小类',
  small_category_name varchar(64) NULL DEFAULT NULL COMMENT '小类名称',
  unit_id bigint(32) NULL DEFAULT NULL COMMENT '计量单位ID',
  unit_name varchar(32) NULL DEFAULT NULL COMMENT '计量单位',
  specs varchar(255) NULL DEFAULT NULL COMMENT '规格',
  model varchar(255) NULL DEFAULT NULL COMMENT '型号',
  cost_type tinyint(1) NULL DEFAULT NULL COMMENT '成本类型，0：实际成本，1：加权平均价',
  status tinyint(1) NULL DEFAULT NULL COMMENT '0：启用，1：停用',
  is_delete tinyint(1) NULL DEFAULT NULL COMMENT '0：未删除，1：删除',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX inv_item_materiel_001(material_code) USING BTREE,
  UNIQUE INDEX inv_item_materiel_002(description) USING BTREE
) COMMENT = '物料设置表';

DROP TABLE IF EXISTS inv_warehouse;
CREATE TABLE inv_warehouse  (
  id bigint(32) NOT NULL AUTO_INCREMENT,
  warehouse_code varchar(32) NOT NULL COMMENT '库房编码',
  warehouse_name varchar(64) NOT NULL COMMENT '库房名称',
  warehouse_type tinyint(1) NULL DEFAULT NULL COMMENT '0：采购库房，1：产成品库房',
  status tinyint(1) NULL DEFAULT NULL COMMENT '库房状态 0：启用，1：停用',
  is_delete tinyint(1) NULL DEFAULT NULL COMMENT '0：未删除，1：删除',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX inv_warehouse_001(warehouse_code) USING BTREE,
  UNIQUE INDEX inv_warehouse_002(warehouse_name) USING BTREE
) COMMENT = '库房设置表';

DROP TABLE IF EXISTS inv_inventory_quantity;
CREATE TABLE inv_inventory_quantity  (
  id bigint(32) NOT NULL AUTO_INCREMENT,
  warehouse_id bigint(32) NULL DEFAULT NULL COMMENT '库房ID',
  warehouse_code varchar(32) NULL DEFAULT NULL COMMENT '库房编码',
  warehouse_name varchar(64) NULL DEFAULT NULL COMMENT '库房描述',
  material_id bigint(32) NULL DEFAULT NULL,
  material_code varchar(32) NULL DEFAULT NULL COMMENT '物料编码',
  material_description varchar(128) NULL DEFAULT NULL COMMENT '物料描述',
  quantity decimal(17, 5) NULL DEFAULT NULL COMMENT '数量',
  price decimal(17, 2) NULL DEFAULT NULL COMMENT '单价',
  unit_id bigint(32) NULL DEFAULT NULL COMMENT '单位编码',
  unit_name varchar(64) NULL DEFAULT NULL COMMENT '单位',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) COMMENT = '库存现有量表';

DROP TABLE IF EXISTS inv_material_transaction;
CREATE TABLE inv_material_transaction  (
  id bigint(32) NOT NULL AUTO_INCREMENT,
  material_id bigint(32) NULL DEFAULT NULL COMMENT '物料ID',
  material_code varchar(32) NULL DEFAULT NULL COMMENT '物料编码',
  material_description varchar(128) NULL DEFAULT NULL COMMENT '物料描述',
  po_head_id varchar(32) NULL DEFAULT NULL COMMENT '订单头ID',
  po_line_id varchar(32) NULL DEFAULT NULL COMMENT '采购订单行ID',
  transaction_type bigint(10) NULL DEFAULT NULL COMMENT '库存事物处理类型，1001：采购入库，1002：采购出库',
  transaction_date timestamp(0) NULL DEFAULT NULL COMMENT '事物处理时间',
  quantity decimal(17, 5) NULL DEFAULT NULL COMMENT '数量',
  price decimal(17, 2) NULL DEFAULT NULL COMMENT '单价',
  unit_id bigint(32) NULL DEFAULT NULL COMMENT '单位编码',
  unit_name varchar(64) NULL DEFAULT NULL COMMENT '单位',
  warehouse_id varchar(32) NULL DEFAULT NULL COMMENT '库房编码',
  inventory_id bigint(32) NULL DEFAULT NULL COMMENT '库存记录ID',
  vendor_id bigint(32) NULL DEFAULT NULL COMMENT '供应商ID',
  vendor_code varchar(32) NULL DEFAULT NULL COMMENT '供应商编码',
  vendor_name varchar(255) NULL DEFAULT NULL COMMENT '供应商名称',
  production_address varchar(128) NULL DEFAULT NULL COMMENT '产地',
  operator_id bigint(32) NULL DEFAULT NULL COMMENT '操作人帐号',
  operator varchar(32) NULL DEFAULT NULL COMMENT '操作人',
  check_user_id bigint(32) NULL DEFAULT NULL COMMENT '审核人帐号',
  check_user_name varchar(32) NULL DEFAULT NULL COMMENT '审核人',
  recipient_user_id bigint(32) NULL DEFAULT NULL COMMENT '领用人ID',
  recipient_user_name varchar(32) NULL DEFAULT NULL COMMENT '领用人',
  distribution_id bigint(32) NULL DEFAULT NULL COMMENT '配送计划ID',
  PRIMARY KEY (id) USING BTREE
) COMMENT = '物料事务处理表';


DROP TABLE IF EXISTS po_vendor;
CREATE TABLE po_vendor  (
  id bigint(32) UNSIGNED NOT NULL AUTO_INCREMENT,
  vendor_code varchar(32) NOT NULL COMMENT '供应商编码',
  vendor_name varchar(255) NOT NULL COMMENT '供应商名称',
  simple_name varchar(255) NULL DEFAULT NULL COMMENT '简称',
  address varchar(255) NULL DEFAULT NULL COMMENT '供应商地址',
  contact varchar(64) NULL DEFAULT NULL COMMENT '联系人',
  telephone varchar(32) NULL DEFAULT NULL COMMENT '联系电话',
  status tinyint(1) NULL DEFAULT NULL COMMENT '0：启用，1：停用',
  is_delete tinyint(1) NULL DEFAULT NULL COMMENT '0：未删除，1：删除',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE,
  UNIQUE INDEX po_verdor_001(vendor_code) USING BTREE,
  UNIQUE INDEX po_verdor_002(vendor_name) USING BTREE,
  UNIQUE INDEX po_verdor_003(simple_name) USING BTREE
) COMMENT = '供应商管理';

DROP TABLE IF EXISTS sm_distribution_plan;
CREATE TABLE sm_distribution_plan  (
  id bigint(32) NOT NULL AUTO_INCREMENT,
  material_id bigint(32) NULL DEFAULT NULL COMMENT '物料ID',
  material_code varchar(32) NULL DEFAULT NULL COMMENT '物料编码',
  material_description varchar(128) NULL DEFAULT NULL COMMENT '物料名称',
  year int(11) NULL DEFAULT NULL COMMENT '年度',
  distribution_group varchar(64) NULL DEFAULT NULL COMMENT '配送组别',
  province varchar(64) NULL DEFAULT NULL COMMENT '省',
  city varchar(64) NULL DEFAULT NULL COMMENT '市',
  county varchar(64) NULL DEFAULT NULL COMMENT '县',
  town varchar(64) NULL DEFAULT NULL COMMENT '乡镇',
  village varchar(64) NULL DEFAULT NULL COMMENT '村',
  promotion_task decimal(17, 3) NULL DEFAULT NULL COMMENT '推广任务',
  households int(11) NULL DEFAULT NULL COMMENT '户数',
  receivable_amount decimal(17, 2) NULL DEFAULT NULL COMMENT '应收账款',
  reality_amount decimal(17, 2) NULL DEFAULT NULL COMMENT '实收款项',
  begin_date date NULL DEFAULT NULL COMMENT '配送开始日期',
  end_date date NULL DEFAULT NULL COMMENT '配送结束日期',
  create_user varchar(32) NULL DEFAULT NULL,
  create_user_name varchar(32) NULL DEFAULT NULL,
  create_time datetime(0) NULL DEFAULT NULL,
  modify_user varchar(32) NULL DEFAULT NULL,
  modify_time datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
) COMMENT = '销售计划表';


DROP TABLE IF EXISTS im_information;
CREATE TABLE im_information (
    id bigint(64) NOT NULL AUTO_INCREMENT,
	modular_id bigint(64)  NULL DEFAULT NULL COMMENT '模块id',
	modular_name varchar(256)  NULL DEFAULT NULL COMMENT '模块',
    title varchar(256)  NULL DEFAULT NULL COMMENT '标题',
    content varchar(19000)  NULL DEFAULT NULL COMMENT '内容',
    path varchar(1024)  NULL DEFAULT NULL COMMENT '附件路径',
    operator_id bigint(32) NULL DEFAULT NULL COMMENT '上传者id',
    operator varchar(256)  NULL DEFAULT NULL COMMENT '上传者',
    upload_time timestamp(6) NULL DEFAULT NULL COMMENT '上传时间',
    views int(12) NULL DEFAULT 0 COMMENT '浏览次数',
    create_user varchar(32) NULL DEFAULT NULL COMMENT '创建人',
    create_user_name varchar(32) NULL DEFAULT NULL COMMENT '创建人名称',
    create_time timestamp(6) NULL DEFAULT NULL COMMENT '创建时间',
    modify_user varchar(32) NULL DEFAULT NULL,
    modify_time timestamp(6) NULL DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
)  COMMENT = '资讯信息';