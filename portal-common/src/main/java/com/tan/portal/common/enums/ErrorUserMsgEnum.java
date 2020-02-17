package com.tan.portal.common.enums;

/**
 * @Author: nieyy
 * @Date: 2019/5/1 9:16
 * @Version 1.0
 * @Description: user模块错误枚举类
 */
public enum ErrorUserMsgEnum {

    TOKEN_INVALID(20001,"无效的TOKEN,请重新登录"),
    TOKEN_TIMEOUT(20002,"TOKEN已过期，请重新登录"),
    LOGIN_TIMEOUT(20003,"登录超时，请重新登录"),
    AUTHORIZATION_NOT_FOUND(20005,"你没有访问权限，请登录系统"),
    WRONG_USERNAME_OR_PASSWORD(20010,"用户名或密码错误"),
    WRONG_CONFIRM_PASSWORD(20011,"输入的两次新密码不一样，请重新输入"),
    WRONG_CHECKCODE(20012,"输入的验证码不正确"),
    PARAM_ERROR(20013,"参数不能为空"),
    CHECK_PWD_ERROR(20014,"密码校验失败");

    private int code;
    private String msg;

    ErrorUserMsgEnum(int code,String msg){
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    /**
     * 根据错误代码获取错误信息
     * @param code
     * @return
     */
    public static String getMsgByCode(int code){
        for(ErrorUserMsgEnum item : ErrorUserMsgEnum.values()){
            if(code==item.getCode()){
                return item.msg;
            }
        }
        return getUnknowErrorMsg();
    }

    public static String getUnknowErrorMsg(){
        return "未知错误信息";
    }
}