const express = require('../../node_modules/express');
const router = express.Router();

const Course = require('../../models/Course.js')
const courseValidator = require('../../validations/courseValidations.js')
const User = require('../../models/User.js')

//Course CRUDS

//creat course 
router.post('/', async (req, res) => {
    try {
        const isValidated = courseValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const course = await Course.create(req.body)
        res.send({ msg: 'Course is created ', data: course });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

//get Show all Cousres
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) return res.status(404).send({ error: 'courses do not exist' })
        res.json({ msg: 'You get the course', data: courses })
    }
    catch (error) {
        res.status(404).send('Not found')
    }
});

//get course by id using mongo
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const courseFind = await Course.findById(id);
        if (!courseFind) return res.status(404).send({ error: 'course does not exist' })
        res.json({ msg: 'You get the course', data: courseFind })
    }
    catch (error) {
        res.sendStatus(404)
    }
});

//update course using mongo
router.put('/:id', async (req, res) => {
    try {
        const courseId = req.params.id
        const isValidated = courseValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        await Course.findOneAndUpdate({ '_id': courseId }, req.body)
        const cousreAfterUpdate = await Course.findById(courseId)

        if(cousreAfterUpdate.educationalOrganization != undefined){
            const educationalOrganization= await User.findById(cousreAfterUpdate.educationalOrganization.id)
            const index = educationalOrganization.educationOrganizationCourses.findIndex((course)=> course.id == courseId )
            if(index !=-1){
            const oldCourse=educationalOrganization.educationOrganizationCourses.splice(index,1)
            educationalOrganization.educationOrganizationCourses.push({
                id: cousreAfterUpdate._id,
                name: cousreAfterUpdate.name,
                date: oldCourse.date
            })
            educationalOrganization.save()
        }
    }
    
        res.json({ data: cousreAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }
});

//delete course using mongo
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedformCourses = await Course.findOneAndRemove({ '_id': id })
        if (!deletedformCourses) return res.send('Not found')

        if(deletedformCourses.educationalOrganization != undefined){
            const educationalOrganization= await User.findById(deletedformCourses.educationalOrganization.id)
            educationalOrganization.educationOrganizationCourses= educationalOrganization.educationOrganizationCourses.filter((course)=> course.id!= id )
            educationalOrganization.save()
        }

        res.json({ data: deletedformCourses })
    }
    catch (error) {
        return res.status(400).send({ error: isValidated.error.details[0].message });
        }

});
// End of Course CRUDS
module.exports = router;