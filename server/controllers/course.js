const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const { title } = req.body;
        const newCourse = new Course({ title, user: req.user._id });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ owner: req.user._id });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, owner: req.user._id });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { title } = req.body;
        const course = await Course.findOneAndUpdate( { _id: req.params.id, owner: req.user._id }, { title }, { new: true });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    }   catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};  
