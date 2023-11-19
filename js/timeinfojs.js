const ATPT_OFCDC_SC_CODE = localStorage.getItem("ATPT_OFCDC_SC_CODE");
const SD_SCHUL_CODE = localStorage.getItem("SD_SCHUL_CODE");
const SCHUL_NM = localStorage.getItem("SCHUL_NM");
const GRADE = localStorage.getItem("GRADE");
const CLASS_NM = localStorage.getItem("CLASS_NM");

let today = new Date();
let year = today.getFullYear(); // 년도
let month = ('0' + (today.getMonth() + 1)).slice(-2); // 월
let date = ('0' + today.getDate()).slice(-2); // 날짜
let day = today.getDay();  // 요일

function getTodayLabel() {
    var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    var today = new Date().getDay();
    var todayLabel = week[today];
    return todayLabel;
}

function getCurrentWeek() {
    var currentDay = new Date();
    var theYear = currentDay.getFullYear();
    var theMonth = currentDay.getMonth();
    var theDate = currentDay.getDate();
    var theDayOfWeek = currentDay.getDay();

    var thisWeek = [];

    for (var i = 0; i < 7; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + i - theDayOfWeek);
        var yyyy = resultDay.getFullYear();
        var mm = (resultDay.getMonth() + 1).toString().padStart(2, '0');
        var dd = resultDay.getDate().toString().padStart(2, '0');

        thisWeek[i] = yyyy + mm + dd;
    }
    return thisWeek;
}


/*기본인자*/
const Key = '' // 인증키
const Type = 'JSON' // 호출 문서(xml, json)
let pIndex = '1' // 페이지 위치
let pSize = '10' // 페이지 당 신청 숫자
let subjectlist = new Array(6).fill(0).map(() => new Array(7));

(function () {
    $.ajax({
        type: "GET",
        url: 'https://open.neis.go.kr/hub/schoolInfo?' + 'KEY=' + Key + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=' + pSize + '&ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&SD_SCHUL_CODE=' + SD_SCHUL_CODE,
        success: function (response) {
            response = JSON.parse(response)
            SCHUL_KND_SC_NM = response.schoolInfo[1].row[0].SCHUL_KND_SC_NM // 학교종류명 (초중고)
            console.log(SCHUL_KND_SC_NM)
            if (SCHUL_KND_SC_NM == "고등학교") {
                result = "https://open.neis.go.kr/hub/hisTimetable?"
            }
            else if (SCHUL_KND_SC_NM == "중학교") {
                result = "https://open.neis.go.kr/hub/misTimetable?"
            }
            else if (SCHUL_KND_SC_NM == "초등학교") {
                result = "https://open.neis.go.kr/hub/elsTimetable?"
            }
            else {
                Swal.fire(
                    '오류!',
                    '알수없는 오류가 발생하였습니다!',
                    'error'
                )
            }
            let url2 = result + 'KEY=' + Key + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=' + pSize


            for (let i = 1; i < 7; i++) {
                time_url = url2 + '&ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&SD_SCHUL_CODE=' + SD_SCHUL_CODE + '&ALL_TI_YMD=' + getCurrentWeek()[i] + '&GRADE=' + GRADE + '&CLASS_NM=' + CLASS_NM
                console.log(time_url)
                $.ajax({
                    type: "GET",
                    url: time_url,
                    async: false,
                    success: function (response) {
                        response = JSON.parse(response)
                        console.log(response)
                        if ("hisTimetable" in response === true)
                        {
                            console.log("있다!");
                            for (let a = 0; a < 7; a++) {

                                if (a in response.hisTimetable[1].row == true) {
                                    subjectlist[i - 1][a] = (response.hisTimetable[1].row[a].ITRT_CNTNT)
                                }
                                else if (a in response.hisTimetable[1].row == false) {
                                    subjectlist[i - 1][a] = " ";
                                }
                            }
                        }
                        else if ("misTimetable" in response === true)
                        {
                            console.log("있다!");
                            for (let a = 0; a < 7; a++) {

                                if (a in response.misTimetable[1].row == true) {
                                    subjectlist[i - 1][a] = (response.misTimetable[1].row[a].ITRT_CNTNT)
                                }
                                else if (a in response.misTimetable[1].row == false) {
                                    subjectlist[i - 1][a] = " ";
                                }
                            }
                        }
                        else if ("elsTimetable" in response === true)
                        {
                            console.log("있다!");
                            for (let a = 0; a < 7; a++) {

                                if (a in response.elsTimetable[1].row == true) {
                                    subjectlist[i - 1][a] = (response.elsTimetable[1].row[a].ITRT_CNTNT)
                                }
                                else if (a in response.elsTimetable[1].row == false) {
                                    subjectlist[i - 1][a] = " ";
                                }
                            }
                        }
                        else{
                            for (let b = 0; b < 7; b++)
                            {
                                console.log('i : ' , i)
                                console.log('b : ' , b)
                                subjectlist[i - 1][b] = "";
                            }
                            
                        }
                    }
                })
            }
            console.log(subjectlist)
            buildtable()
        }
    })
})()


function buildtable() {
    output = "";
    for (let a = 0; a < 7; a++) {
        output += `<tr>`
        output += `<td style="height: 60px; width: 7%;">` + (a+1) + `</td>`
        for (let b = 0; b < 6; b++) {
            console.log(subjectlist[b][a])
            output += `<td style="height: 60px; width: 15.5%;">` + subjectlist[b][a] + `</td>`
        }
        output += `</tr>`
        document.getElementById("buildtable").innerHTML = output
    }
}