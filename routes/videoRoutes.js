const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Video = require('../models/videoModel');

// Video registration route
router.post('/add', async (req, res) => {
    try {
        const video = new Video({
            title: req.body.title,
            description: req.body.description,
            video_link: req.body.video_link,
            pages: req.body.pages,  // Assuming page ID is sent in the request body
            assignUsers: req.body.assignUsers,  // Assuming user IDs are sent in the request body
        });

        await video.save();

        res.status(201).json({
            success: true,
            message: "Video registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// List videos route
router.get('/list', async (req, res) => {
    try {
        const videos = await Video.find();  // Populate the 'page' field with 'name'
        res.status(200).json({
            success: true,
            videos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update video route
router.put('/update/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const updatedVideo = await Video.findByIdAndUpdate(videoId, req.body, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        res.status(200).json({
            success: true,
            video: updatedVideo,
            message: "Video updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete video route
router.delete('/delete/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const deletedVideo = await Video.findByIdAndDelete(videoId);

        if (!deletedVideo) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Video deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
