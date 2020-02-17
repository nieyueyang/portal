package com.tan.portal.web.sys.dao;

import com.tan.portal.web.sys.entity.SysRole;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/9 22:03
 * @Version 1.0
 * @Description:
 */
@Repository
public class SysRoleDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public List<SysRole> queryForList(Map params){
        return sqlSessionTemplate.selectList("com.sysRole.queryForList", params);
    }

    public SysRole queryById(Long id){
        return sqlSessionTemplate.selectOne("com.sysRole.queryById", id);
    }


}
