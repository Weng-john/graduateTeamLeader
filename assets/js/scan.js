var logindata= "";

function notiOS(){
    let scanner = new Instascan.Scanner({
        continuous: true, // 連續掃描
        video: document.getElementById('preview') // 預覽
    });

    scanner.addListener('scan', function (content) {
        if(content!="" && starScan){
            starScan= false;
            content= content.split(",");
            content[1]= unescape(content[1].replace(/\\u/g, '%u'));
            content[2]= unescape(content[2].replace(/\\u/g, '%u'));
            var correct= confirm("請確認資料是否正確：\n" + content[0] + "　" + content[1]);
        
            if(correct){
                var Content= content.toString();
                Content += "," + recorder;
                checkTime(Content, 1);
            }
            else{
                alert("請報到者重填資料");
                starScan= true;
            }
        }
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[1]); // [0] 前鏡頭 [1] 後鏡頭 
            scanner.mirror= false;
        }
        else {
            alert('沒有找到相機');
        }
        }).catch(function (e) {
            alert(e);
    });
}

function iOS(){
    var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
}

function onScanSuccess(content) {
    content= content.split(",");
    content[1]= unescape(content[1].replace(/\\u/g, '%u'));
    content[2]= unescape(content[2].replace(/\\u/g, '%u'));
    var correct= confirm("請確認資料是否正確：\n" + content[0] + "　" + content[1]);
        
    if(correct){
        var Content= content.toString();
        Content += "," + recorder;
        checkTime(Content);
    }
    else{
        alert("請報到者重填資料");
    }
}