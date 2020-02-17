package com.tan.portal.web.sys.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: nieyy
 * @Date: 2019/4/21 23:20
 * @Version 1.0
 * @Description:  拦截所有html请求，通过模板解析后，返回html
 */

@Controller
public class SysPageCtrl {

	@RequestMapping("view/{module}/{url}.html")
	public String module(@PathVariable("module") String module, @PathVariable("url") String url){
		return "view/" + module + "/" + url;
	}

	@RequestMapping(value = {"/", "index.html"})
	public String index(){
		return "index";
	}

	@RequestMapping(value = {"/", "index1.html"})
	public String index1(){
		return "index1";
	}

	@RequestMapping("login.html")
	public String login(){
		return "login";
	}

	@RequestMapping("main.html")
	public String main(){
		return "main";
	}

	@RequestMapping("404.html")
	public String notFound(){
		return "404";
	}

	@RequestMapping("/error.html")
	public String error(){
		return "/error";
	}

}
