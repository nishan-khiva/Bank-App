// const multer = require('multer');
// const path = require('path');

// // Storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // folder to save files
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
//     cb(null, uniqueName);
//   }
// });

// // File filter (optional)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase());

//   if (isValidType) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

const multer = require('multer');
const { storage } = require('../cloudinary');

const upload = multer({ storage });

module.exports = upload;

