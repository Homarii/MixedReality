let imageData = { groups: [] };

async function loadImagesForAdmin() {
    try {
        const response = await fetch('images.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        imageData = await response.json();
        displayGroupsForAdmin();
    } catch (error) {
        console.error('Error loading images for admin:', error);
    }
}

function displayGroupsForAdmin() {
    const groupManagementDiv = document.getElementById('group-management');
    groupManagementDiv.innerHTML = '';

    imageData.groups.forEach((group, groupIndex) => {
        const groupContainer = document.createElement('div');
        groupContainer.classList.add('group-container');

        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.value = group.description;
        descriptionInput.oninput = (e) => group.description = e.target.value;
        groupContainer.appendChild(descriptionInput);

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
            captionInput.oninput = (e) => imageData.groups[groupIndex].images[imageIndex].caption = e.target.value;

            const displayCheckbox = document.createElement('input');
            displayCheckbox.type = 'checkbox';
            displayCheckbox.checked = image.display;
            displayCheckbox.onchange = (e) => imageData.groups[groupIndex].images[imageIndex].display = e.target.checked;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                imageData.groups[groupIndex].images.splice(imageIndex, 1);
                displayGroupsForAdmin();
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

        const removeGroupButton = document.createElement('button');
        removeGroupButton.textContent = 'Remove Group';
        removeGroupButton.onclick = () => {
            imageData.groups.splice(groupIndex, 1);
            displayGroupsForAdmin();
        };
        groupContainer.appendChild(removeGroupButton);

        const moveUpButton = document.createElement('button');
        moveUpButton.textContent = 'Move Up';
        moveUpButton.onclick = () => {
            if (groupIndex > 0) {
                const temp = imageData.groups[groupIndex - 1];
                imageData.groups[groupIndex - 1] = imageData.groups[groupIndex];
                imageData.groups[groupIndex] = temp;
                displayGroupsForAdmin();
            }
        };
        groupContainer.appendChild(moveUpButton);

        const moveDownButton = document.createElement('button');
        moveDownButton.textContent = 'Move Down';
        moveDownButton.onclick = () => {
            if (groupIndex < imageData.groups.length - 1) {
                const temp = imageData.groups[groupIndex + 1];
                imageData.groups[groupIndex + 1] = imageData.groups[groupIndex];
                imageData.groups[groupIndex] = temp;
                displayGroupsForAdmin();
            }
        };
        groupContainer.appendChild(moveDownButton);

        groupManagementDiv.appendChild(groupContainer);
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
