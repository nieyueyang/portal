package com.tan.portal.web.sys.dao;

import com.tan.portal.web.sys.entity.SysUser;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/4/19 22:47
 * @Version 1.0
 * @Description:
 */
@Repository
public class SysUserDao {
    @Autowired
    SqlSessionTemplate sqlSessionTemplate;

    public SysUser queryById(Long id){
        return sqlSessionTemplate.selectOne("com.sysUser.queryById", id);
    }

    public SysUser querySysUserByCode(String userCode){
        return sqlSessionTemplate.selectOne("com.sysUser.querySysUserByCode", userCode);
    }

    public SysUser queryByAccount(String account){
        return sqlSessionTemplate.selectOne("com.sysUser.queryByAccount", account);
    }

    public List<SysUser> queryForList( Map map){
        return sqlSessionTemplate.selectList("com.sysUser.queryForPage",map);
    }

}
