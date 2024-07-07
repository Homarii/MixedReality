let imageData = [];

async function loadImagesForAdmin() {
    const response = await fetch('https://github.com/Homarii/MixedReality/blob/main/images.json'); // Adjust path if necessary
    imageData = await response.json();
    const managementDiv = document.getElementById('image-management');
    managementDiv.innerHTML = '';

    imageData.images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.caption;
        
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
        container.appendChild(captionInput);
        container.appendChild(displayCheckbox);
        
        managementDiv.appendChild(container);
    });
}

async function saveChanges() {
    const token = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub token
    const repo = 'YOUR_USERNAME/YOUR_REPO'; // Replace with your repo details
    const filePath = 'images.json'; // Adjust path if necessary

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update images metadata',
            content: btoa(JSON.stringify(imageData)),
            sha: await getFileSHA(repo, filePath) // Get the current file SHA for updating
        })
    });

    if (!response.ok) {
        alert(`Failed to save changes: ${response.statusText}`);
    } else {
        alert('Changes saved successfully!');
    }
}

async function getFileSHA(repo, filePath) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`);
    const data = await response.json();
    return data.sha;
}

document.addEventListener('DOMContentLoaded', loadImagesForAdmin);
