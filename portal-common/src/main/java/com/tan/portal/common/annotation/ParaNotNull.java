package com.tan.portal.common.annotation;

import java.lang.annotation.*;

/**
 * @Author: nieyy
 * @Date: 2019/5/17 0:18
 * @Version 1.0
 * @Description: 如果值为空，则表示所有的参数都不能为空
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ParaNotNull{

    String[] ParaName();

}
