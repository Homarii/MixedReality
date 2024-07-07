let imageData = { groups: [] };
let newGroups = [];

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
    const imageSelectionDiv = document.createElement('div');
    imageSelectionDiv.classList.add('image-selection');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = `photos/${photo.name}`;
        imgElement.alt = photo.name;
        imgElement.style.maxWidth = '100px';

        const selectCheckbox = document.createElement('input');
        selectCheckbox.type = 'checkbox';
        selectCheckbox.onchange = (e) => {
            if (e.target.checked) {
                newGroups[newGroups.length - 1].images.push({ url: `photos/${photo.name}`, caption: '', display: true });
            } else {
                newGroups[newGroups.length - 1].images = newGroups[newGroups.length - 1].images.filter(img => img.url !== `photos/${photo.name}`);
            }
        };

        const container = document.createElement('div');
        container.classList.add('image-selection-container');
        container.appendChild(imgElement);
        container.appendChild(selectCheckbox);

        imageSelectionDiv.appendChild(container);
    });
    document.getElementById('new-groups').appendChild(imageSelectionDiv);
}

function addNewGroup() {
    const newGroupContainer = document.createElement('div');
    newGroupContainer.classList.add('group-container');

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Group Description';
    newGroupContainer.appendChild(descriptionInput);

    const newGroup = { description: '', images: [] };
    newGroups.push(newGroup);

    const createButton = document.createElement('button');
    createButton.textContent = 'Create Group';
    createButton.onclick = () => {
        newGroup.description = descriptionInput.value;
        document.getElementById('new-groups').removeChild(newGroupContainer);
        displayNewGroups();
    };
    newGroupContainer.appendChild(createButton);

    document.getElementById('new-groups').appendChild(newGroupContainer);
    loadImagesForSelection();
}

function displayNewGroups() {
    const newGroupsDiv = document.createElement('div');
    newGroupsDiv.classList.add('new-groups');
    newGroups.forEach((group, groupIndex) => {
        const groupContainer = document.createElement('div');
        groupContainer.classList.add('group-container');

        const descriptionElement = document.createElement('h2');
        descriptionElement.textContent = group.description;
        groupContainer.appendChild(descriptionElement);

        const imagesRow = document.createElement('div');
        imagesRow.classList.add('images-row');
        group.images.forEach((image, imageIndex) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.caption;
            imgElement.style.maxWidth = '100px';

            const captionInput = document.createElement('input');
            captionInput.type = 'text';
            captionInput.value = image.caption;
            captionInput.oninput = (e) => newGroups[groupIndex].images[imageIndex].caption = e.target.value;

            const displayCheckbox = document.createElement('input');
            displayCheckbox.type = 'checkbox';
            displayCheckbox.checked = image.display;
            displayCheckbox.onchange = (e) => newGroups[groupIndex].images[imageIndex].display = e.target.checked;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                newGroups[groupIndex].images.splice(imageIndex, 1);
                displayNewGroups();
            };

            const container = document.createElement('div');
            container.classList.add('admin-photo-container');
            container.appendChild(imgElement);
            container.appendChild(document.createTextNode(' Caption: '));
            container.appendChild(captionInput);
            container.appendChild(document.createTextNode(' Display: '));
            container.appendChild(displayCheckbox);
            container.appendChild(removeButton);

            imagesRow.appendChild(container);
        });

        groupContainer.appendChild(imagesRow);
        newGroupsDiv.appendChild(groupContainer);
    });

    document.getElementById('new-groups').appendChild(newGroupsDiv);
}

function saveChanges() {
    imageData.groups.push(...newGroups);

    const blob = new Blob([JSON.stringify(imageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('New groups created! Download the file and replace the existing images.json in your repository.');
}

document.addEventListener('DOMContentLoaded', () => {
    loadImagesForSelection();
    addNewGroup();
});
