async function loadImages() {
    try {
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const imageData = await response.json();
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = ''; // Clear existing images

        imageData.images.forEach(image => {
            if (image.display) {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = image.caption;
                const captionElement = document.createElement('p');
                captionElement.textContent = image.caption;
                const container = document.createElement('div');
                container.classList.add('photo-container');
                container.appendChild(imgElement);
                container.appendChild(captionElement);
                gallery.appendChild(container);
            }
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadImages);
