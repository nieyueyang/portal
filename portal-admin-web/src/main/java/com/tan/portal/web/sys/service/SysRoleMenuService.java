package com.tan.portal.web.sys.service;

import com.tan.portal.mybatis.mapper.BaseDaoService;
import com.tan.portal.web.sys.dao.SysRoleMenuDao;
import com.tan.portal.web.sys.entity.SysRoleMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/15 21:23
 * @Version 1.0
 * @Description:
 */
@Service
public class SysRoleMenuService {

    @Autowired
    private SysRoleMenuDao sysRoleMenuDao;

    @Autowired
    private BaseDaoService baseDaoService;

    public long queryForCount(Map parameter){
        return sysRoleMenuDao.queryForCount(parameter);
    }

    public List<Long> queryMenuIdList(Long roleId){
        return sysRoleMenuDao.queryMenuIdList(roleId);
    }

    public int save(SysRoleMenu sysRoleMenu) throws Exception {
        return baseDaoService.insert(sysRoleMenu);
    }

    public int saveBatch(List<SysRoleMenu> list) throws Exception {
        return baseDaoService.insertBatch(list);
    }

    public int delete(String idName,Long id){
        Map params = new HashMap();
        params.put(idName,id);
        return baseDaoService.delete("sys_role_menu", params);
    }



}
