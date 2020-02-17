package com.tan.portal.common.util;


public interface UploadedFileUtils {

	/**
	 * 上传临时目录子目录
	 */
	String UPLAOD_TEMP = "/temptemptemp";

	public boolean deleteFile(String filePath);	

	/**
	 * 获取上传文件的根目录
	 * <p>
	 * author: 
	 * version: 2011-3-15 下午02:59:01 <br>
	 * 
	 * @return
	 */
	public String getUploadRootDir();

	/**
	 * 获取上传文件的URL
	 */
	public String getUploadUrl();

	/**
	 * 获取上传文件的临时根目录
	 * <p>
	 * author: 
	 * version: 2011-3-15 下午02:58:54 <br>
	 * 
	 * @return
	 */
	public String getUploadTempRootDir();

	/**
	 * 获取上传临时文件的URL
	 */
	public String getUploadTempUrl();

	/**
	 * 将临时文件路径转换成正式文件路径，即用newPathPart取替换临时文件路径的开头部分
	 * @param tempPath 临时文件的路径
	 * @param newPathPart 正式文件的开始部分路径
	 * @return
	 */
	public String convertTempPathToUploadPath(String tempPath, String newPath);
}
