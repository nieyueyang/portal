package com.tan.portal.web.sys.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tan.portal.mybatis.mapper.BaseDaoService;
import com.tan.portal.web.sys.dao.SysRoleDao;
import com.tan.portal.web.sys.entity.SysRole;
import com.tan.portal.web.sys.entity.SysRoleMenu;
import com.tan.portal.web.util.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/9 21:50
 * @Version 1.0
 * @Description:
 */
@Service
public class SysRoleService {

    @Autowired
    private SysRoleDao sysRoleDao;
    @Autowired
    private BaseDaoService baseDaoService;
    @Autowired
    private SysRoleMenuService sysRoleMenuService;
    @Autowired
    private SysUserRoleService sysUserRoleService;

    public PageInfo<SysRole> queryForPage(int pageNum, int pageSize, Map params){
        String orderby = "";
        String sidx = (String) params.get("sidx");
        if (!StringUtils.isEmpty(sidx)){
            String sord = (String) params.get("sord");
            orderby = sidx + " " + sord;
        }

        PageHelper.startPage(pageNum,pageSize, orderby);
        List<SysRole> list = sysRoleDao.queryForList(params);
        PageInfo<SysRole> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    public List<SysRole> queryForList(Map params){
        List<SysRole> list = sysRoleDao.queryForList(params);
        return list;
    }

    public SysRole queryById(Long id){
        return sysRoleDao.queryById(id);
    }

    @Transactional
    public int saveRole(SysRole sysRole) throws Exception {

        return baseDaoService.insert(sysRole);
    }


    @Transactional
    public int updateRole(SysRole sysRole) throws Exception {

        Map params = new HashMap();
        params.put("id", sysRole.getId());
        int i = baseDaoService.update(sysRole,params);

        SysRoleMenu sysRoleMenu = new SysRoleMenu();
        for(long menuId :sysRole.getMenuIdList()){

            Map parameter = new HashMap();
            parameter.put("roleId", sysRole.getId());
            parameter.put("menuId", menuId);
            Long count = sysRoleMenuService.queryForCount(parameter);
            if (count ==0){
                sysRoleMenu.setRoleId(sysRole.getId());
                sysRoleMenu.setMenuId(menuId);
                sysRoleMenu.setCreateUser(UserAgent.getAccount());
                sysRoleMenu.setCreateUserName(UserAgent.getUsername());
                sysRoleMenu.setCreateTime(Instant.now());
                sysRoleMenuService.save(sysRoleMenu);
            }
        }
        return i;
    }

    @Transactional
    public int deleteBatch(List<Long> list){
        int i = baseDaoService.deleteBatch("sys_role", list);

        for(Long id : list){
            //删除角色和人员的关系
            Map params = new HashMap();
            params.put("role_id", id);
            sysUserRoleService.delete(params);
            //删除角色和菜单的关系
            sysRoleMenuService.delete("role_id",id);
        }

        return i;
    }


}
