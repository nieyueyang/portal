package com.tan.portal.web.sys.service;

import com.tan.portal.mybatis.mapper.BaseDaoService;
import com.tan.portal.web.sys.dao.SysUserRoleDao;
import com.tan.portal.web.sys.entity.SysUserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/18 22:12
 * @Version 1.0
 * @Description:
 */
@Service
public class SysUserRoleService {

    @Autowired
    private BaseDaoService baseDaoService;
    @Autowired
    private SysUserRoleDao sysUserRoleDao;

    public long queryForCount(Map parameter){
        return sysUserRoleDao.queryForCount(parameter);
    }

    public List<Long> queryByUserId(Long userId){
        return sysUserRoleDao.queryByUserId(userId);
    }

    public int save(SysUserRole sysUserRole) throws Exception {
        return baseDaoService.insert(sysUserRole);
    }

    public int delete(Map params){
        return baseDaoService.delete("sys_user_role", params);
    }


}
