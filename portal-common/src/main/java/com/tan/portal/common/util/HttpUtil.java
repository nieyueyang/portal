package com.tan.portal.common.util;

import com.alibaba.fastjson.JSON;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

/**
 * @Author: nieyy
 * @Date: 2019/5/1 11:32
 * @Version 1.0
 * @Description:
 */
public class HttpUtil {

    public static <T> void ResponseError(HttpServletResponse response,T t) throws IOException {
        OutputStream out = null;
        response.setStatus(200);
        response.setContentType("application/json; charset=utf-8");
        response.setCharacterEncoding("UTF-8"); // 避免乱码
        try{
            String json = JSON.toJSONString(t);
            out = response.getOutputStream();
            out.write(json.getBytes("UTF-8"));
            out.flush();
        }finally {
            out.flush();
            out.close();
        }
    }

    public static void ResponseError(HttpServletResponse response) throws IOException {
        response.setStatus(200);
        response.setContentType("application/json; charset=utf-8");
        response.setCharacterEncoding("UTF-8"); // 避免乱码
        response.flushBuffer();
    }

    public static <T> void responseWriteJson(HttpServletResponse response, T t) {
        response.setStatus(200);
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        try {
            response.getWriter().write(JSON.toJSONString(t));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void responseWriteJson(HttpServletResponse response) {
        response.setStatus(200);
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        try {
            response.getWriter().write("");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取本机IP地址
     * @return
     */
    public static String getLocalIpAddr(){
        String ipAddress = "";
        Enumeration allNetInterfaces = null;
        try {
            allNetInterfaces = NetworkInterface.getNetworkInterfaces();
            InetAddress ip = null;
            while (allNetInterfaces.hasMoreElements())
            {
                NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
                Enumeration addresses = netInterface.getInetAddresses();
                while (addresses.hasMoreElements())
                {
                    ip = (InetAddress) addresses.nextElement();
                    if (ip != null && ip instanceof Inet4Address)
                    {
                        ipAddress = ip.getHostAddress();
                    }
                }
            }
        } catch (SocketException e) {
            return null;
        }
        return ipAddress;

    }

    /**
     * 获取目标主机的ip
     * @param request
     * @return
     */
    public static String getRemoteHost(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return "0:0:0:0:0:0:0:1".equals(ip) ? "127.0.0.1" : ip;
    }



}
