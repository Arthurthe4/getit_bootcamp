updateView()
function updateView() {
    var html = ``;
    html += `
    <div id="major">
        <div id="one">
            <h1 id="logoName">
                <a href="./landingpage.html">F-DMCA</a>
            </h1>
        </div>
        <div id="two" style="display: none"><h4 id="login">Login</h4></div>
    </div>
    <div>
        <h3 style="text-align:center">Login with one of your streaming platforms</h3>
    </div>
    <div class="grid-container">
        <div class="grid-item"></div>
        <div class="grid-item">
            <button id="twitch">Twitch</button></br>
            <button id="youtube">YouTube</button></br>
            <button id="facebook">FaceBook</button>
        </div>
        <div class="grid-item"></div>
    </div>
    `
    document.getElementById('app').innerHTML = html
}