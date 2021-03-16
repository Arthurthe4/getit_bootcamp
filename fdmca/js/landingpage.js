updateView()
function updateView() {
    var html = ``;
    html += `
    <div id="major">
        <div id="one"><h1 id="logoName">F-DMCA</h1></div>
        <div id="two">
            <h4 id="login">
                <a href="./login.html">Login</a>
            </h4>
        </div>
    </div>
    <p>YOU decide what music <br/> YOU listen to </p>
    `
    document.getElementById('app').innerHTML = html
}