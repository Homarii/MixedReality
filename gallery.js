document.addEventListener('DOMContentLoaded', loadPhotos);

let photoIndex = 0;
const photosPerPage = 10;

function loadPhotos() {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    displayPhotos(photos.slice(0, photosPerPage));
}

function displayPhotos(photos) {
    const gallery = document.querySelector('.gallery');
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

            gallery.appendChild(currentGroup);
        }

        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        
        const img = document.createElement('img');
        img.src = photo.data;
        photoDiv.appendChild(img);
        
        currentGroup.appendChild(photoDiv);
    });
}

function viewMore() {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    photoIndex += photosPerPage;
    displayPhotos(photos.slice(0, photoIndex + photosPerPage));
}
