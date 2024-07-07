const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
    destination: './photos',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('photo');

// Check file type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Public folder
app.use(express.static('./'));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.send(err);
        } else {
            if(req.file == undefined){
                res.send('No file selected');
            } else {
                const description = req.body.description;
                const photoData = {
                    filename: req.file.filename,
                    description: description
                };
                fs.appendFileSync('photos/data.json', JSON.stringify(photoData) + '\n');
                res.redirect('/');
            }
        }
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
