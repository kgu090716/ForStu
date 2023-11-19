const ATPT_OFCDC_SC_CODE = localStorage.getItem("ATPT_OFCDC_SC_CODE");
const SD_SCHUL_CODE = localStorage.getItem("SD_SCHUL_CODE");
const SCHUL_NM = localStorage.getItem("SCHUL_NM");
const GRADE = localStorage.getItem("GRADE");
const CLASS_NM = localStorage.getItem("CLASS_NM");

const Key = '' // 인증키
const Type = 'JSON' // 호출 문서(xml, json)
let pIndex = '1' // 페이지 위치
let pSize = '10' // 페이지 당 신청 숫자
url = 'https://open.neis.go.kr/hub/schoolInfo?' + 'KEY=' + Key + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=' + pSize
school_url = url + '&ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&SD_SCHUL_CODE=' + SD_SCHUL_CODE 

console.log(school_url);
api(school_url)

function api(dataurl)
{
    $.ajax({
        type: "GET",
        url: dataurl,
        success: function(response){
            response = JSON.parse(response)
            ENG_SCHUL_NM = response.schoolInfo[1].row[0].ENG_SCHUL_NM // 학교 이름 영어
            SCHUL_KND_SC_NM = response.schoolInfo[1].row[0].SCHUL_KND_SC_NM // 학교종류명 (초중고)
            LCTN_SC_NM = response.schoolInfo[1].row[0].LCTN_SC_NM // 소재지명
            JU_ORG_NM = response.schoolInfo[1].row[0].JU_ORG_NM // 관할조직명
            FOND_SC_NM = response.schoolInfo[1].row[0].FOND_SC_NM // 설립명
            ORG_RDNZC = response.schoolInfo[1].row[0].ORG_RDNZC // 도로명 우편번호
            ORG_RDNMA = response.schoolInfo[1].row[0].ORG_RDNMA // 도로명 주소
            ORG_RDNDA = response.schoolInfo[1].row[0].ORG_RDNDA // 도로명 상세주소
            ORG_TELNO = response.schoolInfo[1].row[0].ORG_TELNO // 전화번호
            HMPG_ADRES = response.schoolInfo[1].row[0].HMPG_ADRES // 홈페이지 주소
            COEDU_SC_NM = response.schoolInfo[1].row[0].COEDU_SC_NM // 남녀공학구분명
            ORG_FAXNO = response.schoolInfo[1].row[0].ORG_FAXNO // 고등학교 구분명
            FOND_YMD = response.schoolInfo[1].row[0].FOND_YMD // 설립일자
            FOAS_MEMRD = response.schoolInfo[1].row[0].FOAS_MEMRD // 개교기념일

            console.log(response.schoolInfo[1].row[0])
            console.log(ENG_SCHUL_NM)
            output1 = `<h3>`+ SCHUL_NM + ` (` + response.schoolInfo[1].row[0].ENG_SCHUL_NM + `)</h3>`
            document.getElementById("school_name").innerHTML=output1

            output2 = `학교종류 : ` + SCHUL_KND_SC_NM + `<br>` +
            `소재지명 : ` + LCTN_SC_NM + `<br>` +
            `관할조직명 : ` + JU_ORG_NM + `<br>` +
            `설립명 : ` + FOND_SC_NM + `<br>` +
            `도로명 우편번호 : ` + ORG_RDNZC + `<br>` +
            `도로명 주소 : ` + ORG_RDNMA + `<br>` +
            `도로명 상세주소 : ` + ORG_RDNDA + `<br>` +
            `전화번호 : ` + ORG_TELNO + `<br>` +
            `홈페이지 주소 : <A href = "http://`+HMPG_ADRES+`" target = "blank" >`+HMPG_ADRES+`</A>` + `<br>` +
            `남녀공학구분명 : ` + COEDU_SC_NM + `<br>` +
            `고등학교 구분명 : ` + ORG_FAXNO + `<br>` +
            `설립일자 : ` + FOND_YMD + `<br>` +
            `개교기념일 : ` + FOAS_MEMRD
            document.getElementById("school_info").innerHTML=output2
        }
    })
}