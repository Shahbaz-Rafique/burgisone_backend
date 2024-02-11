const express = require('express');
const path = require('path');
const {page_upload, profile_upload, video_upload} = require('../multerConfig/multerConfig');
const router = express.Router();


const serverUrl = "http://localhost:4000/";

// Define routes for handling uploads
router.use('/profile_images', express.static(path.join(__dirname, '../upload/profile_images')));
router.use('/videos', express.static(path.join(__dirname, '../upload/videos')));
router.use('/pages_images', express.static(path.join(__dirname, '../upload/pages_images')));

router.post('/image', profile_upload.single('profile_image'), (req, res) => {
    res.json({
        success: 1,
        image: {
            url: `${serverUrl}api/upload/profile_images/${req.file.filename}`,
        },
    });
});

router.post('/video', video_upload.single('video'), (req, res) => {
    res.json({
        success: 1,
        video: {
            url: `${serverUrl}api/upload/videos/${req.file.filename}`,
        },
    });
});

router.post('/page', page_upload.single('page_image'), (req, res) => {
    res.json({
        success: 1,
        page: {
            url: `${serverUrl}api/upload/pages_images/${req.file.filename}`,
        },
    });
});

module.exports = router;
