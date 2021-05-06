var logindata= "";
let scanner = new Instascan.Scanner({
    continuous: true, // 連續掃描
    video: document.getElementById('preview'), // 預覽
    facingMode: {
        exact: "environment"
    }
});
scanner.addListener('scan', function (content) {
    console.log(content);
    if(content!=""){
        content= content.split(",");
        console.log(content);
    }
});
Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]); // [0] 前鏡頭 [1] 後鏡頭 
    }
    else {
        console.error('沒有找到相機');
    }
    }).catch(function (e) {
    console.error(e);
});