function appointmentsView() {

    let html = '';
    html +=`<div class="widthCard">`

    if(model.appointmentMenu == true) {
        html += addAppointmentView();
    }

    if(model.specialEventMenu == true) {
        html += specialEventMenuView();
    }

    if(model.appointmentEditMode == true) {
        html += appointmentEditModeView();
    }

    if(model.specialEventEditMode == true) {
        html += specialEventEditModeView();
    }

    if(model.appointmentMenu == false 
    && model.specialEventMenu == false
    && model.appointmentEditMode == false
    && model.specialEventEditMode == false) {
        html +=`<div id="changeBox" class="hendelser">
            <div id="remove">
            <h1>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear} | ${model.currentTime}</h1>
            </div>

                <a href="#" onclick="specialEventMenu(true)"> 
                    <div class="nySpesiellHendelse">+ Spesiell hendelse </div>
                </a>
                <a href="#" onclick="appointmentMenu(true)"> 
                    <div class="nyHendelse">+ Legg til hendelse </div>
                </a>`
        html += `<div class="hendelseBox">`

        //Holidays in appointment
        for(let i = 0; i < model.allHolidaysInCurrentMonth.length; i++) {
            let holidayName;
            if (model.allHolidaysInCurrentMonth[i].date.day == model.selectedDate) {
                holidayName = model.allHolidaysInCurrentMonth[i].holidayName
                html += `<div class="hendelse">
                            <div> <!-- color --> </div>
                            <div class="appointment__holiday" style="color:red"> ${holidayName} </div>
                        </div>`
                // console.log(model.allHolidaysInCurrentMonth[i].date.day)
                // console.log(model.selectedDate)
            }
        }

        //Shows Speical event
        for(let i = 0; i < model.specialEvent.events.length; i++) {
            let id = model.specialEvent.events[i].id;
            // console.log(id)
            let header = model.specialEvent.events[i].header
            let content = model.specialEvent.events[i].content
            let startDate = model.specialEvent.events[i].startDate
            let endDate = model.specialEvent.events[i].endDate
            let color = model.specialEvent.events[i].color
            let sd = startDate.substr(8,2)
            let sm = startDate.substr(5,2)
            let sy = startDate.substr(0,4)
            let ed = endDate.substr(8,2)
            let em = endDate.substr(5,2)
            let ey = endDate.substr(0,4)

            for(let j = 0; j < model.specialEvent.events[i].calculatedDate.length; j++) {
                let date = model.specialEvent.events[i].calculatedDate[j]
                if (date == model.selectedFullDate) {
                    html += `<div class="hendelse">
                    <div class="appointment__header-container">
                        <div class="appointment__color" style="background:${color};"> </div>
                        <div class="header"> ${header} </div> 
                        <div class="appointment__edit-button" onclick="model.selectedIdSpecialEvent = '${id}';getSpecialEventInput();specialEventEditMode(true)"> Edit </div>
                    </div>
                    <p class="appointment__date"> Fra ${sd}.${sm}.${sy} - Til ${ed}.${em}.${ey}  </p>
                    <p> ${content} </p>
                    </div>`
                }
            }
        }

        //Shows appointment from model
        for(let i = 0; i < model.selectedDateAppointments.length; i++) {
            let id = model.selectedDateAppointments[i].id;
            // console.log(model.selectedDateAppointments[i].id)
            html += `<div class="hendelse">
                    <div class="appointment__header-container">
                        <div class="appointment__color" style="background:${model.selectedDateAppointments[i].color};"> <!-- color --> </div>
                        <h2 class="header"> ${model.selectedDateAppointments[i].time} <span style="font-weight:100"> | </span> ${model.selectedDateAppointments[i].header} </h2>
                        <div class="appointment__edit-button" onclick="model.selectedIdEvent = '${id}';getAppointmentInput();appointmentEditMode(true)"> Edit </div>
                    </div>
                    <p> ${model.selectedDateAppointments[i].content} </p>
                    </div>`
        }
        html += `</div>`
    }
    html += `</div>`
    return html;
}

function addAppointmentView() {
    
    let html = '';
    html +=` 
        <div id="changeBox" class="hendelser">
        <div class="gridContainer">
            <div class="gridItem" >
            <div id="circleColorChooser" style="background-color:${model.specialEvent.colorInput}" onclick="useColorPicker(true)"></div>
            </div>
            <div class="gridItem" >
                <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
        </div>`

        if (model.colorPicker) {
            html += appointmentColor() == undefined ? '' : appointmentColor();
        }

        html += `        
        <h3 id="alignTextInEvent">Header</h3>
        <input id="headerText" placeholder="Enter text" type="text" oninput="model.appointmentsHeaderInput = this.value"><br>

        <h3 id="alignTextInEvent">Paragraph</h3>
        <textarea id="paragraphText" placeholder="Enter text" type="text" oninput="model.appointmentsContentInput = this.value"></textarea>

        <h3 id="alignTextInEvent">Tid</h3>
        <input id="timeWhenStart" type="time" oninput="model.appointmentTimeInput = this.value">

        <br>
        <!-- Check if True Or False -->
        <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
        <input id="alignTextInEvent" type="checkbox" id="Modul1" onclick="model.appointmentVisibilityInput.modul1 = this.checked" name="Modul1">
        <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul2" onclick="model.appointmentVisibilityInput.modul2 = this.checked" name="Modul2">
        <label id="alignTextInEvent" for="Modul1"> Modul 2</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul3" onclick="model.appointmentVisibilityInput.modul3 = this.checked" name="Modul3">
        <label id="alignTextInEvent" for="Modul1"> Modul 3</label><br>

        <input id="alignTextInEvent" type="checkbox" id="StartIT" onclick="model.appointmentVisibilityInput.startIT = this.checked" name="StartIT">
        <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

        <!-- Check if True Or False -->
        <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" disabled="disabled" checked>
        <label id="alignTextInEvent" for="Privat"> Privat</label><br>
        <br>

        <input type="submit" class="appointment__back-button" value="Tilbake" onclick="appointmentMenu(false)"> 
        <input type="submit" class="appointment__add-button" value="Legg til i kalender" onclick="pushToAppointmentsArray()"> 
        </div>`
    return html;
}

function specialEventMenuView() {

    //Slik at date input starter på dato du trykker på
    let date = ('0' + model.selectedDate).slice(-2).toString()
    let date2 = ('0' + (model.selectedDate + 1)).slice(-2).toString()
    let month = ('0' + model.currentMonth).slice(-2).toString()
    let year = model.currentYear.toString()
    let startYear = year + '-' + month + '-' + date;
    let endYear = year + '-' + month + '-' + date2;
    model.specialEvent.startDateInput = startYear
    model.specialEvent.endDateInput = endYear

    let html = '';
    html +=` 
        <div id="changeBox" class="hendelser">
        <div class="gridContainer">
            <div class="gridItem" >
            <div id="circleColorChooser" style="background-color:${model.specialEvent.colorInput}" onclick="useColorPicker(true)"></div>
            </div>
            <div class="gridItem" >
                <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
        </div>`

        if (model.colorPicker) {
            html += appointmentColor() == undefined ? '' : appointmentColor();
        }
        
        html += `<h3 id="alignTextInEvent">Header</h3>
        <input id="headerText" placeholder="Enter text" type="text" oninput="model.specialEvent.headerInput = this.value"><br>

        <h3 id="alignTextInEvent">Paragraph</h3>
        <textarea id="paragraphText" placeholder="Enter text" type="text" oninput="model.specialEvent.contentInput = this.value"></textarea>

        <br>
        <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
        <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul 1" onclick="model.specialEvent.visibility.modul1 = this.checked">
        <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul 2" onclick="model.specialEvent.visibility.modul2 = this.checked">
        <label id="alignTextInEvent" for="Modul2"> Modul 2</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul 3" onclick="model.specialEvent.visibility.modul3 = this.checked">
        <label id="alignTextInEvent" for="Modul2"> Modul 3</label><br>

        <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT" onclick="model.specialEvent.visibility.startIT = this.checked">
        <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

        <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" onclick="model.specialEvent.visibility.privat = this.checked" disabled="disabled" checked>
        <label id="alignTextInEvent" for="Privat"> Privat</label><br>
        <br>

        <h3 id="alignTextInEvent">Spesiell hendelse</h3>

        <p id="alignTextInEvent">Fra</p>
        <input id="alignTextInEvent" id="test12345" type="date" value="${year}-${month}-${date}" oninput="model.specialEvent.startDateInput = this.value">
        <br>
        <p id="alignTextInEvent">Til</p>
        <input id="alignTextInEvent" type="date" value="${year}-${month}-${date2}" oninput="model.specialEvent.endDateInput = this.value">

        <input type="submit" class="appointment__back-button" value="Tilbake" onclick="specialEventMenu(false)"> 
        <input type="submit" class="appointment__add-button" value="Legg til i kalender" onclick="pushToSpecialEventsArray()"> 
        </div>`
    return html;
}

function appointmentEditModeView() {

    let html = '';
    for(let i = 0; i < model.selectedDateAppointments.length; i++) {
        let id = model.selectedDateAppointments[i].id
        let id2 = model.selectedIdEvent.replace(' ','');
        let appointment = model.selectedDateAppointments[i]
        let header = appointment.header
        let content = appointment.content
        let time = appointment.time
        let color = appointment.color

        let modul1 = appointment.visibility.modul1 == true ? 'checked="checked"' : '';
        let modul2 = appointment.visibility.modul2 == true ? 'checked="checked"' : '';
        let modul3 = appointment.visibility.modul3 == true ? 'checked="checked"' : '';
        let startIT = appointment.visibility.startIT == true ? 'checked="checked"' : '';
    
        if(id == id2) {
            html +=`
            <div id="changeBox" class="hendelser">
            <div class="gridContainer">
                <div class="gridItem" >
                <div id="circleColorChooser" style="background-color:${model.appointmentsColorInput}" onclick="useColorPicker(true)"></div>
                </div>
                <div class="gridItem" >
                    <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
                </div>
            </div>`

            if (model.colorPicker) {
                html += appointmentColor() == undefined ? '' : appointmentColor();
            }

            html += `<h3 id="alignTextInEvent">Header</h3>
            <input id="headerText" placeholder="Enter text" type="text" value="${header}" onchange="model.appointmentsHeaderInput = this.value"><br>

            <h3 id="alignTextInEvent">Paragraph</h3>
            <textarea id="paragraphText" placeholder="Enter text" type="text" value="${content}" onchange="model.appointmentsContentInput = this.value">${content}</textarea>

            <h3 id="alignTextInEvent">Tid</h3>
            <input id="timeWhenStart" type="time" value="${time == undefined ? '' : time}" onchange="model.appointmentTimeInput = this.value">

            <br>
            <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
            <input id="alignTextInEvent" type="checkbox" id="modul1" name="Modul 1" onclick="model.appointmentVisibilityInput.modul1 = this.checked" ${modul1}>
            <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

            <input id="alignTextInEvent" type="checkbox" id="modul2" name="Modul 2" onclick="model.appointmentVisibilityInput.modul2 = this.checked" ${modul2}>
            <label id="alignTextInEvent" for="Modul2"> Modul 2</label><br>

            <input id="alignTextInEvent" type="checkbox" id="modul3" name="Modul 3" onclick="model.appointmentVisibilityInput.modul3 = this.checked" ${modul3}>
            <label id="alignTextInEvent" for="Modul2"> Modul 3</label><br>

            <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT" onclick="model.appointmentVisibilityInput.startIT = this.checked" ${startIT}>
            <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

            
            <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" disabled="disabled">
            <label id="alignTextInEvent" for="Privat"> Privat</label><br>
            <br>

            <button id="alignTextInEvent" class="appointment__delete-button" onclick="deleteEvent('${id}');appointmentEditMode(false)"> Slett hendelse </button>
            
            <input type="submit" class="appointment__back-button" value="Tilbake" onclick="appointmentEditMode(false)"> 
            <input type="submit" class="appointment__add-button" value="Lagre" onclick="saveEditEvent('${id}','${i}');appointmentEditMode(false);"> 
            </div>`
            return html;
        }
    }
}

function specialEventEditModeView() {
    let html = '';
      
    for(let i = 0; i < model.specialEvent.events.length; i++) {
        let id = model.specialEvent.events[i].id
        let id2 = model.selectedIdSpecialEvent.replace(' ','')
        let event = model.specialEvent.events[i]
        let header = event.header
        let content = event.content
        let startDate = event.startDate
        let endDate = event.endDate
        let color = event.color
        
        let modul1 = event.visibility.modul1 == true ? 'checked="checked"' : '';
        let modul2 = event.visibility.modul2 == true ? 'checked="checked"' : '';
        let modul3 = event.visibility.modul3 == true ? 'checked="checked"' : '';
        let startIT = event.visibility.startIT == true ? 'checked="checked"' : '';
        
        // <input type="color" id="circleColorChooser" value="${color}" onchange="model.specialEvent.colorInput = this.value">
        if(id == id2) {
            html +=`<div id="changeBox" class="hendelser">
            <div class="gridContainer">
            <div class="gridItem">
            <div id="circleColorChooser" style="background-color:${model.specialEvent.colorInput}" onclick="useColorPicker(true)"></div>
            </div>
            <div class="gridItem" >
            <p>${model.selectedDate} ${model.months[model.currentMonth - 1]} ${model.currentYear}</p>
            </div>
            </div>`
            
            if (model.colorPicker) {
                html += appointmentColor() == undefined ? '' : appointmentColor();
            }

            html += `
            <h3 id="alignTextInEvent">Header</h3>
            <input id="headerText" placeholder="Enter text" type="text" value="${header}" onchange="model.specialEvent.headerInput = this.value"><br>

            <h3 id="alignTextInEvent">Paragraph</h3>
            <textarea id="paragraphText" placeholder="Enter text" type="text" value="${content}" onchange="model.specialEvent.contentInput = this.value">${content}</textarea>

            <br>
            <h3 id="alignTextInEvent">Velg hvem som skal se</h3>
            <input id="alignTextInEvent" type="checkbox" id="Modul1" name="Modul 1" onclick="model.specialEvent.visibility.modul1 = this.checked" ${modul1}>
            <label id="alignTextInEvent" for="Modul1"> Modul 1</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Modul2" name="Modul 2" onclick="model.specialEvent.visibility.modul2 = this.checked" ${modul2}>
            <label id="alignTextInEvent" for="Modul2"> Modul 2</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Modul3" name="Modul 3" onclick="model.specialEvent.visibility.modul3 = this.checked" ${modul3}>
            <label id="alignTextInEvent" for="Modul2"> Modul 3</label><br>

            <input id="alignTextInEvent" type="checkbox" id="StartIT" name="StartIT" onclick="model.specialEvent.visibility.startIT = this.checked" ${startIT}>
            <label id="alignTextInEvent" for="StartIT"> Start IT</label><br>

            <input id="alignTextInEvent" type="checkbox" id="Privat" name="Privat" disabled="disabled">
            <label id="alignTextInEvent" for="Privat"> Privat</label><br>
            <br>

            <h3 id="alignTextInEvent">Spesiell hendelse</h3>

            <p id="alignTextInEvent">Fra</p>
            <input id="alignTextInEvent" type="date" value="${startDate}" onchange="model.specialEvent.startDateInput = this.value">
            <br>
            <br>
            <p id="alignTextInEvent">Til</p>
            <input id="alignTextInEvent" type="date" value="${endDate}" onchange="model.specialEvent.endDateInput = this.value">
            <br>
            <br>
            <button id="alignTextInEvent" class="appointment__delete-button" onclick="deleteSpecialEvent('${id}','${i}');specialEventEditMode(false)"> Slett hendelse </button>

            <input type="submit" class="appointment__back-button" value="Tilbake" onclick="specialEventEditMode(false);"> 
            <input type="submit" class="appointment__add-button" value="Lagre endringer" onclick="saveEditSpecialEvent('${id}','${i}');specialEventEditMode(false);">
            </div>`
            return html;
        }
    }
}

function appointmentColor() { 
    return `
        <div class="appointment__color-picker">
            <div class="color-picker" name="grey" style="background-color:#606060" onclick="chooseColor('#606060', this)" ></div>
            <div class="color-picker" name="brown" style="background-color:#6b4212" onclick="chooseColor('#6b4212', this)" ></div>
            <div class="color-picker" name="orange" style="background-color:#ff6a00" onclick="chooseColor('#ff6a00', this)" ></div>  
            <div class="color-picker" name="yellow" style="background-color:#ffdd00" onclick="chooseColor('#ffdd00', this)" ></div> 
            
            <div class="color-picker" name="cyan" style="background-color:#10d3ff" onclick="chooseColor('#10d3ff', this)" ></div> 
            <div class="color-picker" name="turquoise" style="background-color:#00b9bc" onclick="chooseColor('#00b9bc', this)" ></div> 
            <div class="color-picker" name="green" style="background-color:#2ec400" onclick="chooseColor('#2ec400', this)" ></div>
            <div class="color-picker" name="lime" style="background-color:#c7ff38" onclick="chooseColor('#c7ff38', this)" ></div> 
            
            <div class="color-picker" name="blue" style="background-color:#0037ff" onclick="chooseColor('#0037ff', this)" ></div> 
            <div class="color-picker" name="purple" style="background-color:#8A2BE2" onclick="chooseColor('#8A2BE2', this)" ></div>
            <div class="color-picker" name="pink" style="background-color:#FF69B4" onclick="chooseColor('#FF69B4', this)" ></div>
            <div class="color-picker" name="red" style="background-color:#ff0000" onclick="chooseColor('#ff0000', this)" ></div> 
        </div>`    
}