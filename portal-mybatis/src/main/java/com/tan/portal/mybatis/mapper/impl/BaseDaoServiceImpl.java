package com.tan.portal.mybatis.mapper.impl;

import com.tan.portal.mybatis.annotation.Column;
import com.tan.portal.mybatis.annotation.Id;
import com.tan.portal.mybatis.annotation.Table;
import com.tan.portal.mybatis.annotation.Transient;
import com.tan.portal.mybatis.mapper.BaseDaoService;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.lang.reflect.Field;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Author: nieyy
 * @Date: 2019/3/15 0:00
 * @Version 1.0
 * @Describe: 数据库通用操作实现类
 */
@Service
public class BaseDaoServiceImpl<T> implements BaseDaoService <T> {

    private static final Logger logger = LoggerFactory.getLogger(BaseDaoServiceImpl.class);
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 标准查询功能
     * @param t
     * @return
     * @throws Exception
     */
    @Override
    public List <T> queryForList(T t) throws Exception {
        Class<?> clazz = t.getClass();
        String tableName = getTableName(clazz);
        Map param = new HashMap();
        Field[] fields = clazz.getDeclaredFields();
        List listColumn = new ArrayList();
        Map map = new HashMap();
        for(Field field : fields){
            if(field.isAnnotationPresent(Column.class)){
                field.setAccessible(true);
                Object obj = field.get(t);
                String columnName = field.getAnnotation(Column.class).value();
                listColumn.add(columnName);
                if(obj != null){
                    map.put(columnName, obj);
                }
            }
        }

        param.put("tableName", tableName);
        param.put("COLUMNS", listColumn);
        param.put("WHERE", map);
        List<T> list = sqlSessionTemplate.selectList("com.baseDao.select", param);
        return list;
    }

    /**
     * 单条插入
     * @param t 数据库映射类
     * @return 插入数量
     * @throws Exception
     */
    @Override
    public int insert(T t) throws Exception {
        Class<?> clazz = t.getClass();
        String tableName = getTableName(clazz);
        Map param = new HashMap();
        Field[] fields = clazz.getDeclaredFields();
        List listColumn = new ArrayList();
        List listValues = new ArrayList();
        for(Field field : fields){
            if (field.isAnnotationPresent(Transient.class)){
                continue;
            }
            field.setAccessible(true);
            Object obj = field.get(t);
            if (field.isAnnotationPresent(Id.class)){
                String id = "";
                if (obj == null){
                    id = "";
                }else{
                    id = String.valueOf(obj);
                }
                if (field.isAnnotationPresent(Column.class)){
                    //listColumn.add(field.getAnnotation(Column.class).value());
                }else{
                    //listColumn.add(humpToLine(field.getName()));
                }
                if (StringUtils.isEmpty(id)){
                    //增加多种ID生成策略
                    //listValues.add(UUID.randomUUID().toString().replace("-","" ));
                }else{
                    //listValues.add(obj);
                }

            }else{
                if(field.isAnnotationPresent(Column.class)){
                    if(obj != null){
                        listColumn.add(field.getAnnotation(Column.class).value());
                        listValues.add(obj);
                    }
                }else{
                    if(obj != null){
                        listColumn.add(humpToLine(field.getName()));
                        listValues.add(obj);
                    }
                }
            }
        }

        param.put("tableName", tableName);
        param.put("COLUMNS", listColumn);
        param.put("VALUES", listValues);
        sqlSessionTemplate.insert("com.baseDao.insert", param);
        int id =Integer.valueOf(param.get("id").toString());
        return id;
    }

    /**
     * 批量插入
     * @param list 数据库映射类集合
     * @return 插入数据
     * @throws Exception
     */
    @Override
    public int insertBatch(List <T> list) throws Exception {
        int resutl = 0 ;
        for(T t : list){
            Class<?> clazz = t.getClass();
            String tableName = getTableName(clazz);
            Map param = new HashMap();
            Field[] fields = clazz.getDeclaredFields();
            List listColumn = new ArrayList();
            List listValues = new ArrayList();
            for(Field field : fields){
                if (field.isAnnotationPresent(Transient.class)){
                    continue;
                }
                field.setAccessible(true);
                Object obj = field.get(t);
                if (field.isAnnotationPresent(Id.class)){
                    String id = obj.toString();
                    if (field.isAnnotationPresent(Column.class)){
                        listColumn.add(field.getAnnotation(Column.class).value());
                    }else{
                        listColumn.add(humpToLine(field.getName()));
                    }
                    if (StringUtils.isEmpty(id)){
                        //增加多种ID生成策略
                        listValues.add(UUID.randomUUID().toString().replace("-","" ));
                    }else{
                        listValues.add(obj);
                    }

                }else{
                    if(field.isAnnotationPresent(Column.class)){
                        if(obj != null){
                            listColumn.add(field.getAnnotation(Column.class).value());
                            listValues.add(obj);
                        }
                    }else{
                        if(obj != null){
                            listColumn.add(humpToLine(field.getName()));
                            listValues.add(obj);
                        }
                    }
                }
            }

            param.put("tableName", tableName);
            param.put("COLUMNS", listColumn);
            param.put("VALUES", listValues);
            try{
                int i = sqlSessionTemplate.insert("com.baseDao.insert", param);
                resutl = i + 0;
            }catch(Exception e){
                logger.info(e.toString());
            }
        }
        return resutl;
    }

    /**
     * 数据更新
     * @param t 数据库映射类
     * @param map where条件键值对，key为数据库字段
     * @return 返回更新数量
     * @throws Exception
     */
    @Override
    public int update(T t,Map map) throws Exception {
        Class<?> clazz = t.getClass();
        String tableName = getTableName(clazz);
        Map param = new HashMap();
        Field[] fields = clazz.getDeclaredFields();
        Map<String,Object> mapColumn = new HashMap();
        for(Field field : fields){
            if (field.isAnnotationPresent(Transient.class)){
                continue;
            }
            field.setAccessible(true);
            Object obj = field.get(t);
            if (obj !=null){
                if (field.isAnnotationPresent(Column.class)){
                    mapColumn.put(field.getAnnotation(Column.class).value(), obj);
                }else{
                    mapColumn.put(humpToLine(field.getName()), obj);
                }
            }
        }

        param.put("tableName", tableName);
        param.put("COLUMNS", mapColumn);
        param.put("Where", map);
        return sqlSessionTemplate.update("com.baseDao.update", param);
    }

    /**
     * 条件删除
     * @param tableName  数据库表名
     * @param map  where 条件的键值对，KEY为数据库的表字段
     * @return 删除数据的数量
     */
    @Override
    public int delete(String tableName, Map map) {
        Map<String,Object> param = new HashMap();
        param.put("tableName", tableName);
        param.put("Where", map);
        return sqlSessionTemplate.delete("com.baseDao.delete", param);
    }

    /**
     * 批量删除，根据表id字段
     * @param tableName  数据库表名
     * @param list  多个id
     * @return  删除数据的数量
     */
    @Override
    public int deleteBatch(String tableName,List<String> list) {
        Map map = new HashMap();
        map.put("tableName", tableName);
        map.put("list", list);
        return sqlSessionTemplate.delete("com.baseDao.deleteBatch", map);
    }

    /**
     * 根据类中的Table注解获取对应的数据库表名
     * @param clazz
     * @param <T>
     * @return
     * @throws Exception
     */
    private <T> String getTableName(Class<?> clazz) throws Exception {
        if (clazz.isAnnotationPresent(Table.class)){
            return clazz.getAnnotation(Table.class).value();
        }else{
            throw new Exception("实体类" + clazz.getName() + "中没有配置Table注解");
        }
    }

    /**
     * 驼峰转下划线
     * @param str
     * @return
     */
    public String humpToLine(String str) {
        final Pattern humpPattern = Pattern.compile("[A-Z]");
        Matcher matcher = humpPattern.matcher(str);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, "_" + matcher.group(0).toLowerCase());
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

}
