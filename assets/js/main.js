var recorder= "";
var index= 0;
var Url=["https://script.google.com/macros/s/AKfycbypEbZDBf85xVhRbPcNRGFgGhjAtW1WpCjoq4fwr975Mqmwx7tQTXqbJitKFSCewwxR/exec", "https://script.google.com/macros/s/AKfycbwFUMz2HF51PjcmmJlbThrI4R0mMzOxfp3J4g2prltaPc1PptaKyliZDLr8HbQgK7KrsQ/exec"];

function Confirm(){
    var person= document.getElementById("identity").value;
    person= person.split(" ");
    recorder= person[1];
    document.getElementById("video").style.display= "block";
}

function send(data){
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
                    send(data);
            }
        });
}