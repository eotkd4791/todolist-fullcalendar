let SelectedYMD,userId, responseId;

function getCurrentDate() {
    const today_      = new Date();
    const todayYear   = today_.getFullYear();
    const todayMonth  = today_.getMonth();
    const todayDay    = today_.getDate(); 

    SelectedYMD=`${todayYear}-${todayMonth+1}-${todayDay}`;
    document.querySelector(".js-dateToDo").textContent = SelectedYMD; //달력에서 선택한 날짜
}
/* 오늘 날짜를 가져오는 함수
 -------------------------------------------------------------*/

function createCal() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid','interaction'], //dayGrid 달력의 행,열 구현 , interaction날짜 선택 구현
        default: 'dayGridMonth',
        selectable: true,
        dateClick: function(info) {//달력 내에서 날짜 선택(클릭 이벤트)가 발생하면 이 부분으로 들어온다.
            console.log(info.date.getDate());
        
            SelectedYMD = info.dateStr;//달력에서 선택한 날짜(String, "YYYY-MM-DD" 형식)
            document.querySelector(".js-dateToDo").textContent = SelectedYMD;
            getToDo();
           $(".fc-today-button").click(function() {
                getCurrentDate();
                getToDo();
            });

        }
    });
    calendar.render();
};

/*달력 생성 및 클릭 감지.
---------------------------------------------------------*/
