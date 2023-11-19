const ATPT_OFCDC_SC_CODE = localStorage.getItem("ATPT_OFCDC_SC_CODE");
const SD_SCHUL_CODE = localStorage.getItem("SD_SCHUL_CODE");
const SCHUL_NM = localStorage.getItem("SCHUL_NM");
const GRADE = localStorage.getItem("GRADE");
const CLASS_NM = localStorage.getItem("CLASS_NM");

function buttondisabled(idname) {
    document.getElementById(idname).classList.add('disabled');
}

/* 메인 */
var button1 = document.getElementById("Goto_Write_Info");
var button2 = document.getElementById("Erase_Profile");
if(ATPT_OFCDC_SC_CODE === null || SD_SCHUL_CODE === null || SCHUL_NM === null || GRADE === null || CLASS_NM === null)
{
    document.getElementById("diablebutton1").classList.add("disabled");
    document.getElementById("diablebutton2").classList.add("disabled");
    document.getElementById("diablebutton3").classList.add("disabled");
    document.getElementById("diablebutton4").classList.add("disabled");
    output = `<p class="lead text-muted">정보가 아직 입력되지 않았습니다.<br>아래 버튼을 눌러 학교, 학년, 반, 번호등을 기입하여 주시기 바랍니다.</p>`
    document.getElementById("message").innerHTML=output
    button1.style.display = ""; // 정보 입력 안됨
}
else
{
    output = `<p class="lead text-muted">정보가 입력되었습니다.<br>(`+SCHUL_NM + ` ` + GRADE+ `학년` + ` ` + CLASS_NM + `반)</p>`
    document.getElementById("message").innerHTML=output
    button2.style.display = ""; // 정보 입력 됨
}

function Localstorage_Erase()
{
    localStorage.clear();
}