
const { s3 } = require('./aws');
const dotenv = require('dotenv');
dotenv.config();

const multer = require("multer");
const multerS3 = require("multer-s3");
// const upload = () =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: process.env.AWS_BUCKET_NAME,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, `image-${Date.now()}.jpeg`);
//       },
//       contentDisposition: 'inline'
//     }),
//   }).single('profilePicture');
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `image-${Date.now()}.jpeg`);
      },
     
      contentDisposition: 'inline',
    }),
  }).single('profilePicture');
module.exports = { upload };