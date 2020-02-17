package com.tan.portal.web.sys.dao;

import com.tan.portal.web.sys.entity.SysMenu;
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
public class SysMenuDao {
    @Autowired
    SqlSessionTemplate sqlSessionTemplate;

    public List<SysMenu> queryForList(Map params){
        return sqlSessionTemplate.selectList("com.sysMenu.queryForList",params);
    }

    /**
     * 查询用户的所有菜单ID
     */
    public List<Long> queryAllMenuId(long userId){
        return sqlSessionTemplate.selectList("com.sysMenu.queryAllMenuId",userId);
    }

    public List<SysMenu> queryListParentId(Long parentId) {
        return sqlSessionTemplate.selectList("com.sysMenu.queryListParentId",parentId);
    }

    public SysMenu queryById(long id) {
        return sqlSessionTemplate.selectOne("com.sysMenu.queryById",id);
    }

    public List<SysMenu> queryNotButtonList() {
        return sqlSessionTemplate.selectList("com.sysMenu.queryNotButtonList");
    }







}
