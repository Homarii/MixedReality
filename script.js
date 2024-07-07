let photos = [];

function addPhoto() {
    const url = document.getElementById('photo-url').value;
    const description = document.getElementById('photo-description').value;
    if (url && description) {
        photos.push({ url, description });
        renderPhotos();
        document.getElementById('photo-url').value = '';
        document.getElementById('photo-description').value = '';
    }
}

function deletePhoto(index) {
    photos.splice(index, 1);
    renderPhotos();
}

function renderPhotos() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    photos.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');

        const img = document.createElement('img');
        img.src = photo.url;

        const desc = document.createElement('div');
        desc.classList.add('description');
        desc.textContent = photo.description;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deletePhoto(index);

        photoDiv.appendChild(img);
        photoDiv.appendChild(desc);
        photoDiv.appendChild(deleteButton);
        gallery.appendChild(photoDiv);
    });
}
