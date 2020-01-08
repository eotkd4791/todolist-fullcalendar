const divSignUp = document.querySelector(".js-signup"),
    formSignUp = document.querySelector(".js-formsignup"),
    newId = document.getElementById("idsignup"),
    newPw = document.getElementById("pwsignup"),
    newPwCheck = document.getElementById("pwcheck"),
    matchPw = document.getElementById("pwmessage");

let allowedId, allowedPw = -1, //-1 = 올바르지 않음, 0 = 중복이나 매칭x, 1 = 올바름
    tempId, tempPw, tempCheckPw;


function pwMatched() {
    tempPw = newPw.value;
    tempCheckPw = newPwCheck.value;
    
    if(tempPw !== "" && tempCheckPw !== "") {
        allowedPw = 0; 
        if(tempPw === tempCheckPw) {
            matchPw.textContent='✓'
            matchPw.setAttribute('style', 'color:green'); 
            allowedPw = 1;
        } else {
            matchPw.textContent='✕';
            matchPw.setAttribute('style', 'color:red'); 
            allowedPw = 0;
        }
    } else {
        matchPw.textContent='✕';
        matchPw.setAttribute('style', 'color:red'); 
        allowedPw = -1;
    }
}

document.getElementById("idcheck").addEventListener('click', function(e) {
    tempId = newId.value;
    console.log(newId.value);
    if(tempId === "") {
        return alert("아이디를 입력해주세요!");
    }
    allowedId = 0;

    const xhrCheck = new XMLHttpRequest();
    xhrCheck.onload = function() {
        if(xhrCheck.status === 200) {
            if(xhrCheck.responseText === 'null') {
                alert("사용하실 수 있는 ID입니다.");
                allowedId = 1;
            } else {
                idLogin.value='';
                return alert("동일한 ID가 존재합니다.");
            }
        }
    }
    xhrCheck.open('POST','/account/check');
    xhrCheck.setRequestHeader('Content-Type', 'application/json');
    xhrCheck.send(JSON.stringify({ id: tempId }));
});

formSignUp.addEventListener("keydown",function(e) {
    if(e.keyCode===32) { 
        e.preventDefault();
        e.target.value='';
        return alert("공백을 입력할 수 없습니다."); 
    }
    setInterval(pwMatched, 300);
});

document.getElementById("btn-createAccount").addEventListener('click', function(e) {
    if(allowedId === -1) {
        newId.value='';
        return alert("올바르지 않은 ID입니다.");
    } else if (allowedId === 0) {
        return alert("ID 중복을 확인하여 주십시오.");
    }

    if(allowedPw === -1) {
        return alert("올바르지 않은 PW입니다.");
    } else if (allowedPw === 0) {
        return alert("PW가 일치하지 않습니다.");
    }


    const xhrSignUp = new XMLHttpRequest();
    xhrSignUp.onload = function() {
        if(xhrSignUp.status === 200 || xhrSignUp.status === 201) {
            console.log("POST 요청 성공!!");
            alert("성공적으로 가입하셨습니다!! 가입하신 ID로 로그인하여 주십시오 :)");
            
            init();
            //창닫기 기능
        } else {
            console.error("POST 요청 실패");
        }
    }
    const signupObj = {
        id : tempId,
        pw : tempPw
    };
    xhrSignUp.open('POST', '/account/signup');
    xhrSignUp.setRequestHeader('Content-Type', 'application/json');
    xhrSignUp.send(JSON.stringify(signupObj));
    init();
});

document.getElementById("btn-return").addEventListener('click', function(e) { init(); });

function init() {
    allowedId, allowedPw = -1;
    tempId, tempPw, tempCheckPw="";
    matchPw.textContent='✕'
    matchPw.setAttribute('style', 'color:red'); 
    window.close();
}