var logindata= "";

let scanner = new Instascan.Scanner({
    continuous: true, // 連續掃描
    video: document.getElementById('preview'), // 預覽
    facingMode: {
        exact: "environment"
    }
});

scanner.addListener('scan', function (content) {
    if(content!=""){
        content= content.split(",");
        content[1]= unescape(content[1].replace(/\\u/g, '%u'));
        content[2]= unescape(content[2].replace(/\\u/g, '%u'));
        var correct= confirm("請確認名字是否無誤：\n" + content[1]);
        
        if(correct){
            var Content= content.toString();
            Content += "," + recorder;
            send(Content);
        }
        else{
            alert("請報到者重填資料");
        }
    }
});

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[1]); // [0] 前鏡頭 [1] 後鏡頭 
    }
    else {
        alert('沒有找到相機');
    }
    }).catch(function (e) {
        alert(e);
});