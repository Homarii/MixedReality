function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') { // Replace with your own credentials
        window.location.href = 'admin.html';
    } else {
        alert('Invalid username or password');
    }
}
