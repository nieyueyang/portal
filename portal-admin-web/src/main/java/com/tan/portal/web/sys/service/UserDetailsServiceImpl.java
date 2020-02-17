package com.tan.portal.web.sys.service;

import com.tan.portal.common.enums.ErrorUserMsgEnum;
import com.tan.portal.common.exception.UserException;
import com.tan.portal.web.sys.entity.AuthUser;
import com.tan.portal.web.sys.entity.SysUser;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collection;

/**
 * @Author: nieyy
 * @Date: 2019/4/18 19:11
 * @Version 1.0
 * @Description:
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private SysUserService sysUserService;

//    @Autowired
//    private MenuService menuService;


//    @Override
//    public UserDetails loadUserByUsername(String Account) throws UsernameNotFoundException {
//        //--------------------认证账号
//        User user = userService.loadUserByUsername(s);
//        if (user == null) {
//            throw new UsernameNotFoundException("账号不存在");
//        }
//        //-------------------开始授权
//        List<Menu> menus = menuService.getMenusByUserId(user.getId());
//        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
//        for (Menu menu : menus) {
//            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(menu.getUrl());
//            //此处将权限信息添加到 GrantedAuthority 对象中，在后面进行全权限验证时会使用GrantedAuthority 对象。
//            grantedAuthorities.add(grantedAuthority);
//        }
//        user.setAuthorities(grantedAuthorities);
//        return user;
//    }


    @Override
    public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        // --------------------认证账号
        SysUser sysUser = sysUserService.querySysUserByCode(userCode);
        // --------------------判断用户是否存在
        if(sysUser == null) {
            throw new UserException(ErrorUserMsgEnum.WRONG_USERNAME_OR_PASSWORD);
        }

//        //TODO 添加权限
//        List<SysUserRole> userRoles = userRoleService.listByUserId(user.getId());
//        for (SysUserRole userRole : userRoles) {
//            SysRole role = roleService.selectById(userRole.getRoleId());
//            authorities.add(new SimpleGrantedAuthority(role.getName()));
//        }

        // 返回UserDetails实现类
        AuthUser authUser = new AuthUser();
        BeanUtils.copyProperties(sysUser,authUser);
        return authUser;

    }

}
