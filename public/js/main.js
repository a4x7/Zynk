const endPoint = 'http://localhost:8000';

async function sendRequest(url, options){
    try {
        const response = await fetch(`${endPoint}${url}`, options);
        if(!response.ok)
            throw new Error(`HTTP Error ${response.status}`);
        return await response.json();
    } catch(err) {
        console.log(err.message);
    }
}

async function authenticate(){
    const res = await sendRequest('/api/login');
    if(!res.response.isAuthenticated)
        return false;
    return true;
}

async function applyAuth(){
    const auth = document.createElement('a');
    const isAuthenticated = await authenticate();
    const sep = document.createElement('span');
    sep.style.border = '1px solid #020202';
    sep.style.minWidth = '0';
    sep.style.margin = '0 0.5rem 0 0.5rem';
    if(!isAuthenticated){
        const auth_2 = auth.cloneNode();
        auth.innerText = 'Sign in';
        auth.href = '/static/login.html';
        auth_2.innerText = 'Sign up';
        auth_2.href = '/static/register.html';
        const nav = document.getElementById('nav-span-last');
        nav.appendChild(auth);
        nav.appendChild(sep);
        nav.appendChild(auth_2);
    } else {
        const data = await sendRequest('/api/login');
        const greet = document.createElement('span');
        greet.innerText = `Hello ${data.response.username}!`;
        auth.innerText = `Sign out`;
        auth.onclick = async () => {
            const res = await sendRequest('/api/logout');
            if(res.success === true)
                alert('You are logged out');
            window.location.pathname = '/static/index.html';
        };
        const navSpanLast = document.getElementById('nav-span-last');
        navSpanLast.appendChild(greet);
        navSpanLast.appendChild(sep);
        navSpanLast.appendChild(auth);
        const navSpanFirst = document.getElementById('nav-span-first');
        const dash = document.createElement('a');
        dash.innerText = 'Dashboard';
        dash.href = '/static/dashboard.html';
        navSpanFirst.appendChild(dash);
    }
    document.getElementById('nav-auth-placeholder-1').remove();
    document.getElementById('nav-auth-placeholder-2').remove();
}

async function login(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const res = await sendRequest('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if(res.success === true){
        alert('You are logged in');
        window.location.pathname = '/static/dashboard.html';
    } else if(res.success === false) {
        alert(res.response);
    } else {
        alert('Something went wrong');
    }
}

applyAuth();

if(window.location.pathname === '/static/dashboard.html'){
    authenticate().then(predicate => {
        if(!predicate)
            return document.body.innerHTML = 'You are not authenticated<br><a href="/static/index.html"><button>Go home</button></a>';
        fetchRecords();
    });
}

const r = document.querySelector(':root');
const dark = {
    bgcolor: 'rgb(2, 2, 2)',
    fgcolor: 'rgb(232, 234, 237)',
};
const light = {
    bgcolor: 'rgb(232, 234, 237)',
    fgcolor: 'rgb(2, 2, 2)',
};

if(r && localStorage.getItem('theme')) {
    const local = localStorage.getItem('theme');
    if(local === 'dark') {
        r.style.setProperty('--bg-color', dark.bgcolor);
        r.style.setProperty('--fg-color', dark.fgcolor);
        localStorage.setItem('theme', 'dark');
    } else if(local === 'light') {
        r.style.setProperty('--bg-color', light.bgcolor);
        r.style.setProperty('--fg-color', light.fgcolor);
        localStorage.setItem('theme', 'light');
    }
}

if(r){
    const themeBut = document.getElementById('heading-theme');
    themeBut.addEventListener('click', () => {
        const rs = getComputedStyle(r);
        if(rs.getPropertyValue('--bg-color') === light.bgcolor && rs.getPropertyValue('--fg-color') === light.fgcolor){
            r.style.setProperty('--bg-color', dark.bgcolor);
            r.style.setProperty('--fg-color', dark.fgcolor);
            localStorage.setItem('theme', 'dark');
        } else {
            r.style.setProperty('--bg-color', light.bgcolor);
            r.style.setProperty('--fg-color', light.fgcolor);
            localStorage.setItem('theme', 'light');
        }
    });
}

async function fetchRecords(){
    if(!(await authenticate()))
        return;
    const table = document.createElement('table');
    const res = (await sendRequest('/api', {
        method: 'GET'
    })).response;
    for(let i of res){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        td1.innerText = i.URL;
        td2.innerHTML = `<a href="/api/redirect/${i.short}">${i.short}</a>`;
        td3.innerHTML = new Date(i.expireAt).toLocaleString();
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
    if(table.hasChildNodes()){
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        const th3 = document.createElement('th');
        th1.innerText = 'Original URL';
        th2.innerText = 'Shortened URL';
        th3.innerText = 'Expires At';
        tr.append(th1, th2, th3);
        table.firstElementChild.before(tr);
        const bod = document.getElementById("body");
        if(bod){
            const div = document.createElement('div');
            div.style.setProperty('display', 'flex');
            div.style.setProperty('flex-direction', 'column');
            div.style.setProperty('align-items', 'center');
            const text = document.createElement('h3');
            text.innerText = 'Stored URLs';
            div.appendChild(text);
            div.appendChild(table);
            document.getElementById('body').appendChild(div);
        }
    }
}
