package com.tan.portal.web.sys.ctrl;

import com.tan.portal.common.annotation.ParaNotNull;
import com.tan.portal.common.dto.Result;
import com.tan.portal.web.sys.entity.SysUser;
import com.tan.portal.web.sys.service.LoginService;
import com.tan.portal.web.util.UserAgent;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Instant;

/**
 * @Author: nieyy
 * @Date: 2019/5/25 18:29
 * @Version 1.0
 * @Description:
 */
@RestController
public class LoginCtrl {

    @Autowired
    LoginService loginService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @ApiOperation(value="用户登陆", notes="用户登陆")
    @PostMapping(value = "/login")
    public Result login(String account, String password){
        String token = loginService.login(account, password);
        return new Result(token);
    }

    @ApiOperation(value="注册用户", notes="注册用户")
    @ParaNotNull(ParaName = {"account","name"})
    @PostMapping(value = "/register")
    public int register(@RequestBody SysUser sysUser) throws Exception {
        sysUser.setCreateUser(UserAgent.getAccount());
        sysUser.setCreateUserName(UserAgent.getUsername());
        sysUser.setCreateTime(Instant.now());
        return loginService.register(sysUser);
    }

    @RequestMapping("/myLogout")
    public void logout(HttpServletRequest request,HttpServletResponse response){
        loginService.logout(request, response);

    }

    @RequestMapping("/token")
    public Result getToken(){
        String token = loginService.getToken();
        return new Result(token);
    }



}
