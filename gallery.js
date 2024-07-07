// gallery.js

async function uploadPhotos() {
    const files = document.getElementById('photos').files;
    const description = document.getElementById('description').value;

    if (files.length === 0) {
        alert("Please select files to upload.");
        return false;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await uploadFileToGitHub(file, description);
    }

    alert("Photos uploaded successfully!");
    loadImages(); // Refresh the gallery
    return false;
}

async function uploadFileToGitHub(file, description) {
    const reader = new FileReader();
    reader.onload = async function(event) {
        const content = btoa(event.target.result); // Base64 encode the file content
        const filePath = `photos/${file.name}`;
        const token = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub token
        const repo = 'YOUR_USERNAME/YOUR_REPO'; // Replace with your repo details

        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Upload ${file.name} - ${description}`,
                content: content
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}: ${response.statusText}`);
        }
    };
    reader.readAsBinaryString(file);
}

async function loadImages() {
    const repo = 'homarii/MixedReality'; // Replace with your repo details
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/photos`);
    const images = await response.json();

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear existing images

    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.download_url;
        img.alt = image.name;
        gallery.appendChild(img);
    });
}

document.addEventListener('DOMContentLoaded', loadImages);
