const divLogin = document.querySelector(".js-login"),
    formLogin  = divLogin.querySelector(".js-formlogin"),
    idLogin    = document.getElementById("id-input"),
    pwLogin    = document.getElementById("pw-input"),
    divToDo    = document.querySelector(".js-toDo");


/* 선언
------------------------------------------------------------------*/


function createToDo() {
    const dateToDo_ = document.createElement("h2");
    dateToDo_.textContent = "0000-00-00";
    dateToDo_.setAttribute('class','js-dateToDo css-dateToDo');

    const formToDo_ = document.createElement("form");
    formToDo_.setAttribute('class','js-formToDo css-formToDo');
    formToDo_.setAttribute('id','formIdx');

    const inputToDo_ = document.createElement("input");
    inputToDo_.setAttribute('type','text');
    inputToDo_.setAttribute('placeholder','Write a todo!');
    inputToDo_.setAttribute('id','inputIdx');
    inputToDo_.setAttribute('autocomplete','off');

    const ulToDo_ = document.createElement("ul");
    ulToDo_.setAttribute('class','css-toDoList');
    ulToDo_.setAttribute('id','listTodo');

    formToDo_.appendChild(inputToDo_);
    divToDo.appendChild(dateToDo_);
    divToDo.appendChild(formToDo_);
    divToDo.appendChild(ulToDo_);
}
/*TodoList 요소 만드는 함수.
--------------------------------------------------------------*/


document.getElementById("login-button").addEventListener('click', function(e) {
    if(!idLogin.value){
        return alert("ID를 입력해주세요!");
    } else if (!pwLogin.value) {
        return alert("PW를 입력해주세요!");
    } else {
        const xhrLogin = new XMLHttpRequest();
        
        xhrLogin.onload = function() {
            if(xhrLogin.status === 200 || xhrLogin.status === 201) {
                if(xhrLogin.responseText !== 'null') {
                    responseId = JSON.parse(xhrLogin.responseText);
                    userId = resposeId.id;
                    
                    divLogin.remove();//
                    createToDo();
                    createCal(userId);
                    initToDo();
                } else {
                    return alert("ID/PW가 일치하지 않습니다.");
                }
            } else {
                console.error("POST 요청 실패");
            }
        }

        const infoObj = {
            id : idLogin.value,
            pw : pwLogin.value
        };

        xhrLogin.open('POST', '/account/login');
        xhrLogin.setRequestHeader('Content-Type', 'application/json');
        xhrLogin.send(JSON.stringify(infoObj));
    }
});


document.getElementById("signup-button").addEventListener('click', function(e) {
    window.open('./signup.html', "회원가입","width=550, height=450, left=200, top=100");
});

function init() {
    idLogin.focus();
}
init();