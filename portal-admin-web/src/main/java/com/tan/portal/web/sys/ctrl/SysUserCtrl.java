package com.tan.portal.web.sys.ctrl;

import com.github.pagehelper.PageInfo;
import com.tan.portal.common.annotation.ParaNotNull;
import com.tan.portal.common.dto.Result;
import com.tan.portal.common.enums.ErrorUserMsgEnum;
import com.tan.portal.common.validator.ValidatorUtils;
import com.tan.portal.web.sys.entity.AuthUser;
import com.tan.portal.web.sys.entity.SysUser;
import com.tan.portal.web.sys.service.SysUserRoleService;
import com.tan.portal.web.sys.service.SysUserService;
import com.tan.portal.web.util.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/5 23:09
 * @Version 1.0
 * @Description:
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserCtrl {

    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserRoleService sysUserRoleService;

    /**
     * 获取登录的用户信息
     */
    @GetMapping("/info")
    public Result info(){
        AuthUser user = UserAgent.getAuthUser();
        return new Result(user);
    }

    /**
     * 根据ID获取用户信息
     */
    @GetMapping("/{userId}")
    public Result info(@PathVariable Long userId){
        SysUser sysUser = sysUserService.querById(userId);
        List<Long> list = sysUserRoleService.queryByUserId(sysUser.getId());
        sysUser.setRoleIdList(list);
        return new Result(sysUser);
    }

    /**
     * 所有用户列表
     */
    @ParaNotNull(ParaName = {"page","rows"})
    @GetMapping("/queryForPage")
    public Result queryForPage(@RequestParam Map params){
        int pageNum = Integer.valueOf((String) params.get("page"));
        int pageSize = Integer.valueOf((String) params.get("rows"));
        PageInfo<SysUser> list = sysUserService.queryForPage(pageNum,pageSize,params);
        return new Result(list);
    }

    @PostMapping("/save")
    public Result save(@RequestBody SysUser sysUser) throws Exception {
        ValidatorUtils.validateEntity(sysUser);
        sysUser.setCreateUser(UserAgent.getAccount());
        sysUser.setCreateUserName(UserAgent.getUsername());
        sysUser.setCreateTime(Instant.now());
        sysUserService.save(sysUser);
        return new Result(200,"保存成功");
    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public Result update(@RequestBody SysUser sysUser) throws Exception {
        ValidatorUtils.validateEntity(sysUser);
        sysUser.setModifyUser(UserAgent.getAccount());
        sysUser.setModifyTime(Instant.now());

        sysUserService.update(sysUser);
        return new Result(200,"操作成功");
    }

    @RequestMapping(value = "/delete",method = RequestMethod.DELETE)
    public Result delete(@RequestBody Long[] userIds) {
        List list = Arrays.asList(userIds);
        sysUserService.deleteBatch(list);
        return new Result(200,"删除成功");
    }


    /**
     * 修改登录用户密码
     */

    @ParaNotNull(ParaName = {"account","newPassword","confirmPassword"})
    @RequestMapping("/password")
    public Result password(String account,String password, String newPassword,String confirmPassword) throws Exception {

        if (!newPassword.equals(confirmPassword)){
            return new Result(ErrorUserMsgEnum.WRONG_CONFIRM_PASSWORD.getCode(),ErrorUserMsgEnum.WRONG_CONFIRM_PASSWORD.getMsg());
        }
        //账号密码登录，如果能登录则修改密码
        sysUserService.login(account, password);
        sysUserService.updatePassword(account,newPassword);

        return new Result(200,"密码修改成功");

    }


}
