var recorder= "";
function Confirm(){
    var person= document.getElementById("identity").value;
    person= person.split(" ");
    recorder= person[1];
    document.getElementById("video").style.display= "block";
}