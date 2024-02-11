const multer = require('multer');

const profile_images_storage = multer.diskStorage({
    destination: 'upload/profile_images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const video_storage = multer.diskStorage({
    destination: 'upload/videos',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const page_image_storage = multer.diskStorage({
    destination: 'upload/pages_images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const page_upload = multer({ storage: page_image_storage });
const profile_upload = multer({ storage: profile_images_storage });
const video_upload = multer({ storage: video_storage });

module.exports = { page_upload, profile_upload, video_upload };
