function uploadPhotos() {
    const files = document.getElementById('photos').files;
    const description = document.getElementById('description').value;

    let photoData = JSON.parse(localStorage.getItem('photos')) || [];

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoData.push({
                filename: file.name,
                description: description,
                data: e.target.result
            });
            localStorage.setItem('photos', JSON.stringify(photoData));
        };
        reader.readAsDataURL(file);
    });

    alert('Photos uploaded successfully');
    return false;
}
