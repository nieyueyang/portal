package com.tan.portal.web.sys.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/15 22:03
 * @Version 1.0
 * @Description:
 */
@Repository
public class SysRoleMenuDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public Long queryForCount(Map parameter){
        return sqlSessionTemplate.selectOne("com.sysRoleMenu.queryForCount", parameter);
    }

    public List<Long> queryMenuIdList(Long roleId){
        return sqlSessionTemplate.selectList("com.sysRoleMenu.queryMenuIdList", roleId);
    }

}
