package com.tan.portal.common.exception;

import com.tan.portal.common.enums.ErrorUserMsgEnum;

import java.text.MessageFormat;

/**
 * @Author: nieyy
 * @Date: 2019/5/4 18:26
 * @Version 1.0
 * @Description:
 */
public class UserException extends RuntimeException {

    public UserException() {
        super();
    }

    public UserException(String message) {
        super(message);
    }

    public UserException(int code,String message) {
        super(code + " : " + message);
    }

    public UserException(ErrorUserMsgEnum errorUserMsgEnum) {
        super(errorUserMsgEnum.getCode()+ " : " + errorUserMsgEnum.getMsg());
        this.exceptionCode = errorUserMsgEnum.getCode();
        this.exceptionMsg = errorUserMsgEnum.getMsg();
    }

    private int exceptionCode;
    private String exceptionMsg;

    public int getExceptionCode() {
        return exceptionCode;
    }

    public void setExceptionCode(int exceptionCode) {
        this.exceptionCode = exceptionCode;
    }

    public String getExceptionMsg() {
        return exceptionMsg;
    }

    public void setExceptionMsg(String exceptionMsg) {
        this.exceptionMsg = exceptionMsg;
    }

    @Override
    public Throwable fillInStackTrace() {
        return this;
    }
    @Override
    public String toString() {
        return MessageFormat.format("{0}[{1}]",this.exceptionCode,this.exceptionMsg);
    }


}
