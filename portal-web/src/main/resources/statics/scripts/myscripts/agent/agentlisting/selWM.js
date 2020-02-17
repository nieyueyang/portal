function selectCoop() {
		window.open(appServer+'/userdiydata/choseProducers.htm?returnMethod=method1', 'newwindow', 'height=600, width=500, top=70,left=300, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no').focus(); 
	}
	function selectCoop1() {
		window.open(appServer+'/userdiydata/choseLibrary.htm?returnMethod=method2', 'newwindow', 'height=600, width=600, top=70,left=300, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no').focus(); 
	}
	
	function method1(param){
		var str = param.split("~!~");
		$("#manufacuturer").val(str[1]);
		//jQuery(".producer").val(str[1]);
	}
	function method2(param){
		var str = param.split("~!~");
		//$("#warehouseCmpName").val(str[1]);
		//$("#settlementAddr").val(str[2]);
		
		if($("#warehouseCmpNameS")){
			$("#warehouseCmpNameS").val(str[1]);
			$("#settlementAddrS").val(str[2]);
		}
		//jQuery(".library").val(str[1]);
	}
	
	
	//添加交收库，libraryName是交收库的名称,libraryAdd是交收库的地址
	function saveLibrary(){
		var libraryName = jQuery(".saveName").val();
		var libraryAdd = jQuery(".saveAdd").val();
		jQuery.ajax({type : "post",  
			url : appServer + "/userdiydata/ajaxAddLibrary.htm",
			data : {
				libraryName 	: libraryName,
				libraryAdd  	: libraryAdd
			},
			success : function(data) { 
				if(data && data.info){
					alert(data.info);
				}
				else{
					alert("操作发生错误，请刷新或重新登录后再次尝试。");
				}
			},
			error : function(data) {
				if(data && data.info){
					alert(data.info);
				}
				else{
					alert("添加失败，请登录后重新尝试一次。");
				}
			}
		});
	}
	
	//添加交收库，libraryName是交收库的名称,libraryAdd是交收库的地址
	function saveProducers(){
		var producers = jQuery("#manufacuturer").val();
		jQuery.ajax({type : "post",  
			url : appServer + "/userdiydata/ajaxAddProducers.htm",
			data : {
				producers 	: producers
			},
			success : function(data) { 
				if(data && data.info){
					alert(data.info);
				}
				else{
					alert("操作发生错误，请刷新或重新登录后再次尝试。");
				}
			},
			error : function(data) {
				if(data && data.info){
					alert(data.info);
				}
				else{
					alert("添加失败，请登录后重新尝试一次。");
				}
			}
		});
	}