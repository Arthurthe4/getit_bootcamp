
function switchToMonthView(month) {
    selectView('homePage')  
    let id = 'month' + (month - 1)
    changeMonth((month - 1), id)
    // updateView();
}