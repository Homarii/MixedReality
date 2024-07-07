let imageData = { images: [] };

async function loadImagesForAdmin() {
    try {
        // Fetch existing image metadata
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        imageData = await response.json();

        // Fetch the list of images from the photos directory
        const photosResponse = await fetch('https://api.github.com/repos/Homarii/MixedReality/contents/photos');
        if (!photosResponse.ok) {
            throw new Error(`HTTP error! Status: ${photosResponse.status}`);
        }
        const photos = await photosResponse.json();

        // Map existing metadata to fetched images
        const imagesMap = new Map(imageData.images.map(img => [img.url, img]));
        const managementDiv = document.getElementById('image-management');
        managementDiv.innerHTML = '';

        photos.forEach(photo => {
            const url = `photos/${photo.name}`;
            const existingImage = imagesMap.get(url) || { url, caption: '', display: false };
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.alt = existingImage.caption;
            imgElement.style.maxWidth = '100px';

            const captionInput = document.createElement('input');
            captionInput.type = 'text';
            captionInput.value = existingImage.caption;
            captionInput.oninput = (e) => existingImage.caption = e.target.value;

            const displayCheckbox = document.createElement('input');
            displayCheckbox.type = 'checkbox';
            displayCheckbox.checked = existingImage.display;
            displayCheckbox.onchange = (e) => existingImage.display = e.target.checked;

            const container = document.createElement('div');
            container.classList.add('admin-photo-container');
            container.appendChild(imgElement);
            container.appendChild(document.createTextNode(' Caption: '));
            container.appendChild(captionInput);
            container.appendChild(document.createTextNode(' Display: '));
            container.appendChild(displayCheckbox);

            managementDiv.appendChild(container);

            imagesMap.set(url, existingImage);
        });

        imageData.images = Array.from(imagesMap.values());
    } catch (error) {
        console.error('Error loading images for admin:', error);
    }
}

function saveChanges() {
    const blob = new Blob([JSON.stringify(imageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('Changes saved! Download the file and replace the existing images.json in your repository.');
}

document.addEventListener('DOMContentLoaded', loadImagesForAdmin);
