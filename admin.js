let imageData = [];

async function loadImagesForAdmin() {
    try {
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        imageData = await response.json();
        displayImagesForAdmin();
    } catch (error) {
        console.error('Error loading images for admin:', error);
    }
}

function displayImagesForAdmin() {
    const managementDiv = document.getElementById('image-management');
    managementDiv.innerHTML = '';

    imageData.images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.caption;
        imgElement.style.maxWidth = '100px'; // Adjust as necessary

        const captionInput = document.createElement('input');
        captionInput.type = 'text';
        captionInput.value = image.caption;
        captionInput.oninput = (e) => imageData.images[index].caption = e.target.value;

        const displayCheckbox = document.createElement('input');
        displayCheckbox.type = 'checkbox';
        displayCheckbox.checked = image.display;
        displayCheckbox.onchange = (e) => imageData.images[index].display = e.target.checked;

        const container = document.createElement('div');
        container.classList.add('admin-photo-container');
        container.appendChild(imgElement);
        container.appendChild(document.createTextNode(' Caption: '));
        container.appendChild(captionInput);
        container.appendChild(document.createTextNode(' Display: '));
        container.appendChild(displayCheckbox);

        managementDiv.appendChild(container);
    });
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
