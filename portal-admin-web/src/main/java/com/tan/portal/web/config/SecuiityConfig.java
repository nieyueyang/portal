package com.tan.portal.web.config;

import com.tan.portal.web.filter.TokenAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @Author: nieyy
 * @Date: 2019/4/19 8:54
 * @Version 1.0
 * @Description:
 */

@Configuration     //启用自定义配置
@EnableWebSecurity   //禁用Boot的默认Security配置
@EnableGlobalMethodSecurity(prePostEnabled = true)   //启用Security注解，例如最常用的@PreAuthorize。
public class SecuiityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.httpBasic()
                .and().exceptionHandling().and()
                // 由于使用的是JWT，我们这里不需要csrf
                .csrf().disable()
                //.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                // 基于token，所以不需要session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                // 对于获取token的rest
                .antMatchers("/login","**/*.html","/register","/druid").permitAll()
                //swagger的所有请求swagger
                .antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources/**", "/configuration/security","/swagger-ui.html","/images/**","/webjars/**").permitAll()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated()
                .and().formLogin().loginPage("/login.html").permitAll();

        // 禁用缓存
        httpSecurity.headers().cacheControl();
        httpSecurity.headers().frameOptions().sameOrigin().httpStrictTransportSecurity().disable();
        // 添加JWT filter
        httpSecurity.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web){
        //解决静态资源被拦截的问题
        web.ignoring().antMatchers("/css/**");
        web.ignoring().antMatchers("/fonts/**");
        web.ignoring().antMatchers("/js/**");
        web.ignoring().antMatchers("/libs/**");
        web.ignoring().antMatchers("/plugins/**");

        web.ignoring().antMatchers("/login.html");
        web.ignoring().antMatchers("/index.html");
        web.ignoring().antMatchers("/index1.html");
        web.ignoring().antMatchers("/header.html");
        web.ignoring().antMatchers("/main.html");
        web.ignoring().antMatchers("/error.html");
        web.ignoring().antMatchers("/favicon.ico");
        web.ignoring().antMatchers("/view/**");
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() throws Exception {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() throws Exception {

        return new TokenAuthenticationFilter(authenticationManagerBean());
    }




}
