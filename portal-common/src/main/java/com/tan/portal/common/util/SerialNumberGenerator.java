package com.tan.portal.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 编号生成工具
 * @author chengy
 *
 */
public class SerialNumberGenerator {

    // 零字符串
    private static final String ZERO = "0";

    /**
     * 生成
     * @param id
     * @param type
     * @return
     */
    public static String generate(Long id, String type) {
        if (id != null) {
            StringBuilder number = new StringBuilder();
            // 首字母
            number.append(type);
            // 8位日期
            String dateStr = new SimpleDateFormat("yyyyMMdd").format(new Date());
            number.append(dateStr);
            // sequence
            String idStr = id.toString();
            int length = idStr.length();
            // 不足四位补齐0
            if (length < 4) {
                for (int i = 0; i < 4 - length; i++) {
                    number.append(ZERO);
                }
            }
            number.append(idStr.substring(length < 4 ? 0 : length - 4, length));
            return number.toString();
        } else {
            return null;
        }
    }
}
