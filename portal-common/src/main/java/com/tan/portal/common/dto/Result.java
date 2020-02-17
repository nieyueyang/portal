package com.tan.portal.common.dto;

import java.io.Serializable;

/**
 * @Author: nieyy
 * @Date: 2019/4/28 23:14
 * @Version 1.0
 * @Description: 返回结果类
 */
public class Result<T>  implements Serializable {
    private int code;
    private String msg;
    private T data = null;

    public Result(){ }

    public Result(int code, String msg, T t){
        this.code = code;
        this.msg = msg;
        this.data = t;
    }

    public Result(int code, String msg){
        this.code = code;
        this.msg = msg;
    }

    public Result(T data){
        this.code = 200;
        this.msg = "操作成功";
        this.data= data;
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

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
