/// <reference path="../Src/knockout.validation.js" />

/************************************************
* This is an example localization page. All of these
* messages are the default messages for ko.validation
* 
* Currently ko.validation only does a single parameter replacement
* on your message (indicated by the {0}).
*
* The parameter that you provide in your validation extender
* is what is passed to your message to do the {0} replacement.
*
* eg: myProperty.extend({ minLength: 5 });
* ... will provide a message of "Please enter at least 5 characters"
* when validated
*
* This message replacement obviously only works with primitives
* such as numbers and strings. We do not stringify complex objects 
* or anything like that currently.
*/

ko.validation.localize({
    required: '此项必填',
    min: '最小值 {0}',
    max: '最大值 {0}',
    minLength: '长度最小 {0} ',
    maxLength: '长度最大 {0} ',
    pattern: '格式有误',
    step: '跨幅为 {0}',
    email: '邮箱格式有误',
    date: '日期格式有误',
    dateISO: '日期格式有误',
    number: '请输入数字',
    digit: '请输入整数',
    phoneUS: '电话号码格式有误',
    equal: '必须相等',
    notEqual: '必须不相等',
    unique: '必须唯一'
});