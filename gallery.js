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
    photos.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        
        const img = document.createElement('img');
        img.src = photo.data;
        photoDiv.appendChild(img);
        
        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = photo.description;
        photoDiv.appendChild(description);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editDescription(index);
        photoDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deletePhoto(index);
        photoDiv.appendChild(deleteButton);
        
        gallery.appendChild(photoDiv);
    });
}

function viewMore() {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    photoIndex += photosPerPage;
    displayPhotos(photos.slice(0, photoIndex + photosPerPage));
}

function editDescription(index) {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    const newDescription = prompt("Enter new description:", photos[index].description);
    if (newDescription !== null) {
        photos[index].description = newDescription;
        localStorage.setItem('photos', JSON.stringify(photos));
        loadPhotos();
    }
}

function deletePhoto(index) {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    if (confirm("Are you sure you want to delete this photo?")) {
        photos.splice(index, 1);
        localStorage.setItem('photos', JSON.stringify(photos));
        loadPhotos();
    }
}
