package com.tan.portal.web.sys.service;

import com.tan.portal.mybatis.mapper.BaseDaoService;
import com.tan.portal.common.constants.Constants;
import com.tan.portal.web.sys.dao.SysMenuDao;
import com.tan.portal.web.sys.entity.SysMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysMenuService  {

	@Autowired
	private SysMenuDao sysMenuDao;
	@Autowired
	private BaseDaoService baseDaoService;
	@Autowired
	private SysRoleMenuService sysRoleMenuService;

	public List<SysMenu> queryForList(Map params){
		return sysMenuDao.queryForList(params);

	}

	public List<SysMenu> getUserMenuList(Long userId) {
		//系统管理员，拥有最高权限
		if(userId == Constants.SUPER_ADMIN){
			return getAllMenuList(null);
		}
		
		//用户菜单列表
		List<Long> menuIdList = sysMenuDao.queryAllMenuId(userId);
		return getAllMenuList(menuIdList);
	}

	/**
	 * 获取所有菜单列表
	 */
	private List<SysMenu> getAllMenuList(List<Long> menuIdList){
		//查询根菜单列表
		List<SysMenu> menuList = queryListParentId(0L, menuIdList);
		//递归获取子菜单
		getMenuTreeList(menuList, menuIdList);

		return menuList;
	}

	public List<SysMenu> queryListParentId(Long parentId, List<Long> menuIdList) {
		List<SysMenu> menuList = queryListParentId(parentId);
		if(menuIdList == null){
			return menuList;
		}

		List<SysMenu> userMenuList = new ArrayList<>();
		for(SysMenu menu : menuList){
			if(menuIdList.contains(menu.getId())){
				userMenuList.add(menu);
			}
		}
		return userMenuList;
	}

	public List<SysMenu> queryListParentId(Long parentId) {
		return sysMenuDao.queryListParentId(parentId);
	}

	/**
	 * 递归
	 */
	private List<SysMenu> getMenuTreeList(List<SysMenu> menuList, List<Long> menuIdList){
		List<SysMenu> subMenuList = new ArrayList<SysMenu>();

		for(SysMenu entity : menuList){
			//目录
			if(entity.getType() == Constants.MenuType.CATALOG.getValue()){
				entity.setList(getMenuTreeList(queryListParentId(entity.getId(), menuIdList), menuIdList));
			}
			subMenuList.add(entity);
		}

		return subMenuList;
	}

	public SysMenu queryById(long id){
		return sysMenuDao.queryById(id);
	}

	public List<SysMenu> queryNotButtonList() {
		return sysMenuDao.queryNotButtonList();
	}

	public int save(SysMenu sysMenu) throws Exception {
		return baseDaoService.insert(sysMenu);
	}

	public int update(SysMenu sysMenu) throws Exception {
		Map params = new HashMap();
		params.put("id",sysMenu.getId());
		return baseDaoService.update(sysMenu,params);
	}

	@Transactional
	public int delete(Long id){
		Map params = new HashMap();
		params.put("id",id );
		int i = baseDaoService.delete("sys_menu", params);
		sysRoleMenuService.delete("menu_id", id);
		return i;
	}




}
