package com.tan.portal.redis.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * @Author: nieyy
 * @Date: 2019/3/31 19:18
 * @Version 1.0
 * @Description:
 */
@Service
public class RedisServiceImpl implements RedisService {

    private final static Logger logger = LoggerFactory.getLogger(RedisServiceImpl.class);

    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @Override
    public boolean acquireLock(String key, String value, long lockTimeout) {
        return stringRedisTemplate.opsForValue().setIfAbsent(key, value, lockTimeout, TimeUnit.MILLISECONDS);
    }

    @Override
    public boolean tryLock(String key, String value, long acquireTimeout, long lockTimeout) {
        boolean result = false;
        key = "lock:" + key;
        long endTime = System.currentTimeMillis() + acquireTimeout;
        while(System.currentTimeMillis() < endTime){
            result = stringRedisTemplate.opsForValue().setIfAbsent(key, value, lockTimeout, TimeUnit.MILLISECONDS);
            if(result){
                return result;
            }

            if (stringRedisTemplate.getExpire(key) == -1){
                stringRedisTemplate.expire(key, lockTimeout, TimeUnit.MILLISECONDS);
            }
            try{
                Thread.sleep(100);
            }catch(Exception e){
                e.printStackTrace();
            }

        }
        return result;
    }

    @Override
    public boolean releaseLock(String key, String identifier) {
        logger.info(key + "开始释放锁：" + identifier);
        key = "lock:" + key;
        boolean isRelease = false;
        try{
            stringRedisTemplate.watch(key);
            String value = stringRedisTemplate.opsForValue().get(key);
            if (identifier.equals(value)){
                isRelease = stringRedisTemplate.opsForValue().getOperations().delete(key);
            }
            stringRedisTemplate.unwatch();
        }catch(Exception e){
            logger.info("分布式锁解锁失败！",e);
        }

        return isRelease;
    }
}
