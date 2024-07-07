function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'demo' && password === 'demo') {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid credentials');
    }
    return false;
}
