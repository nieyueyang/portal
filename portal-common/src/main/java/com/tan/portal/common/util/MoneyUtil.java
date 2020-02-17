package com.tan.portal.common.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Locale;

/**
 * 金额处理工具类
 * 
 * @author wangyf
 * @version $Id: MoneyUtil.java,v 0.1 2012-8-1 上午08:44:17 wangyf Exp $
 */
public class MoneyUtil {

	/**
	 * 转化金额格式，以元为单位0.00元
	 * 
	 * @param money
	 * @return
	 */
	public static String getMoneyDesc(Long money) {
		if (money == null) {
			return "";
		}
		Money costPriceM = new Money();
		costPriceM.setCent(money);
		return costPriceM.toString();
	}

	/**
	 * 转化金额格式，以元为单位0.00元
	 * 
	 * @param money
	 * @return
	 */
	public static String getMoneyDesc(Double money) {
		if (money == null) {
			return "";
		}
		Money costPriceM = new Money();
		costPriceM.setCent(new BigDecimal(money.toString()).setScale(0,
				BigDecimal.ROUND_HALF_UP).longValue());
		return costPriceM.toString();
	}
	
	/**
	 * 转化金额格式，以元为单位0.00元(传入类型BigDecimal)
	 * @param money
	 * @return
	 */
	public static String getMoneyDesc(BigDecimal money) {
        if (money == null) {
            return "";
        }
        Money costPriceM = new Money();
        costPriceM.setCent(money.setScale(0,
                BigDecimal.ROUND_HALF_UP).longValue());
        return costPriceM.toString();
    }

	/**
	 * 千分位的价格
	 * 
	 * @param money
	 * @return
	 */
	public static String getMoneyDescTausendstel(Long money) {
		if (money == null) {
			return "";
		}
		Double moneyDouble = new BigDecimal(money.toString()).movePointLeft(2)
				.doubleValue();
		DecimalFormat df = (DecimalFormat) NumberFormat.getInstance(Locale.US);
		df.applyPattern("###,##0.00");
		return df.format(moneyDouble);
	}

	/**
	 * 千分位的重量
	 * 
	 * @param weight
	 * @return
	 */
	public static String getWeightDescTausendstel(Double weight) {
		if (weight == null) {
			return "";
		}
		DecimalFormat df = (DecimalFormat) NumberFormat.getInstance(Locale.US);
		df.applyPattern("###,##0.000");
		return df.format(weight);
	}

	public static String getDouble(Double money) {
		if (money == null) {
			return "";
		}
		return new BigDecimal(money.toString()).multiply(new BigDecimal(100))
				.toString();
	}

	public static String multiply(String a, String b) {
		if (a.isEmpty() || b.isEmpty()) {
			return "0.00";
		}
		Money ret = new Money();
		ret.setAmount(new BigDecimal(a).multiply(new BigDecimal(b)));
		return ret.toString();
	}

	public static String simplifyNumber(BigDecimal bd) {
		int index = bd.toString().indexOf(".");
		if (index < 0) {
			return bd.toString();
		} else {
			String num1 = bd.toString().substring(0, index);
			String num2 = bd.toString().substring(index + 1);
			if (StringUtil.isBlank(num2)) {
				return num1;
			}
			int len = num2.length();

			for (int i = 0; i < len; i++) {
				if ("0".equals(num2.substring(num2.length() - 1))) {
					num2 = num2.substring(0, num2.length() - 1);
				}
			}
			if (StringUtil.isBlank(num2)) {
				return num1;
			}
			return num1 + "." + num2;
		}
	}

	/**
	 * 数字金额大写转换，思想先写个完整的然后将如零拾替换成零
	 * 要用到正则表达式
	 */
	public static String digitUppercase(double n) {
		String fraction[] = { "角", "分" };
		String digit[] = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" };
		String unit[][] = { { "元", "万", "亿" },{ "", "拾", "佰", "仟" } };
		String head = n < 0 ? "负" : "";
		n = Math.abs(n);
		String s = "";
		for (int i = 0; i < fraction.length; i++) {
			s += (digit[(int) (Math.floor(n * 10 * Math.pow(10, i)) % 10)] + fraction[i])
					.replaceAll("(零.)+", "");
		}

		if (s.length() < 1) {
			s = "整";
		}
		int integerPart = (int) Math.floor(n);
		for (int i = 0; i < unit[0].length && integerPart > 0; i++) {
			String p = "";
			for (int j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[integerPart % 10] + unit[1][j] + p;
				integerPart = integerPart / 10;
			}
			s = p.replaceAll("(零.)*零$", "").replaceAll("^$", "零") + unit[0][i] + s;
		}
		return head
				+ s.replaceAll("(零.)*零元", "元").replaceFirst("(零.)+", "")
						.replaceAll("(零.)+", "零").replaceAll("^整$", "零元整");
	}
	
}
