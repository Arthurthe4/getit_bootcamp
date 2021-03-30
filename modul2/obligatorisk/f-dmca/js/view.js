function updateView() {
    if(model.currentPage == 'homePage') {
        document.getElementById('app').innerHTML = homeView('Listen With Spotify', 'Register Account');
    }
    if(model.currentPage == 'registerPage'){
        document.getElementById('app').innerHTML = registerView('Login')
    }
    if(model.currentPage == 'profielPage'){      
        document.getElementById('app').innerHTML = profileView('Logout')
    }
}
function homeView(loginSpotify, registerAccount){
    document.body.style.backgroundColor = 'blueviolet';
    let html = ``;
    let navBar = ``;
    navBar += 
    `<div class="flex-container">
        <div class="logo"><a href="#">F-DMCA</a></div>
        <div class="loginOrRegister">
            <a href="#">${loginSpotify}</a>
        </div>
        <div class="loginOrRegister">
            <a onclick="selectView('registerPage')">${registerAccount}</a>
        </div>
    </div>`
    html += 
    `<h1 class="quoteHomePage" style="color: white">YOU Decide What Music <br> YOU Want To Listen Too</h1>`
    return navBar + html;
}
function registerView(loginText){
    document.body.style.backgroundColor = 'white';
    let registerButtons = ``;
    let navBar = 
    `<div class="flex-container">
        <div class="logo">
            <a onclick="selectView('homePage')">F-DMCA</a>
        </div>
        <div class="loginOrRegister">
            <a onclick="selectView('registerPage')">${loginText}</a>
        </div>
    </div>`
    registerButtons += 
        `<h1 class="quoteHomePage">Login with one of your streaming platforms</h1>
        <div class="buttonCenter">
            <a class="buttons" id="twitch" 
                href="
                https://api.twitch.tv/kraken/oauth2/
                authorize?response_type=code
                &client_id=heimd6l9u6idisizqmjoxsj0rpzo3k
                &redirect_uri=http://127.0.0.1:5501/html/index.html
                &scope=user_read">
                Twitch
            </a>
            <br>
            <button class="buttons" id="youtube">YouTube</button><br>
            <button class="buttons" id="facebook">FaceBook</button>
        </div>`
    return navBar + registerButtons;
}
function profileView(logoutText){
    document.body.style.backgroundColor = 'white';
    let html = ``;
    let navBar = 
    `<div class="flex-container">
        <div class="logo">
            <a onclick="selectView('homePage')">F-DMCA</a>
        </div>
        <div class="loginOrRegister">
            <a onclick="selectView('homePage')">${logoutText}</a>
        </div>
    </div>`
    html += 
    `<div class="grid-container">
        <img class="item1" id="profilePicture" src="../src/Jonas-Arthur-Wilhelmsen-350x350.jpg" />
        <br>
        <button class="item2 loginSpotifyBtn" onclick="playView()">
            Login with Spotify
        </button>
        <h3 id="userName" class="item3 userNameText">UserName</h3>
        ${playView()}
    </div>
    <div><p id="textsLoop"></p></div>`
    return navBar + html
}

function playView(){
    let html = ``;
    for (const song of model.songList) {
        html += `
        <div id="demo">
            <a style="color: #000;" 
            href="${song.url}" 
            onclick="selectedSong(${song.songName})">
            ${song.songName}</a> 
            <input type="button" value="Remove" onclick="deleteSong()">
            <br>
        </div>`
    }
    return html;
}