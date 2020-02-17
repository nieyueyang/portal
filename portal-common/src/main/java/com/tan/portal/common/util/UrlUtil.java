package com.tan.portal.common.util;

/**
 * url处理工具类
 * 
 * @author chengy
 * 
 */
public class UrlUtil {

    private final static String PORT80              = ":80";
    private final static String PORT80WITHSEPARATOR = ":80/";

    /**
     * 格式化url，主要用于处理":80"
     * 
     * @param url
     * @return
     */
    public static String format(String url) {
        if (StringUtil.isBlank(url)) {
            return "";
        }
        if (url.endsWith(PORT80)) {
            return url.substring(0, url.length() - 3);
        } else if (url.endsWith("PORT80WITHSEPARATOR")) {
            return url.substring(0, url.length() - 4) + "/";
        } else if (url.indexOf(PORT80WITHSEPARATOR) >= 0) {
            String t[] = url.split(PORT80WITHSEPARATOR);
            return t[0] + "/" + t[1];
        }
        return url;
        /**
        // 第一个冒号的位置
        int index1 = url.indexOf(":");
        // 第二个冒号的位置
        int index2 = url.indexOf(":", index1 + 1);
        System.out.println(index2);
        if (index2 > 0) {
        	// 端口号后“/”的位置
        	int index3 = url.indexOf("/", index2 + 1);
        	String urlHead = url.substring(0, index2);
        	if (index3 > 0) {
        		String urlTail = url.substring(index3, url.length());
        		return urlHead + urlTail;
        	} else {
        		return urlHead;
        	}
        }
        return url;
        */
    }
}
