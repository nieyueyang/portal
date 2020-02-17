package com.tan.portal.mybatis.mapper;

import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/3/15 0:00
 * @Version 1.0
 * @Describe: 数据库通用操作接口服务
 */

public interface BaseDaoService<T> {

    List<T> queryForList(T t) throws Exception;

    int insert(T t) throws Exception;

    int insertBatch(List <T> list) throws Exception;

    int update(T t, Map map) throws Exception;

    int delete(String tableName, Map map);

    int deleteBatch(String tableName, List <String> list);

}
