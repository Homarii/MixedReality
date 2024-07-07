const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
    destination: './photos',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('photos', 10); // Allow multiple file uploads

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Public folder
app.use(express.static('./'));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: 'secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') { // Replace with your credentials
        req.session.user = username;
        res.redirect('/admin');
    } else {
        res.send('Invalid credentials');
    }
});
app.post('/upload', isAuthenticated, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(err);
        } else {
            if (req.files.length === 0) {
                res.send('No file selected');
            } else {
                const description = req.body.description;
                const photoData = req.files.map(file => ({
                    filename: file.filename,
                    description: description
                }));
                photoData.forEach(photo => {
                    fs.appendFileSync('photos/data.json', JSON.stringify(photo) + '\n');
                });
                res.redirect('/');
            }
        }
    });
});
app.post('/edit', isAuthenticated, (req, res) => {
    const { index, description } = req.body;
    const data = fs.readFileSync('photos/data.json', 'utf-8').trim().split('\n').map(line => JSON.parse(line));
    if (data[index]) {
        data[index].description = description;
        fs.writeFileSync('photos/data.json', data.map(d => JSON.stringify(d)).join('\n'));
        res.send('Description updated');
    } else {
        res.send('Invalid index');
    }
});
app.post('/rearrange', isAuthenticated, (req, res) => {
    const { order } = req.body; // Array of indices
    const data = fs.readFileSync('photos/data.json', 'utf-8').trim().split('\n').map(line => JSON.parse(line));
    const rearrangedData = order.map(i => data[i]);
    fs.writeFileSync('photos/data.json', rearrangedData.map(d => JSON.stringify(d)).join('\n'));
    res.send('Photos rearranged');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
