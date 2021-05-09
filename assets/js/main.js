var recorder= "";
var isConfirm= false;
var clickAbsence= false;
var starScan= false;
var QRcodeUrl=["https://script.google.com/macros/s/AKfycbxNK1NjUYSJhicX5u2LXSCD9Qy5TTSIpDoC7sImQD28pBbBq40/exec", "https://script.google.com/macros/s/AKfycbzwIll2HP2YHViNxEMGMyaXoSb5vxjdV74lX-wKRxLCWu4tKLNq/exec"];
var absenceUrl=["https://script.google.com/macros/s/AKfycby9OslywuKBodO9uE-SNEDIt1rRFHvJuaAhDZK_u_5LMQ4pay10/exec", "https://script.google.com/macros/s/AKfycbylayJMqRW5ZXyOktbxk4lKOb8vnBlXoiTNRHNrCW12D76urZc/exec"]

var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

function turnOn(){
    clickAbsence= false;
}

function Confirm(){
    var person= document.getElementById("identity").value;
    if(person!="請選擇你的身分"){
        if(clickAbsence){
            var removeElement= document.getElementById("absenceField");
            var obj= removeElement.parentNode;
            obj.removeChild(removeElement);
            clickAbsence= false;
        }
        if(!(isConfirm)){
            isConfirm= true;
            person= person.split(" ");
            recorder= person[1];
    
            if(!(isiOS)){
                starScan= true;
                $("#main").after("<section id="+ "video" +" class="+"video"+"></section>");
                var insertDiv = document.getElementById("video");
                insertDiv.innerHTML = "<video id=" + "preview " + "class=" + "image" + "></video>";
                notiOS();
            }
            else{
                $("#main").after("<section id="+ "video" +" class="+"video"+"></section>");
                var insertDiv = document.getElementById("video");
                insertDiv.innerHTML = "<div style=" + "width: 25em " + " id=" + "reader" + "></div>";
                iOS();
            }
        }
        else{
            alert("已有鏡頭畫面");
        }
    }
    else{
        alert("請先選擇你的身分");
    }
}

function checkTime(Content, source){
    document.getElementById("loadingView").style.display= "block";
    var index= 0;
    var Time= new Date();
    var min= Time.getMinutes();
    min %= 10;
    if(min>5)
        index=1;
    
    if(source){
        QRcodeSend(Content, index);
    }
    else{
        absenceSend(Content, index);
    }
}

function QRcodeSend(data, index){
    $.ajax({
            type:'get',
            cache: false,
            timeout: 6000,
            url: QRcodeUrl[index%2],
            data:  {
                'data' : data
            },
            datatype:'json',
            success: function(respond){
                starScan= true;
                document.getElementById("loadingView").style.display= "none";
                if(respond=="success"){
                    alert("簽到成功");
                }
                else{
                    alert("報到者資料填寫錯誤");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                    alert("抱歉，伺服器連線逾時\n將自動重傳資料，請稍後");
                    index++;
                    QRcodeSend(data, index);
            }
        });
}

function absenceSend(data, index){
    data= data.toString();
    $.ajax({
            type:'get',
            cache: false,
            timeout: 6000,
            url: absenceUrl[index%2],
            data:  {
                'data' : data
            },
            datatype:'json',
            success: function(respond){
                clickAbsence= false;
                absencePeople= [];
                turnOnAbsenceComfirm= true;
                document.getElementById("loadingView").style.display= "none";
                var removeSection= document.getElementsByClassName("absenceField");
                var i=0;
                while(removeSection.length){
                    removeSection[i].parentNode.removeChild(removeSection[i]);
                }
                alert("記錄完成，組員回來後請記得幫忙簽到");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                    alert("抱歉，伺服器連線逾時\n將自動重傳資料，請稍後");
                    index++;
                    absenceSend(data, index);
            }
        });
}