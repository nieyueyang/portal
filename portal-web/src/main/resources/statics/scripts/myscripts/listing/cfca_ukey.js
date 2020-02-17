		function LoadObject() {
        try {
            var eDiv = document.createElement("div");
            if (navigator.appName.indexOf("Internet") >= 0) {
                if (window.navigator.cpuClass == "x86") {
                    eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Standard.x86.cab\" classid=\"clsid:2F9BEB71-4164-4837-99EE-ED8065B58658\"></object>";
                }
                else {
                    eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Standard.x64.cab\" classid=\"clsid:EC380EBA-922E-41F8-89FF-2FE4DCD200E3\"></object>";
                }
            }
            else {
                eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.standard.x86\" style=\"height: 0px; width: 0px\">";
            }
            document.body.appendChild(eDiv);
        }
        catch (e) {
            alert(e);
        }
        CryptoAgency = document.getElementById("CryptoAgent");
    }

    function SelectObjctById(id) {

        var obj;
        if (document.getElementById) {
            obj = document.getElementById(id);
        }
        else if (document.all) {
            obj = document.all(id);
        }
        else {
            alert("The Internet Browser does't support Document all or Document getElementById");
        }

        return obj;
    }

    function SelectCertificate(isNeedVetify) {
    	if(isNeedVetify){
	        try {
	        	//alert(SelectObjctById("TextSelectedCertificateSubjectDN"));
	            var CertSubjectDN = CryptoAgency.SelectSignCertificate("CFCA", "");
	            if(!CertSubjectDN)
	            {
	            	var LastErrorDesc = CryptoAgency.GetLastErrorDesc();
	              alert(LastErrorDesc);
	              return false;
	            }
	
	            var objSelectedCertSubjectDN = SelectObjctById("TextSelectedCertificateSubjectDN");
	            objSelectedCertSubjectDN.value = CertSubjectDN;
				// 选择完证书后直接签名
				return SignMessage();
	        }
	        catch (e) {
	            var LastErrorDesc = CryptoAgency.GetLastErrorDesc();
	            alert(LastErrorDesc);
	            return false;
	        }
    	}else{
    		return true;
    	}
    }

    function SignMessage() {
        try {
            var SignedContent = "1";
            var Signature = "";
            var selectedAlg = "sha-1";
            var attachedContent = true;


            Signature = CryptoAgency.SignMessage(SignedContent, selectedAlg);
            

            if(!Signature)
            {
            	  var LastErrorDesc = CryptoAgency.GetLastErrorDesc();
                alert(LastErrorDesc);
                return false;
            }

            var objTextAreaSignature;
            objTextAreaSignature = SelectObjctById("textareaSignature");
            objTextAreaSignature.value = Signature;
            return true;

        }
        catch (e) {
            var LastErrorDesc = CryptoAgency.GetLastErrorDesc();
            alert(LastErrorDesc);
            return false;
        }
    }
    // 加载
    $(document).ready(function(){
　　		LoadObject();
　　});