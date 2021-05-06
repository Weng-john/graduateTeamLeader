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
        alert(content[1]);
    }
});
Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[1]); // [0] 前鏡頭 [1] 後鏡頭 
    }
    else {
        console.error('沒有找到相機');
    }
    }).catch(function (e) {
    console.error(e);
});