package com.tan.portal.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
 * @author nieyy
 * @date 2018-1-5 
 * 
 */
public class ValidateUtils {

	/**
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isInteger(String str) {
		return regexValidate("^\\d{1,10}$",str);
	}
	
	/**
	 * 
	 * @param regex
	 * @param validateStr
	 * @return
	 */
	public static boolean regexValidate(String regex,String validateStr){
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(validateStr);

		return matcher.find();
	}
}
