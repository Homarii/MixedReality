document.addEventListener('DOMContentLoaded', loadPhotos);

let photoIndex = 0;
const photosPerPage = 10;

function loadPhotos() {
    fetch('photos.json')
        .then(response => response.json())
        .then(data => {
            displayPhotos(data.slice(0, photosPerPage));
        });
}

function displayPhotos(photos) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear existing photos
    photos.forEach(photo => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        
        const img = document.createElement('img');
        img.src = `photos/${photo.filename}`;
        photoDiv.appendChild(img);
        
        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = photo.description;
        photoDiv.appendChild(description);
        
        gallery.appendChild(photoDiv);
    });
}

function viewMore() {
    fetch('photos.json')
        .then(response => response.json())
        .then(data => {
            photoIndex += photosPerPage;
            displayPhotos(data.slice(0, photoIndex + photosPerPage));
        });
}
