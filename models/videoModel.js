const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    video_link: {
        type: String,  // Assuming it's a URL or file path
    },
    category: {
        type: String, 
        required:true,
    },
    pages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        required: true,
    },
    assignUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
