package com.tan.portal.web.sys.dao;

import com.tan.portal.web.sys.entity.SysDept;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/9 22:54
 * @Version 1.0
 * @Description:
 */
@Repository
public class SysDeptDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public List<SysDept> queryForList(Map params){
        return sqlSessionTemplate.selectList("com.sysDept.queryForList",params);

    }

    public SysDept queryById(Long id){
        return sqlSessionTemplate.selectOne("com.sysDept.queryById",id );
    }

    public int removeById(Long id){
        return sqlSessionTemplate.update("com.sysDept.removeById",id);
    }
}
