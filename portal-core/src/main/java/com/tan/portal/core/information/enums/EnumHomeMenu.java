package com.tan.portal.core.information.enums;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2020/2/7 3:18
 * @Version 1.0
 * @Description: 门户首页菜单
 */
public enum EnumHomeMenu {
    JTYW("集团要闻","新闻中心", "新闻中心-集团要闻"),
    GSXW("公司新闻","新闻中心", "新闻中心-公司新闻"),
    XSDT("销售动态","新闻中心", "新闻中心-销售动态") ,
    GJZC("国家政策","营销政策", "营销政策-国家政策"),
    JTZC("集团政策","营销政策", "营销政策-集团政策"),
    SCFX("市场分析","营销政策", "营销政策-市场分析") ;

    private String name;
    private String parentName;
    private String fullName;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    public String getParentName() {
        return parentName;
    }
    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    private EnumHomeMenu(String name, String parentName, String fullName) {
        this.name = name;
        this.parentName = parentName;
        this.fullName = fullName;
    }


    public static Map <String, String> toMap(){
        Map<String, String> enumCooperationSub = new LinkedHashMap <String, String>();
        for (EnumHomeMenu type : EnumHomeMenu.values()) {
            enumCooperationSub.put(type.getName(),type.getFullName());
        }
        return enumCooperationSub;
    }

    public static String getByName(String name) {
        for (EnumHomeMenu item : EnumHomeMenu.values()) {
            if (item.getName().equals(name)) {
                return item.fullName;
            }
        }
        return null;
    }

    public static List <String> toList(String parentName) {
        List<String> list = new ArrayList <String>();
        for (EnumHomeMenu item : EnumHomeMenu.values()) {
            if(item.getParentName().equals(parentName)){
                list.add(item.getFullName());
            }
        }
        return list;
    }
}

