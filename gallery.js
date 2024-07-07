document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');

    // Fetch photo data from the server or a local file (assuming JSON format)
    fetch('photos.json')
        .then(response => response.json())
        .then(data => {
            data.photos.forEach(photo => {
                const photoGroup = document.createElement('div');
                photoGroup.className = 'photo-group';

                const photoDiv = document.createElement('div');
                photoDiv.className = 'photo';

                const img = document.createElement('img');
                img.src = photo.src;
                img.alt = 'Photo';

                const caption = document.createElement('p');
                caption.className = 'caption';
                caption.textContent = photo.caption;

                photoDiv.appendChild(img);
                photoDiv.appendChild(caption);
                photoGroup.appendChild(photoDiv);
                gallery.appendChild(photoGroup);
            });
        })
        .catch(error => console.error('Error loading photos:', error));
});

function viewMore() {
    // Functionality to load more photos
}
