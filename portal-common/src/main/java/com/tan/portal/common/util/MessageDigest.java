package com.tan.portal.common.util;

public abstract interface MessageDigest
{
  public abstract String digest(String paramString);
  
  public abstract String digest(String paramString1, String paramString2);
}
