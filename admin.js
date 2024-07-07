function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Debugging logs
    console.log('Username entered:', username);
    console.log('Password entered:', password);

    if (username === 'demo' && password === 'demo') { // Set to 'demo' for both username and password
        console.log('Login successful');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('uploadForm').style.display = 'block';
    } else {
        console.log('Login failed');
        alert('Invalid credentials');
    }
    return false;
}

function uploadPhotos() {
    const files = document.getElementById('photos').files;
    const description = document.getElementById('description').value;

    let photoData = JSON.parse(localStorage.getItem('photos')) || [];

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoData.push({
                filename: file.name,
                description: description,
                data: e.target.result
            });
            localStorage.setItem('photos', JSON.stringify(photoData));
        };
        reader.readAsDataURL(file);
    });

    alert('Photos uploaded successfully');
    return false;
}
