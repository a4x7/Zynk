async function save(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const responseData = await response.json();
    if(responseData.success === true) {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('username', responseData.response.user);
        localStorage.setItem('email', responseData.response.email);
        window.location = '/static/index.html';
    } else {
        alert('failed');
    }
}

if(window.location.pathname === '/static/index.html'){
    if(localStorage.getItem('authenticated') === 'true'){
        const d = document.createElement('div');
        d.innerText = `Welcome ${localStorage.getItem('username')}`;
        document.body.appendChild(d);
    }
}
