const divSignUp = document.querySelector(".js-signup"),
    formSignUp = document.querySelector("js-signup"),
    newId = document.getElementById("id-signup"),
    newPw = document.getElementById("pw-signup"),
    matchPw = document.getElementById("pw-message");

let allowedId, allowedPw = -1, //-1 = 올바르지 않음, 0 = 중복이나 매칭x, 1 = 올바름
    tempId, tempPw, tempCheckPw;


document.getElementById("id-check").addEventListener('click', function(e) {
    tempId = newId.value;
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

document.getElementById("pw-check").addEventListener("keydown",function(e) {
    tempPw = newPw.value;
    tempCheckPw = checkPw.value;
    if(tempPw !== "" && tempCheckPw !== "") {
        allowedId = 0; 
    }
    if(tempPw === tempCheckPw) {
        matchPw.setAttribute('style', 'color:green'); 
        allowedPw = 1;
    }
});

document.getElementById("btn-createAccount").addEventListener('click', function(e) {
    if(allowedId === -1) {
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
        }
    }
    const signupObj = {
        id : tempId,
        pw : tempPw
    };
    xhrSignUp.open('POST', '/account/signup'); //url어떻게 보낼껀지 @@
    xhrSignUp.setRequestHeader('Content-Type', 'application/json');
    xhrSignUp.send(JSON.stringify(signupObj));
    init();
});

document.getElementById("btn-return").addEventListener('click', function(e) { self.close(); });

function init() {
    allowedId, allowedPw = -1;
    tempId, tempPw, tempCheckPw="";
    matchPw.setAttribute('style', 'color:red'); 
    self.close();
}