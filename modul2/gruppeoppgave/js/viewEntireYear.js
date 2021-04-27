function initiereYear(){
    var getMonthDays = days(0, fullYear); // adds a week to a date
    let html = ``;
    //Navbar
    html += navBarView();
    html += `<div id="entireYear">`
    html += yearUpdateView();
        html += `<div class="month-container">`
        for (let j = 1; j <= 12 ; j++) {
            var getMonthDays = days(j, model.currentYear)
            html += `<div class="grid-item-month" onclick="switchToMonthView(${j})"> 
                        <div class="month-name">` 
                            + model.months[j - 1] + 
                        `</div>
                        <div class="daysInMonthBox">
                        <div class="grid-item-month-days">`
                        //displacement in entireYear view
                        for(let i = 0; i < model.dateDisplacementEntireYear.length; i++) {
                            if(model.dateDisplacementEntireYear[i].month == (j)) {
                                for(let o = 0; o < model.dateDisplacementEntireYear[i].dateDisplacement; o++) {
                                    html += `<p> </p>`
                                }
                            }
                        }
                        //days in month
                        for (let i = 1; i <= getMonthDays ; i++) {
                            html += `<div class="grid-item-year-days`
                            holidaysInEntireYearView(i, j) == undefined ? html += '' : html += holidaysInEntireYearView(i, j);
                            sundaysInEntireYearView(i, j) == undefined ? html += '' : html += sundaysInEntireYearView(i, j);
                            specialEventsForEntireYear(i, j) == undefined ? html += '' : html += specialEventsForEntireYear(i, j);
                            html += `"onclick="selectedDate(this, ${i})">${i}</div>`
                        }
            html += `</div>
                </div>
            </div>`
        }
    html += `</div> </div>`
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

// special Events Entire Year
function specialEventsForEntireYear(date1, month) {

    for(let i = 0; i < model.specialEvent.events.length; i++){

        for(let j = 0; j < model.specialEvent.events[i].calculatedDate.length; j++) {
            let date = model.specialEvent.events[i].calculatedDate[j]
            var myDate = new Date(date);
            var specialDate = myDate.getDate()
            var specialMonth = myDate.getMonth()
            var specialYear = myDate.getFullYear()
            var year = model.currentYear

            if (date1 == specialDate && month == (specialMonth + 1) && year == specialYear) {
                return ' special-event'
            } 
        }
    }
}

//Gives all holidays classname 'holidays'
function holidaysInEntireYearView(date, month) {
    for(let i = 0; i < model.allHolidaysInCurrentYear.length; i++) {
        // console.log(model.allHolidaysInCurrentYear[i].date.year)
        if (model.allHolidaysInCurrentYear[i].date.day == date && 
            model.allHolidaysInCurrentYear[i].date.month == month && 
            model.allHolidaysInCurrentYear[i].date.year == model.currentYear) {
            return ' holidays'
        } 
    }
}

//Gives all sundays classname 'sunday'
function sundaysInEntireYearView(date, month) {
    for(let i = 0; i < model.sundaysInCurrentYear.length; i++) {
        if (model.sundaysInCurrentYear[i].date == date &&
            model.sundaysInCurrentYear[i].month == month) {
            return ' sundays'
        }
    }
}
