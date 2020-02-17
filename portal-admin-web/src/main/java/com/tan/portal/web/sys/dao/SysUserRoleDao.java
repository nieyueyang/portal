package com.tan.portal.web.sys.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/18 22:21
 * @Version 1.0
 * @Description:
 */
@Repository
public class SysUserRoleDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public Long queryForCount(Map parameter){
        return sqlSessionTemplate.selectOne("com.sysUserRole.queryForCount", parameter);
    }

    public List<Long> queryByUserId(Long userId){
        return sqlSessionTemplate.selectList("com.sysUserRole.queryByUserId", userId);
    }


}
