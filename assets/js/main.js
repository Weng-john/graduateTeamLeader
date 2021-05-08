var recorder= "";
var isConfirm= false;
var press= false;
var Url=["https://script.google.com/macros/s/AKfycbyMexMAWsW0V5zjbc2OnM4PYbyYS74yDchfiWgT/exec", "https://script.google.com/macros/s/AKfycbwDSgpyUX-X3Pyu7_9Hg92HGjXjQXz8bKvmmxv8HQ/exec"];

var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
alert(isiOS);

function Confirm(){
    if(!(isConfirm)){
        var person= document.getElementById("identity").value;
        person= person.split(" ");
        recorder= person[1];
    
        if(!(isiOS)){
            alert("創造section中");
            press= true;
            $("section").after("<section id="+ "video" +" class="+"video"+"></section>");
            var insertDiv = document.getElementById("video");
            insertDiv.innerHTML = "<video id=" + "preview " + "class=" + "image" + "></video>";
            notiOS();
        }
    }
}

function checkTime(Content){
    var index= 0;
    var Time= new Date();
    var min= Time.getMinutes();
    min %= 10;
    
    if(min>5)
        index=1;
    send(Content, index);
}

function send(data, index){
    $.ajax({
            type:'get',
            cache: false,
            timeout: 6000,
            url: Url[index%2],
            data:  {
                'data' : data
            },
            datatype:'json',
            success: function(respond){
                press= true;
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
                    send(data, index);
            }
        });
}