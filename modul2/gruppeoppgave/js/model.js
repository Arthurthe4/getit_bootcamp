// Models
const model = {
    //--------------------------- View ---------------------------
        currentPage: 'homePage',
        // currentPage: 'loginPage',
        // currentPage: 'yearPage',
        navbar: { //forandrer utseende på navbar
            homePageView: true,
        },
        
        appointmentMenu: false,
        appointmentEditMode: false,
        selectedIdEvent: false,
    
        specialEventMenu: false,
        specialEventEditMode: false,
        selectedIdSpecialEvent: false,
    
        colorPicker: false,
    //--------------------------- Login content ---------------------------
        adminUser: {
            userName: 'admin',
            password: '1234',
        },
        loginInputUser: '',
        loginInputPassword: '',
    
    //--------------------------- Calender ---------------------------
        //time
        currentTime: 0,
        compareTime: '',
        timeInterval: false,
        clearInterval:'',
    
        //date/day
        currentDate: 0,
        selectedDate: 0,
        selectedFullDate: 0,
        dateDisplacement: 0,
        dateDisplacementEntireYear: [],
        weekdayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
        
        //week
        weeksInCurrentMonth: [], 
        weeksRowCount: 0,
        
        //month
        months: [
            'Januar',
            'Februar',
            'Mars',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Desember',
        ],
        daysInMonth: 0,
        currentMonth: 0,
        changeMonth: 0,
        colorSelectedMonth: 'empty',
    
        //year
        currentYear: 0, //året nå
        changeYear: 0, //antall år frem og tilbake
        selectedYearInEntireYear: 0,
    
        //holidays
        allHolidays: [],
        allHolidaysInCurrentYear: [],
        allHolidaysInCurrentMonth: [],
        sundaysInCurrentYear: [],
        sundaysInCurrentMonth: [],
    
    //--------------------------- Appointments ---------------------------
        //hendelser
        appointments: [//år , mnd (zero index) , dato
            { id: '2021-04-16-1', date: new Date(2021, 3, 16), time: '09:00',  header: 'Chorei',                     content: '',                                                             color: '#0000FF', visibility: {modul1: true,   modul2: true,  modul3: false, startIT: false, privat: true,}},
            { id: '2021-04-16-2', date: new Date(2021, 3, 16), time: '09:45',  header: 'OPT',                        content: 'Vise fram hvor langt dere har kommet med gruppeoppgave',       color: '#FF0000', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-25-1', date: new Date(2021, 3, 25), time: '10:15',  header: 'Test5',                      content: 'Test-test-test5',                                              color: '#FF7F50', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-28-1', date: new Date(2021, 3, 28), time: '09:00',  header: 'Øvelse av presentasjon',     content: 'Øvelse av presentasjon til åpendag på torsdag',                color: '#FF00FF', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-1', date: new Date(2021, 3, 22), time: '09:00',  header: 'Test1',                      content: 'Test',                                                         color: '#0000FF', visibility: {modul1: false,  modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-2', date: new Date(2021, 3, 22), time: '09:15',  header: 'Test2',                      content: 'Test',                                                         color: '#008000', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-3', date: new Date(2021, 3, 22), time: '09:30',  header: 'Test3',                      content: 'Test',                                                         color: '#ffdd00', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-4', date: new Date(2021, 3, 22), time: '09:45',  header: 'Test4',                      content: 'Test',                                                         color: '#FF0000', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-5', date: new Date(2021, 3, 22), time: '10:00',  header: 'Test5',                      content: 'Test',                                                         color: '#000000', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-6', date: new Date(2021, 3, 22), time: '10:15',  header: 'Test6',                      content: 'Test',                                                         color: '#0000FF', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-7', date: new Date(2021, 3, 22), time: '11:30',  header: 'Test7',                      content: 'Test',                                                         color: '#000000', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-22-8', date: new Date(2021, 3, 22), time: '12:15',  header: 'Test8',                      content: 'Test',                                                         color: '#008000', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-03-09-1', date: new Date(2021, 2, 9),  time: '10:15',  header: 'Møte',                       content: 'Møte med kunde kl. 10.15',                                     color: '#ffdd00', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-03-11-1', date: new Date(2021, 2, 11), time: '10:15',  header: 'Møte',                       content: 'Møte med kunde kl. 10.15',                                     color: '#FF0C93', visibility: {modul1: true,   modul2: true,  modul3: true,  startIT: true,  privat: true,}},
            { id: '2021-04-26-1', date: new Date(2021, 3, 26), time: '09:00',  header: 'Jonas',                      content: 'Jonas jobber idag',                                            color: '#FF0C93', visibility: {modul1: false,  modul2: false,  modul3: false,  startIT: false,  privat: true,}},
            { id: '2021-04-27-1', date: new Date(2021, 3, 27), time: '09:00',  header: 'Forbrede på fremføring',     content: 'Lage en plan på hva vi skal si og vise, og hvem som sier hva', color: '#0037ff', visibility: {modul1: false,  modul2: false,  modul3: false,  startIT: false,  privat: true,}},
            { id: '2021-04-27-2', date: new Date(2021, 3, 27), time: '12:15',  header: 'Møte med Elin',              content: 'Vise fram gruppeprosjektet til Elin',                          color: '#37FF00', visibility: {modul1: false,  modul2: false,  modul3: false,  startIT: false,  privat: true,}},
        ],
        selectedDateAppointments: [],
        selectedMonthAppointments: [],
        
        appointmentsColorSelected:'',
        appointmentsColorInput:'',
        appointmentsHeaderInput:'',
        appointmentsContentInput:'',
        appointmentTimeInput: '',
        appointmentVisibilityInput: {
            modul1: false,
            modul2: false,
            modul3: false,
            startIT: false,
            privat: true,
        }, 
        
    
        colors: {
            green:'#7CFC00',
            red:'#8B0000',
            blue:'#4169E1',
            yellow:'#FFFF00',
            indigo:'#4B0082',
            orange:'#FF7F50',
            //Legg til flere farger senere
        },
        addedNewEventParams: {  ///flytt hele obj og push til controller og push i events :D
            header: "",
            content: "",
            color: "",
            fromToDate: "",
            date: new Date(),
        },
    
        specialEvent: {
            events: [
                {   
                    id: '2021-04-01-1',
                    startDate: '2021-04-01', 
                    endDate: '2021-04-05', 
                    header: 'Påskeferie', 
                    content: 'Påskeferie fra torsdag til mandag for alle moduller',
                    visibility: {
                        modul1: true,
                        modul2: true,
                        modul3: true,
                        startIT: true,
                        privat: true,
                    },
                    color: '#FFC800',
                    calculatedDate: ["2021-04-01", "2021-04-02", "2021-04-03", "2021-04-04", "2021-04-05"]
                },
                {
                    id: '2021-04-12-1',
                    startDate: '2021-04-12', 
                    endDate: '2021-04-18', 
                    header: 'Gruppeprosjekt', 
                    content: 'Jobbe med gruppeprosjekt x.',
                    visibility: {
                        modul1: true,
                        modul2: false,
                        modul3: true,
                        startIT: false,
                        privat: true,
                    },
                    color: '#007BFF',
                    calculatedDate: ["2021-04-12", "2021-04-13", "2021-04-14", "2021-04-15", "2021-04-16", "2021-04-17" , "2021-04-18"]
                },
            ],
    
            startDateInput: '',
            endDateInput: '',
            colorInput: '',
            headerInput:'',
            contentInput:'',
            visibility: {
                modul1: false,
                modul2: false,
                modul3: false,
                startIT: false,
                privat: true,
            }, 
        }
        
    }
    today = new Date();
    fullYear = today.getFullYear();
    monthsNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
    
    