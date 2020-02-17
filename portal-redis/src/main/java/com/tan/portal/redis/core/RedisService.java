package com.tan.portal.redis.core;

/**
 * @Author: nieyy
 * @Date: 2019/3/31 19:18
 * @Version 1.0
 * @Description:
 */
public interface RedisService {

    boolean acquireLock(String key, String value, long lockTimeout);

    boolean tryLock(String key, String value, long acquireTimeout, long lockTimeout);

    boolean releaseLock(String key, String identifier);


}
