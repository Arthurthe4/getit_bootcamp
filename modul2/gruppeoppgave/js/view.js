// Views
function updateView(){
    if(model.currentPage == 'homePage') {
        model.navbar.homePageView = true;
        findCurrentDate();
        getCurrentTime();
        filterHolidays();
        getSundays();
        dateDisplacement();
        findWeeksRowCount();
        findWeeksInCurrentMonth();
        getAppointmentsSelctedMonth();
        showAppointments();
        document.getElementById('app').innerHTML = homeView();
        styleCurrentMonth();
        styleSelectedDate();
        runUpdateTimeIntervalOnce();
    }
    if(model.currentPage == 'loginPage') {
        document.getElementById('app').innerHTML = loginScreen();
        appointmentMenuToFalse();
        stopTimeInterval();
        
    }
    if(model.currentPage == 'yearPage') {
        model.navbar.homePageView = false;
        appointmentMenuToFalse();
        findCurrentDate();
        dateDisplacementEntireYear();
        filterHolidays();
        getSundays();
        document.getElementById('app').innerHTML = initiereYear();
        selectCurrentYear();
        stopTimeInterval();
    }
}
// THIS IS HOME PAGE.
function homeView() {
    let html = ``;
    //Navbar
    html += navBarView();
    //Dates
    html += `<div class="calender">`
            //Weeks
            html += `<div class="weeksContainer">`
                //Midlertidig
                html += `<p> Uke</p>`
                for(let i = 1; i <= model.weeksRowCount; i++) {
                    html += `<p class="weeks-grid-item"> ${model.weeksInCurrentMonth[i - 1]}</p>`
                }
            html += `</div>`
            //Weekdays
            html += `<div class="grid-date-container">
                <p>Mandag</p>
                <p>Tirsdag</p>
                <p>Onsdag</p>
                <p>Torsdag</p>
                <p>Fredag</p>
                <p>Lørdag</p>
                <p>Søndag</p>`
                //Empty boxes (date displacement)
                for(let j = 1; j <= model.dateDisplacement; j++) {
                    html += `<p>  </p>`
                }
                //Dates
                for (let i = 1; i <= model.daysInMonth ; i++) {
                    let date = i
                    let dato = ('0' + date).slice(-2)
                    let mnd = ('0' + model.currentMonth).slice(-2)
                    let fullDate = `${model.currentYear}`+ '-' + mnd + '-' + dato
                    
                    html += `<div>`
                        html += `<div id="date${i}" class="dates-grid-item `
                        holidaysInMonthView(date) == undefined ? html += '' : html += holidaysInMonthView(date);
                        sundaysInMonthView(date) == undefined ? html += '' : html += sundaysInMonthView(date);                        
                        html +=`" onclick="selectedDate(this, ${i})"> ${i} </div>
                        <div class="appointment-container">`
                        for(let i = 0; i < model.specialEvent.events.length; i++) {
                            for(let j = 0; j < model.specialEvent.events[i].calculatedDate.length; j++) {
                                if (model.specialEvent.events[i].calculatedDate[j] == fullDate) {
                                    html +=`<div class="appointment--color" style="background-color:${model.specialEvent.events[i].color}"></div>`
                                }
                            }
                        }
                        for(let i = 0; i < model.selectedMonthAppointments.length; i++) {
                            if (model.selectedMonthAppointments[i].date.getDate() == date) {
                                html +=`<div class="appointment--color" style="background-color:${model.selectedMonthAppointments[i].color}"></div>`
                            }
                        }
                        html +=`</div></div>`
                }
            html += `</div>`
    html += `</div>`    
    html += appointmentsView();
    html += `</div>`
    return html
}

//Egen funksjon som lager navbar
function navBarView() {
    let html = '';
    html += `<div class="navBar">`
        //Navbar login & se hele året button
        html += `<div class="buttonContainer">
                <p class="loginButton" onclick="selectView('loginPage')">Login</p>`
        if (model.navbar.homePageView == true) {
            html += `<p class="seHeleÅret" onclick="selectView('yearPage')" >Se hele året</p>`
        } 
        if (model.navbar.homePageView == false) {
            html += `<p class="seHeleÅret" onclick="selectView('homePage')" >Tilbake</p>`
        }
        html += `</div>`
        //Navbar year
        html += `<div class="navBarYearContainer"> 
                    <div onclick="changeYear(-1)"> ‹ </div>
                    <h1> ` + model.currentYear + `</h1>
                    <div onclick="changeYear(1)"> › </div>
                </div>`
        //Navbar month
        html += `<div>`
        for(var i in model.months) {
            html += `<div class="navBarMonth" id="month${i}" onclick="changeMonth(${i}, 'month${i}')"> `
            + model.months[i] + `</div>`
        }
        html += `</div>`
    html +=`</div>`
    return html
}


function yearUpdateView() {
    let html = '';
    html += `<div id="years">
        <div> <button onclick="changeYear(-10)"> ‹ </button></div>`

    let currentYear = model.currentYear
    let lastNumber = currentYear.toString().slice(-1);
    let x = currentYear - lastNumber;
    let y = 9 - lastNumber;
    for(let i = x; i <= (model.currentYear + y); i++) {
        html += `<div class="entireYear__years" id="year${i}" onclick="selectYearInEntireYear(${i})">${i}</div>`   
    }

    html += `<div> <button onclick="changeYear(10)"> › </button> </div>
    </div>`
    return html;
} 


//Gives all holidays classname 'holidays'
function holidaysInMonthView(date) {
    for(let i = 0; i < model.allHolidaysInCurrentMonth.length; i++) {
        if (model.allHolidaysInCurrentMonth[i].date.day == date && model.allHolidaysInCurrentMonth[i].date.year == model.currentYear) {
            return ' holidays'
        } 
    }
}

//Gives all sundays classname 'sunday'
function sundaysInMonthView(date) {
    for(let i = 0; i < model.sundaysInCurrentMonth.length; i++) {
        if (model.sundaysInCurrentMonth[i] == date) {
            return ' sundays'
        }
    }
}

