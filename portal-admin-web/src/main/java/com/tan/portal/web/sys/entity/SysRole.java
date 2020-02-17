package com.tan.portal.web.sys.entity;

import com.tan.portal.mybatis.annotation.Table;
import com.tan.portal.mybatis.annotation.Transient;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

/**
 * @Author: nieyy
 * @Date: 2019/9/9 21:55
 * @Version 1.0
 * @Description:
 */
@Table("sys_role")
public class SysRole {

    private Long id;
    @NotNull(message="角色编码不能为空")
    private String roleCode;
    @NotNull(message="角色名称不能为空")
    private String roleName;
    private String remark;
    private String createUser;
    private String createUserName;
    private Instant createTime;
    private String modifyUser;
    private Instant modifyTime;
    @Transient
    private List<Long> menuIdList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public Instant getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Instant modifyTime) {
        this.modifyTime = modifyTime;
    }

    public List <Long> getMenuIdList() {
        return menuIdList;
    }

    public void setMenuIdList(List <Long> menuIdList) {
        this.menuIdList = menuIdList;
    }


}
