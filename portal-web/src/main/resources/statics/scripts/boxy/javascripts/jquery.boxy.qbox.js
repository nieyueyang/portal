// Boxy插件的扩展
jQuery.fn.qbox = function(options) {
	var node = this.get(0).nodeName.toLowerCase();
	var self = this;
	if (node == 'a') {
		$(this).attr('onclick', '').unbind('click').click(function() {
			return false;
		});
		options = $.extend(options || {}, {
			src : this.get(0).getAttribute('href'),
			beforeUnload : function() {
				$(self).unbind('click').click(function() {
					return $(this).qbox(options);
				});
			}
		});
	}
	qBox.iFLoad(options);
	return false;
}

var qBox = function() {
};

jQuery.extend(qBox, {
	aDgs : [],
	iFrame : function(op) {
		op = jQuery.extend({
			title : '提示',
			//w : 320,
			//h : 200,
			src : 'about:blank',
			modal : true,
			fixed : false,
			unloadOnHide : true,
			closeText : '关闭'
		}, op);
		
		fm = parseInt(Math.random() * (1000 * 987));// 
		
		var dialog = new Boxy(
			'<div id="ld' + fm	+ '" style="width:'+op.w+'px;padding:15px;"> 正在加载，请稍候......  </div>' +
			'<div><iframe id="_' + fm + '" width="100%" height="100%" style="display:none;" ' +
					'src=' + op.src	+ ' frameborder="0" scrolling="yes"></iframe></div>', op);

		jQuery("#_" + fm).load(function() {
			dialog.resize(op.w, op.h, function() {});
			jQuery("#ld" + fm).hide();
			//jQuery("#_" + fm).css({'padding' : '15px','display' : ''});
			jQuery("#_" + fm).show(400);
		});
		
		qBox.aDgs.push(dialog);
		
		return false;
	},
	Close : function() {
		qBox.aDgs[qBox.aDgs.length - 1].hide();
		return false
	},
	iFSrc : function(op) {
		op = jQuery.extend({
			w : 320,
			h : 200,
			src : 'about:blank'
		}, op);
		
		qBox.aDgs[qBox.aDgs.length - 1].getContent().attr("src", "about:blank");
		qBox.aDgs[qBox.aDgs.length - 1].setTitle(op.t);
		qBox.aDgs[qBox.aDgs.length - 1].tween(op.w, op.h, function() {
			qBox.aDgs[qBox.aDgs.length - 1].getContent().attr("src",op.src).css({
				width : op.w,
				height : op.h
			});
		});
		return false;
	},
	iFLoad : function(options) {
		var sr = jQuery(this).attr("href");
		var op = jQuery.extend({src : sr}, options);
		qBox.iFrame(op);
		return false;
	}
});