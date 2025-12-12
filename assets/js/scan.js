var logindata = "";

/** 把字串中的 \uXXXX 轉成真正的 Unicode 字元 */
function decodeUnicodeEscapes(str) {
  if (typeof str !== "string") return str;
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

/** 共用：處理掃到的內容（兩個掃描器都走這裡） */
function handleScan(content) {
  if (!content || !starScan) return;

  starScan = false;

  let parts = String(content).split(",");
  parts[1] = decodeUnicodeEscapes(parts[1] || "");
  parts[2] = decodeUnicodeEscapes(parts[2] || "");

  var correct = confirm("請確認資料是否正確：\n" + (parts[0] || "") + "　" + (parts[1] || ""));

  if (correct) {
    var Content = parts.toString();
    Content += "," + recorder;
    checkTime(Content, 1);
  } else {
    alert("請報到者重填資料");
    starScan = true;
  }
}

/** 非 iOS：Instascan（改善：優先後鏡頭） */
function notiOS() {
  let scanner = new Instascan.Scanner({
    continuous: true,
    video: document.getElementById("preview")
  });

  scanner.addListener("scan", function (content) {
    handleScan(content);
  });

  Instascan.Camera.getCameras()
    .then(function (cameras) {
      if (!cameras || cameras.length === 0) {
        alert("沒有找到相機");
        return;
      }

      // 優先找「後鏡頭」：名稱可能包含 back/rear/environment（Android/部分瀏覽器可用）
      let backCam =
        cameras.find(c => (c.name || "").toLowerCase().includes("back")) ||
        cameras.find(c => (c.name || "").toLowerCase().includes("rear")) ||
        cameras.find(c => (c.name || "").toLowerCase().includes("environment"));

      // 找不到就用「最後一顆」當 fallback（很多裝置最後一顆常是後鏡頭，但不保證）
      let chosen = backCam || cameras[cameras.length - 1];

      scanner.start(chosen);
      scanner.mirror = false; // 只影響鏡像顯示，不影響鏡頭選擇
    })
    .catch(function (e) {
      alert(e);
    });
}

/** iOS：html5-qrcode（強制後鏡頭） */
let html5QrcodeScanner = null;

function iOS() {
  // 如果你頁面用的是 "reader" 容器，保留；若要改成你原本的元素 id，這裡調整
  const readerId = "reader";

  // Html5QrcodeScanner 版本：可傳入 videoConstraints
  html5QrcodeScanner = new Html5QrcodeScanner(
    readerId,
    {
      fps: 10,
      qrbox: 250,
      // 強制使用後鏡頭
      videoConstraints: { facingMode: "environment" }
      // 你也可以加：rememberLastUsedCamera: true
    },
    /* verbose= */ false
  );

  html5QrcodeScanner.render(
    function onScanSuccess(content) {
      handleScan(content);

      // 避免 iOS 連續觸發多次：成功後先停止/清掉（你若要繼續掃，就刪掉這段）
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(() => {});
      }
    },
    function onScanFailure(_) {
      // 這裡通常不用做事，避免一直刷 console
    }
  );
}
