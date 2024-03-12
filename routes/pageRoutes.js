const express = require('express');
const router = express.Router();
const Page = require('../models/pageModel');
const Category = require('../models/categoryModel');

// Page registration route
router.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        const page = new Page({
            name: req.body.name,
            description: req.body.description,
            page_image: req.body.page_image,
        });

        await page.save();

        res.status(201).json({
            success: true,
            message: "Page registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.post('/category', async (req, res) => {
    try {
        const categ = new Category({
            category: req.query.category,
            page: req.query.page,
        });

        await categ.save();

        res.status(201).json({
            success: true,
            message: "Category registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get('/getcategory', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// List pages route
router.get('/list', async (req, res) => {
    try {
        const pages = await Page.find();
        res.status(200).json({
            success: true,
            pages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update page route
router.put('/update/:pageId', async (req, res) => {
    try {
        const pageId = req.params.pageId;
        const updatedPage = await Page.findByIdAndUpdate(pageId, req.body, { new: true });

        if (!updatedPage) {
            return res.status(404).json({
                success: false,
                message: "Page not found",
            });
        }

        res.status(200).json({
            success: true,
            page: updatedPage,
            message: "Page updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete page route
router.delete('/delete/:pageId', async (req, res) => {
    try {
        const pageId = req.params.pageId;
        const deletedPage = await Page.findByIdAndDelete(pageId);

        if (!deletedPage) {
            return res.status(404).json({
                success: false,
                message: "Page not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Page deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
