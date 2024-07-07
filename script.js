let photos = [];

function addPhoto() {
    const fileInput = document.getElementById('photo-file');
    const descriptionInput = document.getElementById('photo-description');
    const file = fileInput.files[0];
    const description = descriptionInput.value;

    if (file && description) {
        const reader = new FileReader();
        reader.onload = function(event) {
            photos.push({ url: event.target.result, description });
            renderPhotos();
            fileInput.value = '';
            descriptionInput.value = '';
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file and enter a description.');
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
