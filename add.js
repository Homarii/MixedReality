let imageData = { groups: [] };
let newGroup = { description: '', images: [] };

async function loadImagesForSelection() {
    try {
        const photosResponse = await fetch('https://api.github.com/repos/Homarii/MixedReality/contents/photos');
        if (!photosResponse.ok) {
            throw new Error(`HTTP error! Status: ${photosResponse.status}`);
        }
        const photos = await photosResponse.json();
        displayImagesForSelection(photos);
    } catch (error) {
        console.error('Error loading images for selection:', error);
    }
}

function displayImagesForSelection(photos) {
    const imageSelectionDiv = document.getElementById('image-selection');
    imageSelectionDiv.innerHTML = '';

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = `photos/${photo.name}`;
        imgElement.alt = photo.name;
        imgElement.style.maxWidth = '100px';

        const selectCheckbox = document.createElement('input');
        selectCheckbox.type = 'checkbox';
        selectCheckbox.onchange = (e) => {
            if (e.target.checked) {
                newGroup.images.push({ url: `photos/${photo.name}`, caption: '', display: true });
            } else {
                newGroup.images = newGroup.images.filter(img => img.url !== `photos/${photo.name}`);
            }
        };

        const container = document.createElement('div');
        container.classList.add('image-selection-container');
        container.appendChild(imgElement);
        container.appendChild(selectCheckbox);

        imageSelectionDiv.appendChild(container);
    });
}

function createGroup() {
    newGroup.description = document.getElementById('group-description').value;
    imageData.groups.push(newGroup);

    const blob = new Blob([JSON.stringify(imageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('New group created! Download the file and replace the existing images.json in your repository.');
}

document.addEventListener('DOMContentLoaded', loadImagesForSelection);
