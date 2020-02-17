package com.tan.portal.web.sys.ctrl;

import com.tan.portal.common.constants.Constants;
import com.tan.portal.common.dto.Result;
import com.tan.portal.common.enums.ErrorMsgEnum;
import com.tan.portal.web.sys.entity.SysMenu;
import com.tan.portal.web.sys.service.SysMenuService;
import com.tan.portal.web.util.UserAgent;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

/**
 * 系统菜单
 *
 * @author Mark sunlightcs@gmail.com
 */
@RestController
@RequestMapping("/sys/menu")
public class SysMenuCtrl {
	@Autowired
	private SysMenuService sysMenuService;

	/**
	 * 导航菜单
	 */
	@RequestMapping("/nav")
	public Result nav(){
		List<SysMenu> menuList = sysMenuService.getUserMenuList(UserAgent.getUserId());
		return new Result(menuList);
	}

	/**
	 * 所有菜单列表
	 */
	@RequestMapping("/list")
	public Result list(){
		List<SysMenu> menuList = sysMenuService.queryForList(null);
		for(SysMenu sysMenu : menuList){
			SysMenu parentMenu = sysMenuService.queryById(sysMenu.getParentId());
			if(parentMenu != null){
				sysMenu.setParentName(parentMenu.getName());
			}
		}
		return new Result(menuList);
	}

	/**
	 * 所有菜单列表,用来列表显示
	 */

	@GetMapping("/info/{id}")
	public Result info(@PathVariable Long id){
		SysMenu sysMenu = sysMenuService.queryById(id);
		return new Result(sysMenu);
	}

	/**
	 * 选择菜单(添加、修改菜单)
	 */
	@RequestMapping("/select")
	public Result select(){
		//查询列表数据
		List<SysMenu> menuList = sysMenuService.queryNotButtonList();

		//添加顶级菜单
		SysMenu root = new SysMenu();
		root.setId(0L);
		root.setName("一级菜单");
		root.setParentId(-1L);
		root.setOpen(true);
		menuList.add(root);
		return new Result(menuList);
	}

	@PostMapping("/save")
	public Result save(@RequestBody SysMenu sysMenu) throws Exception {
		//数据校验
		String verify = verifyForm(sysMenu);
		if (verify == "true"){
			sysMenu.setCreateUser(UserAgent.getAccount());
			sysMenu.setCreateUserName(UserAgent.getUsername());
			sysMenu.setCreateTime(Instant.now());
			sysMenuService.save(sysMenu);
			return new Result(200,"保存成功");
		}else{
			return new Result(ErrorMsgEnum.PARAM_ERROR.getCode(),verify);
		}
	}

	@PostMapping("/update")
	public Result update(@RequestBody SysMenu sysMenu) throws Exception {
		//数据校验
		String verify = verifyForm(sysMenu);
		if (verify == "true"){
			sysMenu.setModifyUser(UserAgent.getAccount());
			sysMenu.setModifyTime(Instant.now());
			sysMenuService.update(sysMenu);
			return new Result(200,"修改成功");
		}else{
			return new Result(ErrorMsgEnum.PARAM_ERROR.getCode(),verify);
		}
	}

	@RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
	public Result delete(@PathVariable Long id){
		sysMenuService.delete(id);
		return new Result(200,"删除成功");
	}

	/**
	 * 验证参数是否正确
	 */
	private String verifyForm(SysMenu menu){
		if(StringUtils.isBlank(menu.getName())){
			return "菜单名称不能为空";
		}

		if(menu.getParentId() == null){
			return "上级菜单不能为空";
		}

		//菜单
		if(menu.getType() == Constants.MenuType.MENU.getValue()){
			if(StringUtils.isBlank(menu.getUrl())){
				return "菜单URL不能为空";
			}
		}

		//上级菜单类型
		int parentType = Constants.MenuType.CATALOG.getValue();
		if(menu.getParentId() != 0){
			SysMenu parentMenu = sysMenuService.queryById(menu.getParentId());
			parentType = parentMenu.getType();
		}

		//目录、菜单
		if(menu.getType() == Constants.MenuType.CATALOG.getValue() ||
				menu.getType() == Constants.MenuType.MENU.getValue()){
			if(parentType != Constants.MenuType.CATALOG.getValue()){
				return "上级菜单只能为目录类型";
			}
			return "true";
		}

		//按钮
		if(menu.getType() == Constants.MenuType.BUTTON.getValue()){
			if(parentType != Constants.MenuType.MENU.getValue()){
				return "上级菜单只能为菜单类型";
			}
			return "true";
		}

		return "true";
	}
	


}