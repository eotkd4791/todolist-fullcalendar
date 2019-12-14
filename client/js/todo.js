const toDoForm  = document.querySelector(".js-formToDo"), //일정 생성하는 input요소가 위치하는 form 
    toDoYMD     = document.querySelector(".js-dateToDo"), //달력에서 선택한 날짜를 보여줄 위치.
    listIdx = document.getElementById("listTodo");       //GET요청으로 받은 투두들을 보여줄 위치.

/* 선언
--------------------------------------------------------------*/

function getCurrentDate() {
    const today_      = new Date();
    const todayYear   = today_.getFullYear();
    const todayMonth  = today_.getMonth();
    const todayDay    = today_.getDate(); 

    SelectedYMD=`${todayYear}-${todayMonth+1}-${todayDay}`;
    toDoYMD.textContent = SelectedYMD; //달력에서 선택한 날짜
}
/* 오늘 날짜를 가져오는 함수
 -------------------------------------------------------------*/

function getToDo() {
    const xhrGet = new XMLHttpRequest(); 
    xhrGet.onload = function () { 
        if(xhrGet.status === 200) {
           console.log("GET 요청 성공 " + xhrGet.responseText);
            const getPlans = JSON.parse(xhrGet.responseText); 
            listIdx.innerHTML='';

            
            for(let i = 0; i<getPlans.length; i++) {
                const setList = document.createElement("li");
                const span = document.createElement("span");
                span.textContent = getPlans[i].plan;
                const btnEdit = document.createElement("button");
                btnEdit.textContent = 'Edit';

                btnEdit.addEventListener("click", function(e) {
                    const editToDo = prompt("일정을 수정하세요."); 
                    if(editToDo === null){ return; } 
                    else if(editToDo === ''){ return alert("입력하세요!"); } 
                   

                    const xhrPut = new XMLHttpRequest();
                    xhrPut.onload = function() {
                        if(xhrPut.status === 200) {
                            console.log("PUT 요청 성공 " + xhrPut.responseText);
                            getToDo();
                        } else {
                            console.error("PUT 요청 실패 " + xhrPut.responseText);
                        }
                    }

                    const putObj = {
                        id: userId,
                        prev : span.textContent,
                        plan : editToDo
                    };

                    xhrPut.open('PUT', '/plan/'+SelectedYMD.replace(/-/gi,""));
                    xhrPut.setRequestHeader('Content-Type', 'application/json');
                    xhrPut.send(JSON.stringify(putObj));
                });



                const btnDel = document.createElement("button");
                btnDel.textContent = 'Delete';

                btnDel.addEventListener("click", function(e) {
                    const deleteToDo = confirm("해당 일정을 삭제하시겠습니까?"); //confirm창을 띄워 확인/취소여부에 따라 조건문으로 구현.
                    
                    let delToDo;
                    if(deleteToDo) { delToDo = span.textContent; } //확인을 누르면 해당 일정을 담는다.
                    else { return; } //취소를 누르면 return;

                    const xhrDel = new XMLHttpRequest();
                    xhrDel.onload = function() {
                        if(xhrDel.status === 200) {
                            console.log("DELETE 요청 성공 " + xhrDel.responseText);
                            getToDo();
                        } else {
                            console.error("DELETE 요청 실패 " + xhrDel.responseText);
                        }
                    }
                    
                    const delObj = {
                        id: userId,
                        plan: delToDo
                    };

                    xhrDel.open('DELETE', '/plan/'+SelectedYMD.replace(/-/gi,""));
                    xhrDel.setRequestHeader('Content-Type', 'application/json');
                    xhrDel.send(JSON.stringify(delObj));
                });
                setList.appendChild(span);
                setList.appendChild(btnEdit);
                setList.appendChild(btnDel);
                listIdx.appendChild(setList);
            }

        } else {
            console.error("GET 요청 실패 " + xhrGet.responseText);
        }
    };
    
    xhrGet.open('GET','/plan/'+SelectedYMD.replace(/-/gi,""));
    xhrGet.setRequestHeader('Content-Type', 'application/json');
    xhrGet.send(JSON.stringify({ id: userId }));
}
/* GET요청을 진행한다. 버튼 클릭 이벤트 발생시, DELETE || PUT 요청 실행
----------------------------------------------------------------------*/


function initToDo() {
    getCurrentDate();
    dateToDo_.textContent = SelectedYMD;
    
    getToDo(); 
    document.getElementById("formIdx").addEventListener("submit", function(e){ 
        e.preventDefault();
        const thingsToDo = e.target.inputIdx.value; 
        if(!thingsToDo) { return alert("입력해주세요!"); }

        const xhrPost = new XMLHttpRequest();
        xhrPost.onload = function() {
            if(xhrPost.status === 201 || xhrPost.status === 200) {
                console.log("POST 요청 성공 " + xhrPost.responseText);
                getToDo();
            } else {
                console.error("POST 요청 실패 " + xhrPost.responseText);
            }
        }

        const postObj = {
            id: userId,
            plan: thingsToDo
        };

        xhrPost.open('POST','/plan/'+ SelectedYMD.replace(/-/gi,""));
        xhrPost.setRequestHeader('Content-Type', 'application/json');
        xhrPost.send(JSON.stringify(postObj));
        e.target.inputIdx.value = '';
    });
}
/*투두 실행되면 오늘의 일정 받아오기 및 투두 생성
-------------------------------------------------------------------*/
