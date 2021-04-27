// Controller.js
function selectView(cachedView){
    model.currentPage = cachedView
    updateView();
}

function loginResponse(){
    if(model.loginInputUser === model.adminUser.userName && model.loginInputPassword === model.adminUser.password){
        document.getElementById('app').innerHTML = homeView();
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
}

/*--------------------------- Calender - Homepage ---------------------------*/
//Egen funksjon som finner datoen idag
function findCurrentDate() {
    //year
    let d = new Date();
    let year = d.getFullYear()
    if (model.selectedYearInEntireYear !== 0 ) {
        model.currentYear = model.selectedYearInEntireYear
    } else {
        model.currentYear = (year + model.changeYear)
    }
    //month
    let month = d.getMonth() + 1;
    if (model.changeMonth == 0) {
        model.currentMonth = month
    } else {
        model.currentMonth = model.changeMonth
    }
    //date
    let date = d.getDate();
    model.currentDate = date
    //days in this month
    model.daysInMonth = new Date(model.currentYear, model.currentMonth, 0).getDate();

    //gives selectedDate same date as currentDate
    if (model.selectedDate == 0) {
        model.selectedDate = model.currentDate;
    }

    let dato = ('0' + model.selectedDate).slice(-2)
    let mnd = ('0' + model.currentMonth).slice(-2)
    model.selectedFullDate = `${model.currentYear}`+ '-' + mnd + '-' + dato
}

function getCurrentTime() {
    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();

    if(hour < 10) {
        hour = ('0' + hour).slice(-2)
    }
    if(minutes < 10) {
        minutes = ('0' + minutes).slice(-2)
    }
    model.currentTime = hour + ':' + minutes;
}

function updateTime() {
    getCurrentTime()
    if (model.compareTime != model.currentTime) {
        model.compareTime = model.currentTime;
        updateView();
        // console.log('kjører')
    } else {
        return
    }
}

function runUpdateTimeIntervalOnce() {
    if (model.timeInterval == false && model.appointmentMenu == false &&
        model.appointmentEditMode == false && model.specialEventMenu == false &&
        model.specialEventEditMode == false) {
        model.timeInterval = true;
        model.clearInterval = setInterval(updateTime, 10000);
    }
}

function stopTimeInterval() {
    clearInterval(model.clearInterval)
    model.timeInterval = false
}

function daysInMonth(month, year){
    return new Date(year, month, 0).getDate();
}

//Får dato til å starte på riktig ukedag
function dateDisplacement() {
    let x = firstWeekdayInMonth(model.currentYear, model.currentMonth,)
    if (x == 0) {
        model.dateDisplacement = 6;
    }
    for(let i = 1; i <= 6; i++) {
        if (x == i) {
            model.dateDisplacement = (i - 1);
        }
    }
}

//EntireYear - Får dato til å starte på riktig ukedag
function dateDisplacementEntireYear() {
    let filterdList = [];
    for(let i = 1; i <= 12; i++) {
        let month = i;
        let x = firstWeekdayInMonth(model.currentYear, i);

        if (x == 0) {
            filterdList.push({month, dateDisplacement:6})
        }

        for(let j = 1; j <= 6; j++) {
            if (x == j) {
                filterdList.push({month, dateDisplacement:j - 1});
            }
        }
    }
    model.dateDisplacementEntireYear = filterdList;
    // console.log(model.dateDisplacementEntireYear)
}

//Finner første ukedag i mnd
function firstWeekdayInMonth(year, month) {
    let d = new Date(year, month - 1, 01);
    return d.getDay()
}

//Changes month when selecting month in navbar
function changeMonth(monthIndex, idName) {
    model.changeMonth = monthIndex + 1;
    model.colorSelectedMonth = idName;
    appointmentMenuToFalse();
    updateView();
    clearInput()
}

//Farger current/selected mnd
function styleCurrentMonth() {
    let id = 'month' + (model.currentMonth - 1)
    if (model.colorSelectedMonth == 'empty') {
        document.getElementById(id).classList.add('colorSelected');
    } else {
        document.getElementById(model.colorSelectedMonth).classList.add('colorSelected');
    }
}

function changeYear(value) {
    model.changeYear += value
    if (model.selectedYearInEntireYear !== 0) {
        model.selectedYearInEntireYear += value;
    }
    appointmentMenuToFalse();
    updateView();

}

//Funksjon som finner riktig uke nummer i currentMonth
function findWeeksInCurrentMonth() {
    let x = []
    if (model.daysInMonth + model.dateDisplacement <= 28) {
        x.push(1, 8, 15, 22)
    } else if (model.daysInMonth + model.dateDisplacement >= 29 &&
        model.daysInMonth + model.dateDisplacement < 35) {
        let LastDateInMonth = model.daysInMonth;
        x.push(1, 8, 15, 22, LastDateInMonth)
    } else if (model.daysInMonth + model.dateDisplacement >= 35) {
        let LastDateInMonth = model.daysInMonth;
        x.push(1, 8, 15, 22, 29, LastDateInMonth)
    }
    let weekNumber = []
    for(let i = 0; i < x.length; i++) {
        let date = x[i];
        weekNumber.push(findWeekNumber(model.currentYear, model.currentMonth, date))
    }
    model.weeksInCurrentMonth = weekNumber;
}

//Hjelpe funksjon som finner uke nummer fra dato
function findWeekNumber(year,month,day) {
    function serial(days) { return 86400000*days; }
    function dateserial(year,month,day) { return (new Date(year,month-1,day).valueOf()); }
    function weekday(date) { return (new Date(date)).getDay()+1; }
    function yearserial(date) { return (new Date(date)).getFullYear(); }
    var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year,month,day),
        date2 = dateserial(yearserial(date - serial(weekday(date-serial(1))) + serial(4)),1,3);
    return ~~((date - date2 + serial(weekday(date2) + 5))/ serial(7));
}

//Antall rader i mnd
function findWeeksRowCount() {
    let x = model.dateDisplacement + model.daysInMonth
    if (x >= 36) {
        model.weeksRowCount = 6
    } if (x >= 29 && x < 36) {
        model.weeksRowCount = 5
    } if (x <= 28) {
        model.weeksRowCount = 4
    }
}

//Style currentDate first, then style selectedDate
function styleSelectedDate() {
    let index = model.selectedDate
    let id = 'date' + index
    document.getElementById(id).classList.add('selectedDate')
}

//Style selectedDate
function selectedDate(selectedDiv, date) {
    let datesDiv = document.getElementsByClassName('dates-grid-item');
    for(let i = 0; i < datesDiv.length; i++) {
        datesDiv[i].classList.remove('selectedDate');
    }
    model.selectedDate = date
    selectedDiv.classList.add('selectedDate')
    appointmentMenuToFalse();
    updateView();
}

//Shows appointments from selectedDate
function showAppointments() {
    let filteredList = [];
    for(let i = 0; i < model.appointments.length; i++) {
        let appointment = model.appointments[i];
        if (appointment.date.getFullYear() == model.currentYear
            && appointment.date.getMonth() == (model.currentMonth - 1)
            && appointment.date.getDate() == model.selectedDate) {
            filteredList.push(appointment)
        }
    }
    model.selectedDateAppointments = filteredList
}

//Get appointment from selected month
function getAppointmentsSelctedMonth() {
    let filteredList = [];
    for(let i = 0; i < model.appointments.length; i++) {
        let appointment = model.appointments[i];
        if (appointment.date.getFullYear() == model.currentYear
            && appointment.date.getMonth() == (model.currentMonth - 1)) {
            filteredList.push(appointment)
        }
    }
    model.selectedMonthAppointments = filteredList
}


// Backwords years
function days(month,year) {
    return new Date(year, month, 0).getDate();
    initiereYear();

};

//Select current year in entire year view
function selectCurrentYear() {
    let index;
    if (model.selectedYearInEntireYear !== 0 ) {
        index = model.selectedYearInEntireYear
    } else {
        index = model.currentYear
    }
    let id = 'year' + index
    document.getElementById(id).classList.add('entireYear__currentYear')
}

function selectYearInEntireYear(value) {
    model.selectedYearInEntireYear = value;
    updateView();
}

function filterHolidays() {
    //Gets all holidays in current year
    let filterdList = []
    for(let i = 0; i < model.allHolidays.length; i++) {
        let year = model.currentYear.toString().slice(-2)
        let index = i.toString()
        let holidays = model.allHolidays[i];
        
        for(let j = 0; j < holidays.length; j++) {
            let holidayName = holidays[j].name
            let d = parseInt(holidays[j].date.substr(8, 2))
            let m = parseInt(holidays[j].date.substr(5, 2))
            let y = parseInt(holidays[j].date.substr(0, 4))
            let date = {year: y, month: m, day: d}
            
            if (year == index) {
                filterdList.push({holidayName, date})
            }
        }
    }
    model.allHolidaysInCurrentYear = filterdList;
    // console.log(model.allHolidaysInCurrentYear)

    // //Gets all holidays in current month
    let filterdList2 = []
    for(let i = 0; i < model.allHolidays.length; i++) {
        let year = model.currentYear.toString().slice(-2)
        let month = model.currentMonth
        let index = i.toString()
        let holidays = model.allHolidays[i];

        
        for(let j = 0; j < holidays.length; j++) {
            let holidayName = holidays[j].name
            let d = parseInt(holidays[j].date.substr(8, 2))
            let m = parseInt(holidays[j].date.substr(5, 2))
            let y = parseInt(holidays[j].date.substr(0, 4))
            let date = {year: y, month: m, day: d}
            
            if (month == m && year == index) {
                filterdList2.push({holidayName, date})
            }
        }
    }
    model.allHolidaysInCurrentMonth = filterdList2;
    // console.log(model.allHolidaysInCurrentMonth)
}

//Finds all sundays in currentMonth
function getSundays() {
    //All sundays in currentMonth
    let filteredList = []
    for(let i = 1; i < model.daysInMonth + 1; i++) {
        let isoDates = new Date(model.currentYear, (model.currentMonth - 1), i);
        let dateToString = isoDates.toString()
        let weekday = dateToString.substr(0, 2)
        if (weekday == 'Su') {
            filteredList.push(i)
        }
    }
    model.sundaysInCurrentMonth = filteredList;

    //All sundays in a year
    let filteredList2 = []
    for(let j = 0; j < model.months.length + 1; j++) {
        for(let i = 1; i <= model.daysInMonth + 1; i++) {
            let isoDates = new Date(model.currentYear, (j - 1), i);
            let month = j
            let date = i
            let dateToString = isoDates.toString()
            let weekday = dateToString.substr(0, 2)
            if (weekday == 'Su') {
                filteredList2.push({month, date})
            }
        }
    }
    model.sundaysInCurrentYear = filteredList2;
    // console.log(model.sundaysInCurrentYear)
}

function useColorPicker(value) {
    if (model.colorPicker == value) {
        model.colorPicker = !value
    } else {
        model.colorPicker = value
    }
    updateView();
}

function chooseColor(color, div) {
    let alleDivs = document.getElementsByClassName('color-picker')
    for (var i = 0; i < alleDivs.length; i++) {
        alleDivs[i].classList.remove('color-picker__selectedColor');
    }  
    model.specialEvent.colorInput = color;
    model.appointmentsColorInput = color
    model.selectedColor = div
    div.classList.add('color-picker__selectedColor')
    model.colorPicker = false;
    updateView();    
}

// Pusher input Values fra event/hendelser.
function pushToAppointmentsArray(){
    newColorValue = model.appointmentsColorInput
    newHeaderValue = model.appointmentsHeaderInput;
    newParagraphValue = model.appointmentsContentInput;
    newTimeValue = model.appointmentTimeInput;
    newDateValue = model.selectedDate;
    let vInput = model.appointmentVisibilityInput
    let modul1 = vInput.modul1
    let modul2 = vInput.modul2 
    let modul3 = vInput.modul3 
    let startIT = vInput.startIT
    let privat = vInput.privat

    let visibility = {modul1: modul1, modul2: modul2, modul3: modul3, startIT: startIT, privat: privat,}

    //legger til null forran hvis dato eller month er mindre enn 10
    date = ('0' + newDateValue).slice(-2)
    month = ('0' + model.currentMonth).slice(-2)
    fullDate = `${model.currentYear}-${month}-${date}` 
    newId = generateId(model.appointments, fullDate)

    if (!newColorValue) {
        alert('Velg en farge')
        return
    }

    if (newHeaderValue.length < 1 || newParagraphValue.length < 1) {
        alert('Fyll inn tekst')
        return
    }

    if (!newTimeValue) {
        alert('Velg et tidspunkt')
        return
    }

    model.appointments.push(
        {
            id:         newId,
            date:       new Date( model.currentYear, model.currentMonth - 1,  model.selectedDate),
            time:       newTimeValue,
            header:     newHeaderValue,
            content:    newParagraphValue,
            visibility: visibility,
            color:      newColorValue,
        }
    )
    appointmentMenu(false)
}

function pushToSpecialEventsArray() {
    let startDate = model.specialEvent.startDateInput
    let endDate = model.specialEvent.endDateInput
    let header = model.specialEvent.headerInput
    let content = model.specialEvent.contentInput
    let color = model.specialEvent.colorInput
    let vInput = model.specialEvent.visibility
    let modul1 = vInput.modul1
    let modul2 = vInput.modul2
    let modul3 = vInput.modul3
    let startIT = vInput.startIT
    let privat = vInput.privat

    let visibility = {modul1: modul1, modul2: modul2, modul3: modul3, startIT: startIT, privat: privat,}

    if (!color) {
        alert('Velg en farge')
        return
    }

    if (header.length < 1 || content.length < 1) {
        alert('Fyll inn tekst')
        return
    }

    if (startDate > endDate) {
        alert('Ugyldig dato, Til dato starter før fra dato.')
        return
    }

    let id = generateId(model.specialEvent.events, startDate);
    let calculatedDate = calculateSpecialEventDate(startDate, endDate);
    model.specialEvent.events.push(
        {
            id: id,
            startDate: startDate,
            endDate: endDate,
            header: header,
            content: content,
            visibility: visibility,
            color: color,
            calculatedDate: calculatedDate
        }
    )
    specialEventMenu(false)
}

//Save changes on "normal" events
function saveEditEvent(id, index){
    let id2 = model.selectedIdEvent.replace(' ','')
    if(id == id2){        
        let event = model.selectedDateAppointments[index]
        let vInput = model.appointmentVisibilityInput

        let date = event.date 
        let time = model.appointmentTimeInput
        let header = model.appointmentsHeaderInput 
        let content = model.appointmentsContentInput
        let color = model.appointmentsColorInput 

        let modul1 = vInput.modul1
        let modul2 = vInput.modul2 
        let modul3 = vInput.modul3 
        let startIT = vInput.startIT
        let privat = vInput.privat

        let appointments = (appointment) => appointment.id == id;
        let appointmentIndex = model.appointments.findIndex(appointments)
        
        let visibility = {modul1: modul1, modul2: modul2, modul3: modul3, startIT: startIT, privat: privat,}

        let changes = {
            id: id,
            date: date,
            time: time,
            header: header,
            content: content,
            color: color,
            visibility: visibility,         
        }
        model.appointments[appointmentIndex] = changes
        // console.log(model.appointments[appointmentIndex].visibility)
    }
}

//Save changes on special events
function saveEditSpecialEvent(id, index) {
    let id2 = model.selectedIdSpecialEvent.replace(' ','')
    if(id == id2) {
        let indexForEvents = model.specialEvent.events[index]
        let sEvent = model.specialEvent
        let vInput = model.specialEvent.visibility

        let startDateInput = sEvent.startDateInput
        let endDateInput = sEvent.endDateInput
        let headerInput = sEvent.headerInput
        let contentInput = sEvent.contentInput
        let colorInput = sEvent.colorInput

        let modul1 = vInput.modul1
        let modul2 = vInput.modul2
        let modul3 = vInput.modul3
        let startIT = vInput.startIT
        let privat = vInput.privat

        let visibilityInput = {modul1: modul1, modul2: modul2, modul3: modul3, startIT: startIT, privat: privat,}

        if (startDateInput > endDateInput) {
            alert('Ugyldig dato, Til dato starter før fra dato.')
            return
        }
        if (startDateInput.length == !8 || endDateInput.length == !8) {
            alert('Fyll inn dato')
            return
        }

        let calculatedDate = calculateSpecialEventDate(startDateInput, endDateInput);

        let changes = {
                id: id,
                startDate: startDateInput,
                endDate: endDateInput,
                header: headerInput,
                content: contentInput,
                visibility: visibilityInput,
                color: colorInput,
                calculatedDate: calculatedDate
            }

        model.specialEvent.events[index] = changes
        // console.log(model.specialEvent.events[index].visibility)
    }
}

//give checkbox input a value, when opening appointment edit mode
function getAppointmentInput() {
    for(let i = 0; i < model.selectedDateAppointments.length; i++) {
        let appointment = model.selectedDateAppointments[i]
        let id = model.selectedDateAppointments[i].id
        let id2 = model.selectedIdEvent.replace(' ','');
        
        if(id == id2) {
            model.appointmentsColorInput = appointment.color
            model.appointmentsHeaderInput = appointment.header
            model.appointmentsContentInput = appointment.content
            model.appointmentTimeInput = appointment.time

            model.appointmentVisibilityInput.modul1 = appointment.visibility.modul1
            model.appointmentVisibilityInput.modul2 = appointment.visibility.modul2
            model.appointmentVisibilityInput.modul3 = appointment.visibility.modul3
            model.appointmentVisibilityInput.startIT = appointment.visibility.startIT
        }
    }
}

//give checkbox input a value, when opening special event edit mode
function getSpecialEventInput() {
    for(let i = 0; i < model.specialEvent.events.length; i++) {
        let specialEvent = model.specialEvent.events[i]
        let input = model.specialEvent
        let id = model.specialEvent.events[i].id
        let id2 = model.selectedIdSpecialEvent.replace(' ','');
        
        if(id == id2) {
            input.colorInput = specialEvent.color
            input.headerInput = specialEvent.header
            input.contentInput = specialEvent.content
            input.startDateInput = specialEvent.startDate
            input.endDateInput = specialEvent.endDate

            input.visibility.modul1 = specialEvent.visibility.modul1
            input.visibility.modul2 = specialEvent.visibility.modul2
            input.visibility.modul3 = specialEvent.visibility.modul3
            input.visibility.startIT = specialEvent.visibility.startIT
            // console.log(specialEvent)
        }
    }
}

//Delete "normal" event
function deleteEvent(id) {
    let appointments = (appointment) => appointment.id == id;
    let appointmentIndex = model.appointments.findIndex(appointments)
    let id2 = model.selectedIdEvent.replace(' ','')
    if(id == id2) {
        model.appointments.splice(appointmentIndex, 1);
    }
    updateView();
}

//Delete special event
function deleteSpecialEvent(id, index) {
    let id2 = model.selectedIdSpecialEvent.replace(' ','')
    if(id == id2) {
        model.specialEvent.events.splice(index, 1);
    }
    updateView();
}

function clearInput() {
    model.specialEvent.startDateInput = '';
    model.specialEvent.endDateInput = '';
    model.specialEvent.colorInput = '';
    model.specialEvent.headerInput = '';
    model.specialEvent.contentInput = '';
    model.specialEvent.visibility.modul1 = false;
    model.specialEvent.visibility.modul2 = false;
    model.specialEvent.visibility.modul3 = false;
    model.specialEvent.visibility.startIT = false;

    model.appointmentsColorInput = '';
    model.appointmentsHeaderInput = '';
    model.appointmentsContentInput = '';
    model.appointmentTimeInput = '';
    model.appointmentVisibilityInput.modul1 = false;
    model.appointmentVisibilityInput.modul2 = false;
    model.appointmentVisibilityInput.modul3 = false;
    model.appointmentVisibilityInput.startIT = false;
}

//Regner ut hvor mange dager
function calculateSpecialEventDate(start, end) {

    const listDate = [];
    const startDate = start;
    const endDate = end;
    const dateMove = new Date(startDate);
    let strDate = startDate;
    while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
    };
    return listDate;
}

function generateId(idEvents, date) {
    let idInEvents
    let idDate
    let allIdInSelectDate = [0]
    for(let i = 0; i < idEvents.length; i++) {
        idInEvents = idEvents[i].id
        idDate = idInEvents.substr(0, 10)
        if (date == idDate) {
            idInEvents = parseInt(idInEvents.substr(11))
            allIdInSelectDate.push(idInEvents)
        }
    }
    let biggestNumber = allIdInSelectDate.reduce(function(a, b) {
        return Math.max(a, b);
    });
    newId = date + '-' + (biggestNumber + 1)
    // console.log(newId)
    return newId
}


function appointmentMenu(trueOrFalse) {
    model.appointmentMenu = trueOrFalse
    if (model.appointmentMenu == true) {stopTimeInterval()}
    if (model.appointmentMenu == false) {
        clearInput()
        model.colorPicker = false;
    }
    updateView();
}

function specialEventMenu(trueOrFalse) {
    model.specialEventMenu = trueOrFalse
    if (model.specialEventMenu == true) {stopTimeInterval()}
    if (model.specialEventMenu == false) {
        clearInput()
        model.colorPicker = false;
    }
    updateView();
}

function appointmentEditMode(trueOrFalse) {
    model.appointmentEditMode = trueOrFalse
    if (model.appointmentEditMode == true) {stopTimeInterval()}
    if (model.appointmentEditMode == false) {
        clearInput()
        model.colorPicker = false;
    }
    updateView();
}

function specialEventEditMode(trueOrFalse) {
    model.specialEventEditMode = trueOrFalse
    if (model.specialEventEditMode == true) {stopTimeInterval()}
    if (model.specialEventEditMode == false) {
        clearInput()
        model.colorPicker = false;
    }
    updateView();
}

function appointmentMenuToFalse() {
    model.appointmentMenu = false;
    model.specialEventMenu = false;
    model.appointmentEditMode = false;
    model.specialEventEditMode = false;
}

