// 增加天
function addDays(date, value) {
	var newdate = new Date();
	newdate.setDate(date.getDate() + value);
	newdate.setMonth(date.getMonth());
	newdate.setFullYear(date.getFullYear());
	return newdate;
}

// 增加天
function addMinutes(date, value) {
	var newdate = new Date();
	newdate.setDate(date.getDate());
	newdate.setMonth(date.getMonth());
	newdate.setFullYear(date.getFullYear());
	newdate.setHours(date.getHours());
	newdate.setMinutes(date.getMinutes() + value);
	newdate.setSeconds(date.getSeconds());
	newdate.setMilliseconds(date.getMilliseconds());
	return newdate;
}

// 增加月
function addMonths(date, value) {
	date.setMonth(date.getMonth() + value);
}

// 增加年
function addYears(date, value) {
	date.setFullYear(date.getFullYear() + value);
}

// 是否为今天
function isToday(date) {
	return isDateEquals(date, new Date());
}

// 是否为当月
function isThisMonth(date) {
	return isMonthEquals(date, new Date());
}

// 两个日期的年是否相等
function isMonthEquals(date1, date2) {
	return date1.getMonth() == date2.getMonth()
			&& date1.getFullYear() == date2.getFullYear();
}

// 判断日期是否相等
function isDateEquals(date1, date2) {
	return date1.getDate() == date2.getDate() && isMonthEquals(date1, date2);
}

// 返回某个日期对应的月份的天数
function getMonthDayCount(date) {
	switch (date.getMonth() + 1) {
	case 1:
	case 3:
	case 5:
	case 7:
	case 8:
	case 10:
	case 12:
		return 31;
	case 4:
	case 6:
	case 9:
	case 11:
		return 30;
	}
	// feb:
	date = new Date(date);
	var lastd = 28;
	date.setDate(29);
	while (date.getMonth() == 1) {
		lastd++;
		addDays(date, 1);
	}
	return lastd;
}

// 返回两位数的年份
function getHarfYear(date) {
	var v = date.getYear();
	if (v > 9)
		return v.toString();
	return "0" + v;
}

// 返回月份（修正为两位数）
function getFullMonth(date) {
	var v = date.getMonth() + 1;
	if (v > 9)
		return v.toString();
	return "0" + v;
}

// 返回日 （修正为两位数）
function getFullDate(date) {
	var v = date.getDate();
	if (v > 9)
		return v.toString();
	return "0" + v;
}

// 替换字符串
function replace(str, from, to) {
	return str.split(from).join(to);
}

function formatDate(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}

	var stringDate = year + "-" + month + "-" + day;

	return stringDate;
}

// 格式化日期的表示
function getFirstDay(dateStr) {
	var dd = new Date(new Number(dateStr.substr(0, 4)), new Number(dateStr
			.substr(5, 2) - 2), 1);
	return formatDate(dd);
}

// 统一日期格式
function convertDate(str) {
	str = (str + "").replace(/^\s*/g, "").replace(/\s*$/g, ""); // 去除前后的空白
	var d;
	if (/^[0-9]{8}$/.test(str)) // 20040226 -> 2004-02-26
	{
		d = new Date(new Number(str.substr(0, 4)),
				new Number(str.substr(4, 2)) - 1, new Number(str.substr(6, 2)));
		if (d.getTime())
			return d;
	}
	d = new Date(str);
	if (d.getTime())
		return d;
	d = new Date(replace(str, "-", "/"));
	if (d.getTime())
		return d;
	return null;
}

function getToday() {
	var today = new Date();
	return today;
}

function getTomorrow() {
	var today = getToday();
	addDays(today, 1);
	return today;
}
