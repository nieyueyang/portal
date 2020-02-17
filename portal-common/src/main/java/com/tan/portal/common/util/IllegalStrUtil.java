package com.tan.portal.common.util;

import org.slf4j.LoggerFactory;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Author: nieyy
 * @Date: 2019/4/28 22:52
 * @Version 1.0
 * @Description: 特殊字符检测工具（防止传入非法字符和sql注入攻击）
 */
public class IllegalStrUtil {
    private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(IllegalStrUtil.class);

    private static final String REGX = "!|！|◎|#|＃|(\\$)|￥|%|％|(\\^)|……|(\\&)|※|(\\*)|×|(\\()|（|(\\))|）——|(\\+)|＋|(\\|)|§ ";

    /**
     * 对常见的sql注入攻击进行拦截
     *
     * @param sInput
     * @return
     *  true 表示参数不存在SQL注入风险
     *  false 表示参数存在SQL注入风险
     */
    public static Boolean sqlStrFilter(String sInput) {
        sInput = sInput.toUpperCase();
        if (sInput.indexOf("DELETE ") >= 0 || sInput.indexOf("ASCII") >= 0 || sInput.indexOf("UPDATE") >= 0 || sInput.indexOf(" SELECT ") >= 0
                || sInput.indexOf("'") >= 0 || sInput.indexOf("SUBSTR(") >= 0 || sInput.indexOf("COUNT(") >= 0 || sInput.indexOf(" OR ") >= 0
                || sInput.indexOf(" AND ") >= 0 || sInput.indexOf("DROP ") >= 0 || sInput.indexOf("EXECUTE") >= 0 || sInput.indexOf("EXEC") >= 0
                || sInput.indexOf("TRUNCATE") >= 0 || sInput.indexOf("INTO") >= 0 || sInput.indexOf("DECLARE ") >= 0 || sInput.indexOf("MASTER ") >= 0) {
            return false;
        }
        return true;
    }

    /**
     * 对非法字符进行检测
     *
     * @param sInput
     * @return
     *  true 表示参数不包含非法字符
     *  false 表示参数包含非法字符
     */
    public static Boolean isIllegalStr(String sInput) {
        sInput = sInput.trim();
        Pattern compile = Pattern.compile(REGX, Pattern.CASE_INSENSITIVE);
        Matcher matcher = compile.matcher(sInput);
        return !matcher.find();
    }
}
