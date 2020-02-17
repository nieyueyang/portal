package com.tan.portal.common.constants;

/**
 * @Author: nieyy
 * @Date: 2019/5/18 16:44
 * @Version 1.0
 * @Description: 常量类
 */
public class Constants {
    /** 超级管理员ID */
    public static final int SUPER_ADMIN = 1;
    //登录用户ID
    public final static String USER_ID = "id";
    //登录用户账号
    public final static String ACCOUNT = "account";
    //登录用户名称
    public final static String USER_NAME = "name";
    //过期时间  16分钟(毫秒)
    public final static long EXPIRATION_TIME = 1000 * 60 * 16  ;
    //获取TOKEN的KEY
    public static final String HEADER_STRING = "Authorization";

    /**
     * 菜单类型
     */
    public enum MenuType {
        /**
         * 目录
         */
        CATALOG(0),
        /**
         * 菜单
         */
        MENU(1),
        /**
         * 按钮
         */
        BUTTON(2);

        private int value;

        MenuType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

}
