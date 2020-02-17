package com.tan.portal.mybatis.annotation;

import java.lang.annotation.*;

/**
 * @Author: nieyy
 * @Date: 2019/3/29 23:07
 * @Version 1.0
 * @Description: 数据库列映射
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Column {
    public String value() default "";
}
