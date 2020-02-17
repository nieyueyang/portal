package com.tan.portal.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class RegexHelper {

	private final static String[] keyChar= {"\\","{","}","[","]","(",")","^","-","$","*","|","+","?","."};

	private final static int noCleanSize = 50;

	public static String cleanKeyCharacter(String target){
		if(null==target||"".equals(target.trim())){
			return "";
		}
		if(isNeedToClean(target)){
			for(String key : keyChar){
				if("\\".equals(key)){
					target = target.replaceAll("\\"+key, "\\\\\\\\");
				}else if("$".equals(key)){
					target = target.replaceAll("\\"+key, "\\\\\\"+key);
				}else{
					target = target.replaceAll("\\"+key, "\\\\"+key);
				}
			}
		}
		return target;
	}

	private static boolean isNeedToClean(String target) {
		if(target.length() > noCleanSize){
			return true;
		}
		for(String item : keyChar){
			if(!item.equals("\\")){
				if(target.contains(item) && ! target.contains("\\"+item)){
					return true;
				}
			}
		}
		return false;
	}


	public static String replaceValue(String content, String key, String replacement){
		if(StringUtil.isEmpty(key)){
			return content;
		}
		key = cleanKeyCharacter(key);
		String regex = "\\s?"+key+"+?\\s?";
		Pattern p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
		Matcher matcher = p.matcher(content);
		return content = matcher.replaceFirst(replacement);
	}
	


	public static String executeRegexReplace(String content, String regex, String replacement){
		Pattern p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
		Matcher matcher = p.matcher(content);
		content = matcher.replaceFirst(replacement);
		return content;
	}


	public static String cleanEnterKey(String sqlModel) {
		if(StringUtil.isEmpty(sqlModel)){
			return "";
		}
		String regex = "\\r\\n?";
		Pattern p = Pattern.compile(regex,Pattern.MULTILINE);
		Matcher matcher = p.matcher(sqlModel);
		String content = matcher.replaceAll(" ");
		return content;
	}

	public static String cleanWhiteChar(String string) {
		if(StringUtil.isEmpty(string)){
			return "";
		}
		String regex = "\\s";
		Pattern p = Pattern.compile(regex,Pattern.MULTILINE);
		Matcher matcher = p.matcher(string);
		String content = matcher.replaceAll("");
		return content;
	}

	public static boolean checkAccountSafty(String account){
		String regex = "([a-z|A-Z|0-9|_])+";
		return executeRegexMatch(account,regex);
	}

	public static boolean checkEmailCorrectness(String email) {
		String regex ="\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
		return executeRegexMatch(email,regex);
	}

	public static boolean executeRegexMatch(String content, String regex){
		if(content!=null){
			Pattern p = Pattern.compile(regex);
			Matcher matcher = p.matcher(content);
			return matcher.matches();
		}else{
			return false;
		}
	}

	public static boolean checkPhoneNumCorrectness(String phone) {
		String regex = "(\\(\\d{3,4}\\)|(\\d{3,4}\\-))*\\d{6,8}(\\-\\d{1,5})*";
		return executeRegexMatch(phone,regex);
	}

	public static boolean checkIsNumber(String str) {
		String regex = "^[\\d]+$";
		return executeRegexMatch(str, regex);
	}
}
