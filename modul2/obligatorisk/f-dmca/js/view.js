updateView();
function updateView() {
    let html = ``;
    html += 
        `<div>
            <h1>F-DMCA</h1>
            <p>About</p>
            <p>Login</p>
        </div>`
    document.getElementById('app').innerHTML = html;
}