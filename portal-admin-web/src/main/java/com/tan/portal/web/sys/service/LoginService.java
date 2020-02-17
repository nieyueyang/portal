package com.tan.portal.web.sys.service;

import com.tan.portal.common.util.CookieUtil;
import com.tan.portal.web.sys.entity.AuthUser;
import com.tan.portal.web.sys.entity.SysUser;
import com.tan.portal.web.util.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: nieyy
 * @Date: 2019/5/25 18:36
 * @Version 1.0
 * @Description:
 */
@Service
public class LoginService {

    @Autowired
    private SysUserService sysUserService;

    public String login(String account, String password){
        String token = sysUserService.login(account, password);
        return token;
    }

    public int register(SysUser appUser) throws Exception {
        return sysUserService.save(appUser);
    }

    public void logout(HttpServletRequest request, HttpServletResponse response){
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies){
            CookieUtil.save(cookie.getName(),null , 0,"" ,response);
        }
    }

    public String getToken(){
        AuthUser authUser = UserAgent.getAuthUser();
        return sysUserService.getToken(authUser);
    }


}
