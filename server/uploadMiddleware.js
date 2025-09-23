const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    // Accept more image types
    const filetypes = /jpeg|jpg|png|gif|webp|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    console.log('Uploading file:', file.originalname, 'MIME:', file.mimetype, 'Extension:', path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    console.error('Rejected file:', file.originalname, 'MIME:', file.mimetype, 'Extension:', path.extname(file.originalname));
    cb(new Error('Only image files are allowed!'));
  }
});

module.exports = upload;
