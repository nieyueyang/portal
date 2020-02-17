package com.tan.portal.common.enums;

/**
 * @Author: nieyy
 * @Date: 2019/5/7 23:06
 * @Version 1.0
 * @Description: 全局模块错误枚举类
 */
public enum ErrorMsgEnum {
    CONNECTION_TIMEOUT(10001,"连接超时,可能是由于服务器繁忙导致！"),
    NOT_FOUND(10002,"无效的请求地址"),
    INTERNAL_SERVER_ERROR(10003,"内部服务器错误"),
    PARAM_NOT_NULL(10004,"参数不能为空"),
    PARAM_NOT_FOUND(10005,"参数个数不对"),

    PARAM_ERROR(10006,"参数错误"),
    PARAM_Illegal(10007,"输入参数含有非法字符"),
    SQL_UNIQUE(10008, "违反唯一约定"),
    UnknowErrorMsg(19999,"未知错误信息");


    private int code;
    private String msg;

    private ErrorMsgEnum(int code,String msg){
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
        for(ErrorMsgEnum item : ErrorMsgEnum.values()){
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
