package com.tan.portal.web.sys.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tan.portal.mybatis.mapper.BaseDaoService;
import com.tan.portal.common.constants.Constants;
import com.tan.portal.common.enums.ErrorUserMsgEnum;
import com.tan.portal.common.exception.UserException;
import com.tan.portal.web.sys.dao.SysUserDao;
import com.tan.portal.web.sys.entity.AuthUser;
import com.tan.portal.web.sys.entity.SysDept;
import com.tan.portal.web.sys.entity.SysUser;
import com.tan.portal.web.sys.entity.SysUserRole;
import com.tan.portal.web.util.TokenUtil;
import com.tan.portal.web.util.UserAgent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysUserService{

    private static final Logger logger = LoggerFactory.getLogger(SysUserService.class);

    @Autowired
    SysUserDao sysUserDao;
    @Autowired
    BaseDaoService baseDaoService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private SysDeptService sysDeptService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private SysUserRoleService sysUserRoleService;

    public String login(String account, String password){
        try{
            UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken(account,password);
            Authentication authentication = authenticationManager.authenticate(upToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            AuthUser authUser = (AuthUser) authentication.getPrincipal();
            String token = getToken(authUser);
            return token;
        }catch(Exception e){
            logger.error("登录失败！",e);
            throw new UserException(ErrorUserMsgEnum.WRONG_USERNAME_OR_PASSWORD);
        }
    }

    public String getToken(AuthUser authUser){
        Map <String, Object> map = new HashMap();
        map.put(Constants.USER_ID, authUser.getId());
        map.put(Constants.ACCOUNT, authUser.getAccount());
        map.put(Constants.USER_NAME,authUser.getName());
        return TokenUtil.generateToken(map);
    }

    public PageInfo<SysUser> queryForPage(int pageNum, int pageSize, Map params){
        String orderby = "";
        String sidx = (String) params.get("sidx");
        if (!StringUtils.isEmpty(sidx)){
            String sord = (String) params.get("sord");
            orderby = sidx + " " + sord;
        }
        PageHelper.startPage(pageNum,pageSize, orderby);
        List<SysUser> list = sysUserDao.queryForList(params);

        for(SysUser sysUser : list){
            Long deptId = sysUser.getDeptId();
            if (!StringUtils.isEmpty(deptId)){
                SysDept sysDept = sysDeptService.queryById(sysUser.getDeptId());
                if (sysDept != null){
                    sysUser.setDeptName(sysDept.getDeptName());
                }
            }
        }

        PageInfo<SysUser> PageUser = new PageInfo<>(list);
        return PageUser;
    }

    public SysUser querySysUserByCode(String account){
        return sysUserDao.querySysUserByCode(account);
    }

    public SysUser querById(Long id){
        return sysUserDao.queryById(id);
    }

    public SysUser queryByAccount(String account){
        return sysUserDao.queryByAccount(account);
    }


    public int save(SysUser sysUser) throws Exception {
        String password = sysUser.getPassword();
        if (StringUtils.isEmpty(password)){
            //默认密码是888888，这是前台加密后的密码
            password = "92925488b28ab12584ac8fcaa8a27a0f497b2c62940c8f4fbc8ef19ebc87c43e";
        }
        sysUser.setPassword(bCryptPasswordEncoder.encode(password));
        return baseDaoService.insert(sysUser);
    }

    @Transactional
    public int update(SysUser sysUser) throws Exception {
        sysUser.setPassword(null);
        sysUser.setModifyUser(UserAgent.getAccount());
        sysUser.setModifyTime(Instant.now());
        Map params = new HashMap();
        params.put("id",sysUser.getId());
        int i = baseDaoService.update(sysUser,params);

        //先删除用户所有的授权角色
        Map parameter = new HashMap();
        parameter.put("user_id", sysUser.getId());
        sysUserRoleService.delete(parameter);

        SysUserRole sysUserRole = new SysUserRole();
        for (Long roleId :  sysUser.getRoleIdList()){
            sysUserRole.setUserId(sysUser.getId());
            sysUserRole.setRoleId(roleId);
            sysUserRole.setCreateUser(UserAgent.getAccount());
            sysUserRole.setCreateUserName(UserAgent.getUsername());
            sysUserRole.setCreateTime(Instant.now());
            sysUserRoleService.save(sysUserRole);

        }
        return i;

    }

    //TOdo  人员不能删，后续要改成逻辑删除
    @Transactional
    public int deleteBatch(List<Long> list){
        int i = baseDaoService.deleteBatch("sys_user", list);
        //删除人员与角色的关系
        for(Long userId : list){
            Map params = new HashMap();
            params.put("user_id", userId);
            sysUserRoleService.delete(params);
        }
        return i;
    }

    public int updatePassword(String account,String newPassword) throws Exception {
        SysUser sysUser = new SysUser();
        sysUser.setPassword(bCryptPasswordEncoder.encode(newPassword));
        sysUser.setModifyUser(UserAgent.getAccount());
        sysUser.setModifyTime(Instant.now());
        Map params = new HashMap();
        params.put("account",account);
        return baseDaoService.update(sysUser,params);
    }






}
