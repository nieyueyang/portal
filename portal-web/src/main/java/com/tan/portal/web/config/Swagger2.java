package com.tan.portal.web.config;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @Author: nieyy
 * @Date: 2019/5/19 13:51
 * @Version 1.0
 * @Description: Swagger2配置信息
 */
@Configuration
@EnableSwagger2
public class Swagger2 {

    //是否开启swagger，正式环境一般是需要关闭的，可根据springboot的多环境配置进行设置
    @Value(value = "${swagger.enabled}")
    private Boolean swaggerEnabled;

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                // 是否开启
                .enable(swaggerEnabled).select()
                // 扫描的路径包
                //.apis(RequestHandlerSelectors.basePackage("com.deyun.**.ctrl"))
                //加了ApiOperation注解的类，生成接口文档
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                //包下的类，生成接口文档
                //.apis(RequestHandlerSelectors.basePackage("io.renren.modules.job.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("预拌混疑土搅拌质量监督管理平台")
                .description("预拌混疑土搅拌质量监督管理平台Api文档")
                .termsOfServiceUrl("http://localhost:8080/sso")
                .version("1.0.0")
                .build();
    }




    //    //是否开启swagger，正式环境一般是需要关闭的，可根据springboot的多环境配置进行设置
//            @Value(value = "${swagger.enabled}")
//    Boolean swaggerEnabled;
// 
//            @Bean
//    public Docket createRestApi() {
//        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
//                // 是否开启
//                .enable(swaggerEnabled).select()
//                // 扫描的路径包
//                .apis(RequestHandlerSelectors.basePackage("cn.lqdev.learning.springboot.chapter10"))
//                // 指定路径处理PathSelectors.any()代表所有的路径
//                .paths(PathSelectors.any()).build().pathMapping("/");
//    }



}
