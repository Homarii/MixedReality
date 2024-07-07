document.addEventListener('DOMContentLoaded', loadPhotos);

function loadPhotos() {
    fetch('/photos/data.json')
        .then(response => response.text())
        .then(data => {
            const photos = data.trim().split('\n').map(line => JSON.parse(line));
            const gallery = document.querySelector('.gallery');
            photos.forEach(photo => {
                const photoDiv = document.createElement('div');
                photoDiv.classList.add('photo');
                
                const img = document.createElement('img');
                img.src = `/photos/${photo.filename}`;
                photoDiv.appendChild(img);
                
                const description = document.createElement('div');
                description.classList.add('description');
                description.textContent = photo.description;
                photoDiv.appendChild(description);
                
                gallery.appendChild(photoDiv);
            });
        });
}
