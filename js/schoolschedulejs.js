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

function getTodayLabel()
{
    var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    var today = new Date().getDay();
    var todayLabel = week[today];
    return todayLabel;
}


var lastDate = new Date(year, month, 0).getDate();

console.log(lastDate)


/*기본인자*/
const Key = '' // 인증키
const Type = 'JSON' // 호출 문서(xml, json)
let pIndex = '1' // 페이지 위치
let pSize = '30' // 페이지 당 신청 숫자
url = 'https://open.neis.go.kr/hub/SchoolSchedule?' + 'KEY=' + Key + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=' + pSize
lunch_url = url + '&ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&SD_SCHUL_CODE=' + SD_SCHUL_CODE + '&AA_FROM_YMD=' + year + month + 00 + '&AA_TO_YMD=' + year + month + lastDate

console.log(lunch_url)

api(lunch_url)

function api(dataurl)
{
    $.ajax({
        type: "GET",
        url: dataurl,
        success: function(response){
            response = JSON.parse(response)
            console.log(response)
            if ("SchoolSchedule" in response === true)
            {
                output = ''
                for (i in response.SchoolSchedule[1].row)
                {
                output += `<h3>` + response.SchoolSchedule[1].row[i].AA_YMD + ` : ` + response.SchoolSchedule[1].row[i].EVENT_NM+ `</h3>`
                }
                document.getElementById("lunchinfo").innerHTML=output
            }
            else if ("SchoolSchedule" in response === false)
            {
                output = `<h3>` + response.RESULT.MESSAGE + `</h3>`
                document.getElementById("lunchinfo").innerHTML=output
            }
            else
            {
                output = `<h3>알수없는 오류가 발생했어요...!!!</h3>`
                document.getElementById("lunchinfo").innerHTML=output
            }
        }
    })
}

