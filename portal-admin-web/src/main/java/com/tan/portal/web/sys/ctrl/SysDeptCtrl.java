package com.tan.portal.web.sys.ctrl;

import com.tan.portal.common.constants.Constants;
import com.tan.portal.common.dto.Result;
import com.tan.portal.web.sys.entity.SysDept;
import com.tan.portal.web.sys.service.SysDeptService;
import com.tan.portal.web.util.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: nieyy
 * @Date: 2019/9/9 23:00
 * @Version 1.0
 * @Description:
 */
@RestController
@RequestMapping("/sys/dept")
public class SysDeptCtrl {

    @Autowired
    private SysDeptService sysDeptService;

    @RequestMapping("/list")
    public Result queryForList(Map params){

        params.put("delFlag", "0");
        List<SysDept> list = sysDeptService.queryForLsit(params);
        return new Result(list);
    }

    /**
     * 上级部门Id(管理员则为0)
     */
    @GetMapping("/info")
    public Result info(){
        long deptId = 0;
        if(UserAgent.getUserId() != Constants.SUPER_ADMIN){
            Map params = new HashMap();
            params.put("delFlag", "0");
            List<SysDept> deptList = sysDeptService.queryForLsit(params);
            Long parentId = null;
            for(SysDept sysDept : deptList){
                if(parentId == null){
                    parentId = sysDept.getParentId();
                    continue;
                }

                if(parentId > sysDept.getParentId().longValue()){
                    parentId = sysDept.getParentId();
                }
            }
            deptId = parentId;
        }

        return new Result(deptId);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{deptId}")
    public Result info(@PathVariable("deptId") Long deptId){
        SysDept sysDept = sysDeptService.queryById(deptId);
        return new Result(sysDept);
    }

    /**
     * 选择部门(添加、修改菜单)
     */
    @RequestMapping("/select")
    public Result select(){
        Map params = new HashMap();
        params.put("delFlag", "0");
        List<SysDept> deptList = sysDeptService.queryForLsit(params);

        //添加一级部门
        if(UserAgent.getUserId() == Constants.SUPER_ADMIN){
            SysDept root = new SysDept();
            root.setId(0L);
            root.setDeptName("一级部门");
            root.setParentId(-1L);
            root.setOpen(true);
            deptList.add(root);
        }

        return new Result(deptList);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public Result save(@RequestBody SysDept sysDept) throws Exception {
        sysDeptService.save(sysDept);
        return new Result(200,"保存成功");
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public Result update(@RequestBody SysDept dept) throws Exception {
        sysDeptService.update(dept);
        return new Result(200,"修改成功");
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public Result delete(Long deptId) {
        //判断是否有子部门
        Map params = new HashMap();
        params.put("parentId",deptId);
        params.put("delFlag", "0");
        List<SysDept> list = sysDeptService.queryForLsit(params);
        if(list.size() > 0){
            return new Result(200,"请先删除子部门");
        }

        sysDeptService.removeById(deptId);
        return new Result(200,"删除成功");
    }



}
