package com.tan.portal.web.util;

import com.tan.portal.web.sys.entity.AuthUser;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @Author: nieyy
 * @Date: 2019/6/26 22:25
 * @Version 1.0
 * @Description:
 */
public class UserAgent {

    public static AuthUser getAuthUser() {
        return (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * 获取系统用户id
     * @return 系统用户id
     */
    public static Long getUserId(){
        return getAuthUser().getId();
    }

    /**
     * 获取系统用户名称
     * @return 系统用户名称
     */
    public static String getAccount(){
        return getAuthUser().getAccount();
    }

    /**
     * 获取系统用户名称
     * @return 系统用户名称
     */
    public static String getUsername(){
        return getAuthUser().getName();
    }



}
