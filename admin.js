document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('uploadForm').style.display === 'block') {
        loadAdminPhotos();
    }
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'demo' && password === 'demo') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('uploadForm').style.display = 'block';
        loadAdminPhotos();
    } else {
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
            loadAdminPhotos(); // Refresh the admin gallery
        };
        reader.readAsDataURL(file);
    });

    alert('Photos uploaded successfully');
    return false;
}

function loadAdminPhotos() {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    displayAdminPhotos(photos);
}

function displayAdminPhotos(photos) {
    const gallery = document.querySelector('.admin-gallery');
    gallery.innerHTML = ''; // Clear existing photos
    let currentGroup = null;
    photos.forEach((photo, index) => {
        if (!currentGroup || currentGroup.description !== photo.description) {
            currentGroup = document.createElement('div');
            currentGroup.classList.add('photo-group');
            currentGroup.description = photo.description;

            const description = document.createElement('div');
            description.classList.add('description');
            description.textContent = photo.description;
            currentGroup.appendChild(description);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit Description';
            editButton.onclick = () => editDescription(photo.description);
            currentGroup.appendChild(editButton);

            gallery.appendChild(currentGroup);
        }

        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        
        const img = document.createElement('img');
        img.src = photo.data;
        photoDiv.appendChild(img);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deletePhoto(index);
        photoDiv.appendChild(deleteButton);
        
        currentGroup.appendChild(photoDiv);
    });
}

function editDescription(description) {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    const newDescription = prompt("Enter new description:", description);
    if (newDescription !== null) {
        photos = photos.map(photo => {
            if (photo.description === description) {
                photo.description = newDescription;
            }
            return photo;
        });
        localStorage.setItem('photos', JSON.stringify(photos));
        loadAdminPhotos(); // Refresh the admin gallery
    }
}

function deletePhoto(index) {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    if (confirm("Are you sure you want to delete this photo?")) {
        photos.splice(index, 1);
        localStorage.setItem('photos', JSON.stringify(photos));
        load
