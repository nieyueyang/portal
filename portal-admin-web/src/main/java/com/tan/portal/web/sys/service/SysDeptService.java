package com.tan.portal.web.sys.service;

import com.tan.portal.mybatis.mapper.BaseDaoService;
import com.tan.portal.web.sys.dao.SysDeptDao;
import com.tan.portal.web.sys.entity.SysDept;
import com.tan.portal.web.util.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/9 22:57
 * @Version 1.0
 * @Description:
 */
@Service
public class SysDeptService {

    @Autowired
    private SysDeptDao sysDeptDao;
    @Autowired
    private BaseDaoService baseDaoService;

    public List<SysDept> queryForLsit(Map params){
        return sysDeptDao.queryForList(params);
    }

    public SysDept queryById(Long id){
        return sysDeptDao.queryById(id);
    }

    public int save(SysDept sysDept) throws Exception {
        sysDept.setCreateUser(UserAgent.getAccount());
        sysDept.setCreateUserName(UserAgent.getUsername());
        sysDept.setCreateTime(Instant.now());
        return baseDaoService.insert(sysDept);
    }

    public int update(SysDept sysDept) throws Exception {
        Map params = new HashMap();
        params.put("id", sysDept.getId());
        return baseDaoService.update(sysDept,params);
    }

    public int removeById(Long id){
        return sysDeptDao.removeById(id);
    }

}
