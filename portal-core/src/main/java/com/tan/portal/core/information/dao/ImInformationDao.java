package com.tan.portal.core.information.dao;

import com.tan.portal.core.information.entity.ImInformationEntity;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * @Author: nieyy
 * @Date: 2020/2/16 22:19
 * @Version 1.0
 * @Description:
 */
@Repository
public class ImInformationDao {

    @Autowired
    private SqlSession sqlSession;

    public List<ImInformationEntity> queryForList(ImInformationEntity imInformationEntity){
        return sqlSession.selectList("com.imInformation.queryForList",imInformationEntity);
    }

    public ImInformationEntity queryById(Integer id){
        return sqlSession.selectOne("com.imInformation.queryById",id);
    }

}
