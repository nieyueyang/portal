package com.tan.portal.web.ctrl;

import com.tan.portal.common.dto.Result;
import com.tan.portal.core.information.entity.ImInformationEntity;
import com.tan.portal.core.information.enums.EnumHomeMenu;
import com.tan.portal.core.information.service.ImInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2020/2/7 3:42
 * @Version 1.0
 * @Description:
 */
@RestController
@RequestMapping("/homePage")
public class HomepPageCtrl {

    @Autowired
    private ImInformationService imInformationService;

    @RequestMapping(value="/queryForList",method = RequestMethod.GET)
    public Result homePage(){

        ImInformationEntity imInformationEntity = new ImInformationEntity();
        imInformationEntity.setModularName("营销政策");
        //营销信息
        List <String> list = EnumHomeMenu.toList("营销政策");
        Map yxzc = imInformationService.getYxcl(imInformationEntity,list,6);

//        //新闻中心
//        fileManagerEntity.setUpload_project("新闻中心");
//        List<String> listXwzx = EnumHomeMenu.toList("新闻中心");
//        Map xwzx = fileManagerService.getYxcl(fileManagerEntity,listXwzx,5);

        return new Result(yxzc);
    }

    @RequestMapping("/queryGroupNews")
    public Result queryGroupNews(String modularName,Integer id){
        ImInformationEntity query = new ImInformationEntity();
        query.setModularName(modularName);
        query.setId(id);
        List<ImInformationEntity> list = imInformationService.queryForList(query);
        return new Result(list);
    }


    @RequestMapping("/queryFileManagerById")
    public Result detailsPage(@RequestParam(value = "id") Integer id) {
        ImInformationEntity imInformationEntity = imInformationService.queryById(id);
        return new Result(imInformationEntity);
    }





}
