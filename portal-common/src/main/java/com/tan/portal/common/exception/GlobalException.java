package com.tan.portal.common.exception;

import com.tan.portal.common.enums.ErrorMsgEnum;

import java.text.MessageFormat;

/**
 * @Author: nieyy
 * @Date: 2019/5/14 23:08
 * @Version 1.0
 * @Description: 全局异常类
 */
public class GlobalException extends Exception {
    public GlobalException() {
        super();
    }

    public GlobalException(String message) {
        super(message);
    }

    public GlobalException(int code,String message) {
        super(code + " : " + message);
        this.globalExceptionCode = code;
        this.globalExceptionMsg = message;
    }

    public GlobalException(ErrorMsgEnum errorMsgEnum) {
        super(errorMsgEnum.getCode()+ " : " + errorMsgEnum.getMsg());
        this.globalExceptionCode = errorMsgEnum.getCode();
        this.globalExceptionMsg = errorMsgEnum.getMsg();
    }

    private int globalExceptionCode;
    private String globalExceptionMsg;

    @Override
    public Throwable fillInStackTrace() {
        return this;
    }
    @Override
    public String toString() {
        return MessageFormat.format("{0}[{1}]",this.globalExceptionCode,this.globalExceptionMsg);
    }

    public int getGlobalExceptionCode() {
        return globalExceptionCode;
    }

    public void setGlobalExceptionCode(int globalExceptionCode) {
        this.globalExceptionCode = globalExceptionCode;
    }

    public String getGlobalExceptionMsg() {
        return globalExceptionMsg;
    }

    public void setGlobalExceptionMsg(String globalExceptionMsg) {
        this.globalExceptionMsg = globalExceptionMsg;
    }
}
