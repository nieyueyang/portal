package com.tan.portal.mybatis.annotation;

import java.lang.annotation.*;

/**
 * @Author: nieyy
 * @Date: 2019/3/29 23:11
 * @Version 1.0
 * @Description:
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Table {
    public String value() default "";
}
