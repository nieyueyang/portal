package com.tan.portal.web.global;

import com.alibaba.fastjson.JSONObject;
import com.tan.portal.common.annotation.ParaNotNull;
import com.tan.portal.common.enums.ErrorMsgEnum;
import com.tan.portal.common.exception.GlobalException;
import com.tan.portal.common.util.HttpUtil;
import com.tan.portal.common.util.IllegalStrUtil;
import com.tan.portal.common.util.StringUtil;
import com.tan.portal.web.sys.entity.AuthUser;
import com.tan.portal.web.util.UserAgent;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

@Component
@Aspect
public class GlobalLogAndParameterHandle {

    private static final Logger logger = LoggerFactory.getLogger(GlobalLogAndParameterHandle.class);

    //@Pointcut("@annotation(org.springframework.web.bind.annotation.RestController)")   //按注解拦截注解
    //按目录拦截
    @Pointcut("execution(* com.tan.portal.web.*.ctrl..*.*(..)) " +
            "&& !execution(* com.tan.portal.web.sys.ctrl.SysPageCtrl..*(..))")
    public void pointCut(){}

//    @Around("pointCut()")
//    public void handleControllerAround(ProceedingJoinPoint joinPoint) throws Throwable {
//
//        //获取切点的返回值
//        joinPoint.proceed();
//    }


    @Before("pointCut()")
    public void handleControllerMethod(JoinPoint pjp) throws Throwable {
        //Stopwatch stopwatch = Stopwatch.createStarted();
        //Result result = new Result();
        String account =  "";
        Map map = analyticJoinPoint(pjp);
        HttpServletRequest request = (HttpServletRequest) map.get("request");
        if (!request.getServletPath().contains("/login")){
            //获取登录用户账号
            account = ((AuthUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getAccount();
        }
        String url = request.getRequestURL().toString();
        String methodType = request.getMethod();
        String targetIp = HttpUtil.getRemoteHost(request);
        logger.info("account:{}, targetIp:{}, url:{}, method:{}",account,targetIp,url,methodType);
        JSONObject jsonObject = (JSONObject) map.get("param");
        String[] annotations = (String[]) map.get("annotations");
        checkRequestParam(jsonObject,annotations);
        logger.info("输入参数：{}",jsonObject.toJSONString());

        // pjp.proceed的值就是被拦截方法的返回值
       // return pjp.proceed();
    }

    private Map  analyticJoinPoint(JoinPoint pjp) throws IllegalAccessException {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
        HttpServletRequest request = servletRequestAttributes.getRequest();
        HttpServletResponse response = servletRequestAttributes.getResponse();

        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        Method method = methodSignature.getMethod();
        //参数类型
        Class[] parameterTypes = method.getParameterTypes();
        //参数名
        String[] parameterNames = methodSignature.getParameterNames();
        //参数值
        Object[] values = pjp.getArgs();
        JSONObject jsonObject = new JSONObject();
        Map paraMap=request.getParameterMap();
        jsonObject.putAll(paraMap);
        for(int i = 0; i < parameterTypes.length; i++){
            if(parameterTypes[i] != HttpServletRequest.class &&  parameterTypes[i] != HttpServletResponse.class){
                Class clazz = parameterTypes[i];
                if (clazz.isPrimitive()){
                    jsonObject.put(parameterNames[i],values[i]);
                }else if (clazz == String.class){
                    jsonObject.put(parameterNames[i],values[i]);
                } else if (clazz == Map.class ){
                    Map<String,Object> value = (Map) values[i];
                    for(Map.Entry entry : value.entrySet()){
                        jsonObject.put((String)entry.getKey(),entry.getValue() );
                    }
                }else{
                    Field[] fields = clazz.getDeclaredFields();
                    for(Field field : fields){
                        field.setAccessible(true);
                        Object obj = field.get(values[i]);
                        jsonObject.put(field.getName(),obj);
                    }
                }
            }
        }
        if (jsonObject.containsKey("password")){
            jsonObject.remove("password");
        }
        Map map = new HashMap();
        map.put("param", jsonObject);
        //获取注解的值
        map.put("request", request);
        map.put("response",response );
        if (method.isAnnotationPresent(ParaNotNull.class)){
            String[] annotations = method.getAnnotation(ParaNotNull.class).ParaName();
            map.put("annotations",annotations);
        }
        return map;
    }

    private void checkRequestParam(JSONObject jsonObject,String[] annotations) throws GlobalException {
        if (annotations != null && annotations.length > 0){

            for(String annotation : annotations){
                String key = "";
                String prompt = "";
                String [] strs = annotation.split(":");
                key = strs[0];
                if (strs.length > 1){
                    prompt = strs[1];
                }else{
                    prompt = key + "," + ErrorMsgEnum.PARAM_NOT_NULL.getMsg();
                }

                Object obj = jsonObject.get(key);
                if (obj == null){
                    throw new GlobalException(ErrorMsgEnum.PARAM_NOT_NULL.getCode(),prompt);
                }
                String value = String.valueOf(obj);
                if(StringUtil.isEmpty(value)){
                    throw new GlobalException(ErrorMsgEnum.PARAM_NOT_NULL.getCode(),prompt);
                }
            }
        }

        for(Map.Entry<String,Object> entry : jsonObject.entrySet()){
            String key = entry.getKey();
            String value = String.valueOf(entry.getValue());
            if (StringUtil.isNotEmpty(value)){
                if (!IllegalStrUtil.sqlStrFilter(value)) {
                    logger.info("输入参数存在SQL注入风险！参数为{}:{}",key,value);
                    throw new GlobalException(ErrorMsgEnum.PARAM_Illegal.getCode(),ErrorMsgEnum.PARAM_Illegal.getMsg() + "," + value);
                }
                if (!IllegalStrUtil.isIllegalStr(value)) {
                    logger.info("输入参数含有非法字符!参数为{}:{}",key,value);
                    throw new GlobalException(ErrorMsgEnum.PARAM_Illegal.getCode(),ErrorMsgEnum.PARAM_Illegal.getMsg() + "," + value);
                }
            }
        }
    }

    //根据注解检查参数是否为空，如果为空，则抛出异常
    private void checkParaNotNull(String[] annotations,JSONObject jsonObject) throws GlobalException {
        if (annotations.length == 0){ //如果注解没有指定参数名，则检查全部参数
            for(Map.Entry <String, Object> entry : jsonObject.entrySet()){
                if (StringUtil.isEmpty((String)entry.getValue())){
                    throw new GlobalException(ErrorMsgEnum.PARAM_NOT_NULL.getCode(),entry.getKey() + "," + ErrorMsgEnum.PARAM_NOT_NULL.getMsg());
                }
            }
        }else if(annotations.length > 0){ //根据指定的参数名，检查参数是否为null
            for (String annotation : annotations){
                String str = (String) jsonObject.get(annotation);
                if (StringUtil.isEmpty(str)){
                    throw new GlobalException(ErrorMsgEnum.PARAM_NOT_NULL.getCode(),annotation + "," + ErrorMsgEnum.PARAM_NOT_NULL.getMsg());
                }
            }
        }
    }

//      //异常处理增强
//    @AfterThrowing(pointcut = ("pointCut()"), throwing = "e")
//    public Result exceptionHandle(JoinPoint point, Exception e) {
//        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
//        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
//        HttpServletRequest request = sra.getRequest();
//        HttpServletResponse response = sra.getResponse();
//        Result result = defaultErrorHandler(e);
//        HttpUtil.responseWriteJson(response, result);
//        return result;
//
//    }

//      返回值增强处理
//    @AfterReturning(pointcut = ("pointCut()"), returning = "returnValue")
//    public void log(JoinPoint point, Object returnValue) {
//        System.out.println("@AfterReturning：模拟日志记录功能...");
//        System.out.println("@AfterReturning：目标方法为：" +
//                point.getSignature().getDeclaringTypeName() +
//                "." + point.getSignature().getName());
//        System.out.println("@AfterReturning：参数为：" +
//                Arrays.toString(point.getArgs()));
//        System.out.println("@AfterReturning：返回值为：" + returnValue);
//        System.out.println("@AfterReturning：被织入的目标对象为：" + point.getTarget());
//
//    }


    /**
     * 后置返回通知
     * 这里需要注意的是:
     * 如果参数中的第一个参数为JoinPoint，则第二个参数为返回值的信息
     * 如果参数中的第一个参数不为JoinPoint，则第一个参数为returning中对应的参数
     * returning 限定了只有目标方法返回值与通知方法相应参数类型时才能执行后置返回通知，否则不执行，对于returning对应的通知方法参数为Object类型将匹配任何目标返回值
     */
//    @AfterReturning(pointcut ="pointCut()",returning="t")
//    public <T> Result returnDataHandle(JoinPoint pjp, T t) {
//        Result result = new Result();
//        result.setCode(200);
//        result.setMsg("访问成功");
//        result.setData(t);
//        return result;
//    }




}
