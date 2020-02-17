package com.tan.portal.mybatis.annotation;

import java.lang.annotation.*;

/**
 * @Author: nieyy
 * @Date: 2019/3/29 23:15
 * @Version 1.0
 * @Description:
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Transient {
    public String value() default "";
}
