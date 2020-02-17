package com.tan.portal.web.information;

import com.tan.portal.common.dto.Result;
import com.tan.portal.core.information.entity.ImInformationEntity;
import com.tan.portal.core.information.service.ImInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: nieyy
 * @Date: 2020/2/16 22:30
 * @Version 1.0
 * @Description:
 */
@RestController
@RequestMapping("/imInformation")
public class ImInformationCtrl {

    @Autowired
    private ImInformationService imInformationService;

    @PostMapping
    public Result save(@RequestBody ImInformationEntity imInformationEntity) throws Exception {
        imInformationEntity= imInformationService.save(imInformationEntity);
        return new Result(imInformationEntity);
    }


}
