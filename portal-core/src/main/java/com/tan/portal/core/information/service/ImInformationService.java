package com.tan.portal.core.information.service;

import com.google.common.collect.LinkedHashMultimap;
import com.tan.portal.core.information.dao.ImInformationDao;
import com.tan.portal.core.information.entity.ImInformationEntity;
import com.tan.portal.mybatis.mapper.BaseDaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;


/**
 * @Author: nieyy
 * @Date: 2020/2/7 15:38
 * @Version 1.0
 * @Description:
 */
@Service
public class ImInformationService {

    @Autowired
    private ImInformationDao informationDao;
    @Autowired
    private BaseDaoService baseDaoService;

    public List <ImInformationEntity> queryForList(ImInformationEntity imInformationEntity){
        return informationDao.queryForList(imInformationEntity);
    }

    public ImInformationEntity queryById(Integer id){
        return informationDao.queryById(id);
    }

    public Map getYxcl(ImInformationEntity imInformationEntity, List<String> list, int num){
        List <ImInformationEntity> listFileManger = queryForList(imInformationEntity);
        LinkedHashMultimap<String,ImInformationEntity> map= LinkedHashMultimap.create();

        for(String val : list){
            for(ImInformationEntity imInformationEntity1 : listFileManger){
                if(imInformationEntity1.getModularName().equals(val)){
                    map.put(imInformationEntity1.getModularName(),imInformationEntity1);
                }
            }
        }
        return  map.asMap();
    }

    public ImInformationEntity save(ImInformationEntity imInformationEntity) throws Exception {
        int id = baseDaoService.insert(imInformationEntity);
        imInformationEntity.setId(id);
        return imInformationEntity;
    }




}
