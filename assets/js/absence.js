var peopleList= {
    "會長": ["吳庭甄","蕭展毅","翁華駿","吳韋德","洪群為","李孟家","楊群耀","蕭伃彤","范祐愷","林威丞"],
    "副會長": ["吳庭甄","蕭展毅","翁華駿","吳韋德","洪群為","李孟家","楊群耀","蕭伃彤","范祐愷","林威丞"],
    "文書組長":["翁華駿","陳柏曄","李畯家","許方綺","謝渝婷"],
    "表演組長":["吳韋德","張晸嘉","郭竺諭","劉宇翔","陳俊諺","潘政澤","林逸新","陳巧芸","陳妍亘"],
    "美術組長":["洪群為","張夏遠","蕭峻益","陳佩妤","黃語婕","葉芝妤","劉庭穎","蔡秉妍"],
    "音樂組長":["李孟家","戴成至","陳禹瑭","陳冠霖","黃政傑","李承憲","楊淳閔","黃柏寓","邱梓榕","陳羿弦","焦恩加","鄭立祺"],
    "影片組長":["楊群耀","呂柏逸","黃韋翔","王政勝"],
    "編劇組長":["蕭伃彤","林宗瑋","陳元昊"],
    "機動組長":["范祐愷","黃冠勛","蔡涵宇","王三禾","賴俊達","沈哲毅"],
    "總務組長":["林威丞","吳承澔","甘學斌","賴冠良"],
};
var absencePeople= [];
var turnOnAbsenceComfirm= true;

function absence(){
    var person= document.getElementById("identity").value;
    if(person!="請選擇你的身分"){
        if(isConfirm){
            document.getElementById("video").style.display= "none";
        }
        if(!(clickAbsence)){
            clickAbsence= true;
            person= person.split(" ");
            $("#main").after("<section class="+ "absenceField " +" id="+"absenceField"+"></section>");
            var insertSection= document.getElementById("absenceField");
            insertSection.innerHTML= "<header><h1>" + person[0] + "請假回報</h1></header>";
            for(var i=0;i<peopleList[person[0]].length;i++){
                var dc_input = document.createElement("input");
                dc_input.type = 'button';
                dc_input.onclick = inputPerson;
                dc_input.value = peopleList[person[0]][i];
                insertSection.appendChild(dc_input);
            }
            if(turnOnAbsenceComfirm){
                turnOnAbsenceComfirm= false;
                var dc_div= document.createElement("div");
                dc_div.class= "absenceBtn";
                dc_div.id= "absenceBtn";
                insertSection.appendChild(dc_div);
            
                var insertDiv= document.getElementById("absenceBtn");
                insertDiv.innerHTML= "<button  class= absenceConfirm onClick= absenceConfirm() >確認</button>";
            }
        }
        else{
            alert("已有請假回報窗格");
        }
    }
    else{
        alert("請先選擇你的身分");
    }
}

function inputPerson(){
    if((this.style.backgroundColor == "")||
            (this.style.backgroundColor == "rgb(240, 255, 255)")){
        this.style.backgroundColor = "#6495ed";
        absencePeople.push(this.value);
    }
    else if(this.style.backgroundColor == "rgb(100, 149, 237)"){
        this.style.backgroundColor = "#f0ffff";
        var IndexName = absencePeople.indexOf(this.value);
        absencePeople.splice(IndexName,1);
    }
}

function absenceConfirm(){
    absencePeople.toString();
    checkTime(absencePeople, 0);
}