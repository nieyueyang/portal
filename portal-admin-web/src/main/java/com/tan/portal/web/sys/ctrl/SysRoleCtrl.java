package com.tan.portal.web.sys.ctrl;

import com.github.pagehelper.PageInfo;
import com.tan.portal.common.annotation.ParaNotNull;
import com.tan.portal.common.dto.Result;
import com.tan.portal.common.validator.ValidatorUtils;
import com.tan.portal.web.sys.entity.SysRole;
import com.tan.portal.web.sys.service.SysRoleMenuService;
import com.tan.portal.web.sys.service.SysRoleService;
import com.tan.portal.web.util.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/9 21:47
 * @Version 1.0
 * @Description:
 */
@RestController
@RequestMapping("/sys/role")
public class SysRoleCtrl {

    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private SysRoleMenuService sysRoleMenuService;

    /**
     * 角色列表,分页
     */
    @ParaNotNull(ParaName = {"page","rows"})
    @GetMapping("/queryForPage")
    public Result queryForPage(@RequestParam Map params){
        int pageNum = Integer.valueOf((String) params.get("page"));
        int pageSize = Integer.valueOf((String) params.get("rows"));
        PageInfo<SysRole> list = sysRoleService.queryForPage(pageNum,pageSize,params);
        return new Result(list);
    }

    /**
     * 角色列表
     */
    @GetMapping("/list")
    public Result queryForList(@RequestParam Map params){
        List<SysRole> list = sysRoleService.queryForList(params);
        return new Result(list);
    }

    /**
     * 角色信息
     */
    @GetMapping("/info/{roleId}")
    public Result info(@PathVariable("roleId") Long roleId){
        SysRole sysRole = sysRoleService.queryById(roleId);

        //查询角色对应的菜单
        List<Long> menuIdList = sysRoleMenuService.queryMenuIdList(roleId);
        sysRole.setMenuIdList(menuIdList);
        return new Result(sysRole);
    }


    /**
     * 保存角色
     */
    @PostMapping("/save")
    public Result save(@RequestBody SysRole sysRole) throws Exception {

        ValidatorUtils.validateEntity(sysRole);

        sysRole.setCreateUser(UserAgent.getAccount());
        sysRole.setCreateUserName(UserAgent.getUsername());
        sysRole.setCreateTime(Instant.now());

        sysRoleService.saveRole(sysRole);

        return new Result(200,"保存成功");

    }


    /**
     * 更新角色信息
     */
    @PostMapping("/update")
    public Result update(@RequestBody SysRole sysRole) throws Exception {

        ValidatorUtils.validateEntity(sysRole);

        sysRole.setModifyUser(UserAgent.getAccount());
        sysRole.setModifyTime(Instant.now());

        sysRoleService.updateRole(sysRole);

        return new Result(200,"保存成功");

    }

    @RequestMapping(value = "/delete",method = RequestMethod.DELETE)
    public Result deleteBatch(@RequestBody Long[] roleIds){
        List list = Arrays.asList(roleIds);
        sysRoleService.deleteBatch(list);
        return new Result(200,"删除成功");

    }


}
