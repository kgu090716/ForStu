/*기본인자*/
const Key = '' // 인증키
const Type = 'JSON' // 호출 문서(xml, json)
let pIndex = '1' // 페이지 위치
let pSize = '10' // 페이지 당 신청 숫자
/*신청인자*/
let ATPT_OFCDC_SC_CODE // 교육청 코드
let SD_SCHUL_CODE // 학교코드
let SCHUL_NM // 학교명
/*기타변수*/
const num1 = 1;
var ooe;
let schoolname
let GRADE
let CLASS_NM
let today = new Date();
let AY = today.getFullYear();

function enterkey() {
  if (window.event.keyCode == 13) {
    schoolcheck()
  } // 엔터키가 눌렸을 때
}

function finish() {
  if (ooe === undefined || ooe === "----교육청을 선택해주세요----")
  {
    Swal.fire(
      '오류!',
      '교육청이 선택되지 않았어요! 다시 한번 확인해주세요.',
      'error'
    )
  }
  else if (SCHUL_NM === undefined)
  {
    Swal.fire(
      '오류!',
      '학교가 입력되지 않았어요! 다시 한번 확인해주세요.',
      'error'
    )
  }
  else if (GRADE === undefined || GRADE === "---학년---")
  {
    Swal.fire(
      '오류!',
      '학년이 선택되지 않았어요! 다시 한번 확인해주세요.',
      'error'
    )
  }
  else if (CLASS_NM === undefined || CLASS_NM === "---반---")
  {
    Swal.fire(
      '오류!',
      '반이 선택되지 않았어요! 다시 한번 확인해주세요.',
      'error'
    )
  }
  else
  {
    localStorage.setItem("ATPT_OFCDC_SC_CODE", ATPT_OFCDC_SC_CODE);
    localStorage.setItem("SD_SCHUL_CODE", SD_SCHUL_CODE);
    localStorage.setItem("SCHUL_NM", SCHUL_NM);
  
    localStorage.setItem("GRADE", GRADE);
    localStorage.setItem("CLASS_NM", CLASS_NM);
  
    swal.fire({
      title: '성공!',
      text: '(' + SCHUL_NM + ' ' + GRADE + '학년' + ' ' + CLASS_NM + '반' + ')',
      icon: "success"
    }).then(function () {
      window.location = "index.html";
    });
  }
}

function handleOnChange(e) {
  const target = document.getElementById('target_btn');
  ooe = e.options[e.selectedIndex].text;
  console.log(ooe);
  target.disabled = true;
}

function checkooe() {
  const target = document.getElementById('target_btn');
  if (ooe === "----교육청을 선택해주세요----" || ooe === undefined) {
    target.disabled = true;
    Swal.fire(
      '선택오류!',
      '아래 교육청중 하나를 선택해 주시길 바랍니다!',
      'error'
    )
  }
  else {
    target.disabled = false;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: '성공적으로 입력되었습니다!<br>(' + ooe + ')',
    })

    if (ooe === "서울특별시교육청")
      ATPT_OFCDC_SC_CODE = "B10";
    else if (ooe === "부산광역시교육청")
      ATPT_OFCDC_SC_CODE = "C10";
    else if (ooe === "대구광역시교육청")
      ATPT_OFCDC_SC_CODE = "D10";
    else if (ooe === "인천광역시교육청")
      ATPT_OFCDC_SC_CODE = "E10";
    else if (ooe === "광주광역시교육청")
      ATPT_OFCDC_SC_CODE = "F10";
    else if (ooe === "대전광역시교육청")
      ATPT_OFCDC_SC_CODE = "G10";
    else if (ooe === "울산광역시교육청")
      ATPT_OFCDC_SC_CODE = "H10";
    else if (ooe === "세종특별자치시교육청")
      ATPT_OFCDC_SC_CODE = "I10";
    else if (ooe === "경기도교육청")
      ATPT_OFCDC_SC_CODE = "J10";
    else if (ooe === "강원도교육청")
      ATPT_OFCDC_SC_CODE = "K10";
    else if (ooe === "충청북도교육청")
      ATPT_OFCDC_SC_CODE = "M10";
    else if (ooe === "충청남도교육청")
      ATPT_OFCDC_SC_CODE = "N10";
    else if (ooe === "전라북도교육청")
      ATPT_OFCDC_SC_CODE = "P10";
    else if (ooe === "전라남도교육청")
      ATPT_OFCDC_SC_CODE = "Q10";
    else if (ooe === "경상북도교육청")
      ATPT_OFCDC_SC_CODE = "R10";
    else if (ooe === "경상남도교육청")
      ATPT_OFCDC_SC_CODE = "S10";
    else if (ooe === "제주특별자치도교육청")
      ATPT_OFCDC_SC_CODE = "T10";
    console.log(ATPT_OFCDC_SC_CODE)
  }
}

function radioBtncheck(name) {
  var schoolchecking = $('input[name=' + name + ']:checked').val();
  SCHUL_NM = schoolchecking // 학교명 저장
  console.log(SCHUL_NM)
  const School_Information_Url = 'https://open.neis.go.kr/hub/schoolInfo?' + 'ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=1&Key=' + Key + '&SCHUL_NM=' + SCHUL_NM
  console.log(School_Information_Url)
  $.ajax({
    type: "GET",
    url: School_Information_Url,
    success: function (response) {
      response = JSON.parse(response)
      SD_SCHUL_CODE = response.schoolInfo[1].row[0].SD_SCHUL_CODE // 학교 코드 저장      
      console.log(SD_SCHUL_CODE)
      search_class()
      appear("target_finish_btn")
    },
    error: function (request, status, error) {
      alert("status : " + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  })
}

function appear(targetid) {
  console.log(targetid)
  const target = document.getElementById(targetid);
  target.style.display = ""; // 보이기
}

function schoolcheck() {
  schoolname = document.getElementById('search_school').value;
  const School_Information_Url = 'https://open.neis.go.kr/hub/schoolInfo?' + 'ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=' + pSize + '&Key=' + Key + '&SCHUL_NM=' + schoolname
  console.log(ATPT_OFCDC_SC_CODE)
  $.ajax({
    type: "GET",
    url: School_Information_Url,
    success: function (response) {
      response = JSON.parse(response)
      console.log(response)
      console.log(School_Information_Url)
      if (response.schoolInfo === undefined) {
        Swal.fire(
          '오류 발생!',
          '오류가 발생했습니다. 맞게 입력했는지 확인해 주시길 바랍니다!',
          'error'
        )
      }
      else if (schoolname == '') {
        Swal.fire(
          '입력오류!',
          '아무것도 입력되지 않았습니다. 학교이름을 아래에 입력해주시길 바랍니다!',
          'warning'
        )
      }
      else if (response.RESULT === undefined) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: '검색 완료!<br>(' + schoolname + ')',
        })

        var output = "";
        for (var i in response.schoolInfo[1].row) {
          output += '<input class="form-check-input" type="radio" name="SchoolRadioBtn" value="' + response.schoolInfo[1].row[i].SCHUL_NM + '" id="ratiobuttion' + (i + 1) + '>' + '<label class="form-check-label">' + response.schoolInfo[1].row[i].SCHUL_NM + '<br><br>'
          document.getElementById("radioBtn1").innerHTML = output;
        }
        appear('complete_school')
      }
    },
  })
}

function handleOnChange2(e) {
  const target = document.getElementById('target_finish_btn');
  GRADE = e.options[e.selectedIndex].text;
  console.log(GRADE);
  if (GRADE === "---학년---" || GRADE === undefined) {
    target.disabled = true;
    Swal.fire(
      '선택오류!',
      '아래 학년중 하나를 선택해 주시길 바랍니다!',
      'error'
    )
  }
  else {
    target.disabled = false;
  }

  School_Information_Url = 'https://open.neis.go.kr/hub/classInfo?' + 'ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=100&Key=' + Key + '&ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&SD_SCHUL_CODE=' + SD_SCHUL_CODE + '&AY=' + AY + '&GRADE=' + GRADE
  console.log(School_Information_Url)
  $.ajax({
    type: "GET",
    url: School_Information_Url,
    success: function (response) {
      response = JSON.parse(response)
      console.log(response.classInfo[1].row)
      let classlist = [];
      for (var i in response.classInfo[1].row) {
        classlist[i] = response.classInfo[1].row[i].CLASS_NM
      }
      classlist = [...new Set(classlist)];
      console.log(classlist) // classlist = 반 리스트

      var output = `<select class="form-select" onchange="handleOnChange3(this)"> <option selected>---반---</option>`;
      for (var i in classlist) {
        output += `<option value=` + (Number(i) + 1) + `>` + (Number(i) + 1) + `</option>` + '<br><br>'
        document.getElementById("classappear").innerHTML = output
      }

    },
    error: function (request, status, error) {
      alert("status : " + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  })
}

function handleOnChange3(e) {
  const target = document.getElementById('target_finish_btn');
  CLASS_NM = e.options[e.selectedIndex].text;
  console.log(CLASS_NM);
  if (CLASS_NM === "---반---" || CLASS_NM === undefined) {
    target.disabled = true;
    Swal.fire(
      '선택오류!',
      '아래 반중 하나를 선택해 주시길 바랍니다!',
      'error'
    )
  }
  else {
    target.disabled = false;
  }
}

function search_class() {
  let School_Information_Url = 'https://open.neis.go.kr/hub/classInfo?' + 'ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&Type=' + Type + '&pIndex=' + pIndex + '&pSize=100&Key=' + Key + '&ATPT_OFCDC_SC_CODE=' + ATPT_OFCDC_SC_CODE + '&SD_SCHUL_CODE=' + SD_SCHUL_CODE + '&AY=' + AY
  console.log(School_Information_Url)

  $.ajax({
    type: "GET",
    url: School_Information_Url,
    success: function (response) {
      response = JSON.parse(response)
      console.log(response.classInfo[1].row)
      let gradelist = [];
      for (var i in response.classInfo[1].row) {
        gradelist[i] = response.classInfo[1].row[i].GRADE
      }
      gradelist = [...new Set(gradelist)];
      console.log(gradelist) // gradelist = 학년 리스트

      var output = `<select class="form-select" onchange="handleOnChange2(this)"> <option selected>---학년---</option>`;
      for (var i in gradelist) {
        output += `<option value=` + (Number(i) + 1) + `>` + (Number(i) + 1) + `</option>` + '<br><br>'
        document.getElementById("gradeappear").innerHTML = output

      }
    },
    error: function (request, status, error) {
      alert("status : " + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  })

}