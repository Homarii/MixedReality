async function loadImages() {
    try {
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const imageData = await response.json();
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = ''; // Clear existing images

        imageData.groups.forEach(group => {
            const groupContainer = document.createElement('div');
            groupContainer.classList.add('group-container');

            const descriptionElement = document.createElement('h2');
            descriptionElement.textContent = group.description;
            groupContainer.appendChild(descriptionElement);

            const imagesRow = document.createElement('div');
            imagesRow.classList.add('images-row');
            group.images.forEach(image => {
                if (image.display) {
                    const imgElement = document.createElement('img');
                    imgElement.src = image.url;
                    imgElement.alt = image.caption;
                    const captionElement = document.createElement('p');
                    captionElement.textContent = image.caption;
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('photo-container');
                    imageContainer.appendChild(imgElement);
                    imageContainer.appendChild(captionElement);
                    imagesRow.appendChild(imageContainer);
                }
            });

            groupContainer.appendChild(imagesRow);
            gallery.appendChild(groupContainer);
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadImages);
