async function loadImages() {
    const response = await fetch('https://github.com/Homarii/MixedReality/blob/main/images.json'); // Adjust path if necessary
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
}

document.addEventListener('DOMContentLoaded', loadImages);
