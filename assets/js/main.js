var recorder= "";
var index= 0;
var Url=["https://script.google.com/macros/s/AKfycby60rn8gkTgh4JTfSYk_lSBgJbZJedp0A8CNVKGsXf1uM3aiMeC7bUMU1ntkV0sw3vo/exec", "https://script.google.com/macros/s/AKfycby5VIVmsG6cvPGIeM4cwGsfd9AqbVBB4ZnZkNQTtf7XbRu50tzgx-yH99V0xOIC-Fj0iw/exec"];

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