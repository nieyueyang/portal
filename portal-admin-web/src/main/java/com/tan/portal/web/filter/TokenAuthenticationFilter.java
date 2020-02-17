package com.tan.portal.web.filter;

import com.tan.portal.common.constants.Constants;
import com.tan.portal.common.dto.Result;
import com.tan.portal.common.enums.ErrorUserMsgEnum;
import com.tan.portal.common.util.HttpUtil;
import com.tan.portal.web.sys.entity.AuthUser;
import com.tan.portal.web.util.TokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/4/21 23:20
 * @Version 1.0
 * @Description:  TOKEN解析拦截器
 */

public class TokenAuthenticationFilter extends BasicAuthenticationFilter {

    public TokenAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    public TokenAuthenticationFilter(AuthenticationManager authenticationManager, AuthenticationEntryPoint authenticationEntryPoint) {
        super(authenticationManager, authenticationEntryPoint);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain) throws IOException, ServletException {
        String uri = request.getRequestURI();
        if (uri.contains("/css/")||uri.contains("/fonts/")||uri.contains("/js/")||uri.contains("/libs/")
                ||uri.contains("/plugins/")||uri.contains(".ico") || uri.contains("/captcha.jpg") || uri.contains(".html")){

            chain.doFilter(request, response);
            return;
        }

        if (uri.contains("/login")){
            chain.doFilter(request, response);
            return;
        }
        String token = "null".equalsIgnoreCase(request.getHeader(Constants.HEADER_STRING))  ? "" : request.getHeader(Constants.HEADER_STRING);
        String account = "";
        if (StringUtils.isEmpty(token)) {
            Result result = new Result(ErrorUserMsgEnum.LOGIN_TIMEOUT.getCode(),ErrorUserMsgEnum.LOGIN_TIMEOUT.getMsg());
            HttpUtil.responseWriteJson(response, result);
            return;
        }
        try{
            //TODO 考虑动态加盐，盐存放的问题
            Map claims = TokenUtil.getUserDetailsFromToken(token);
            account = (String) claims.get(Constants.ACCOUNT);
            AuthUser authUser = new AuthUser();
            authUser.setId((long) (int) claims.get(Constants.USER_ID));
            authUser.setAccount(account);
            authUser.setName((String) claims.get(Constants.USER_NAME));
            authUser.setAccountNonExpired(true);
            if (authUser.isAccountNonExpired() && SecurityContextHolder.getContext().getAuthentication() == null) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(authUser, null, authUser.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }catch(ExpiredJwtException ej){
            Result result = new Result(ErrorUserMsgEnum.LOGIN_TIMEOUT.getCode(),ErrorUserMsgEnum.LOGIN_TIMEOUT.getMsg());
            HttpUtil.responseWriteJson(response, result);
            return;
        } catch(Exception e){
            // TOKEN 解析失败
            priintLog(request,account,token);
            Result result = new Result(ErrorUserMsgEnum.TOKEN_INVALID.getCode(),ErrorUserMsgEnum.TOKEN_INVALID.getMsg());
            HttpUtil.responseWriteJson(response, result);
            return;
        }
        chain.doFilter(request, response);
    }

    private void priintLog(HttpServletRequest request,String account,String token){
        String localIp = HttpUtil.getLocalIpAddr();
        String uri = request.getRequestURI();
        int port = request.getServerPort();
        //后台打印日志信息
        String url = "http://" + localIp + ":" + port + uri;
        logger.info("url:" + url + "   " + account + "  " + token );
    }



}
