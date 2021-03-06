const express = require('../../node_modules/express');
const router = express.Router();


const MasterClass = require('../../models/MasterClass.js')
const masterClassValidator = require('../../validations/masterClassValidations.js')
const User = require('../../models/User.js')

//MasterClass CRUDS

//creat masterClass 
router.post('/', async (req, res) => {
    try {
        const isValidated = masterClassValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const masterClass = await MasterClass.create(req.body)
        res.send({ msg: 'MasterClass is created ', data: masterClass });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

//get Show all Cousres
//1
router.get('/', async (req, res) => {
    try {
        const masterClasses = await MasterClass.find();
        if (!masterClasses) return res.status(404).send({ error: 'masterClasss do not exist' })
        res.json({ msg: 'You get the masterClass', data: masterClasses })
    }
    catch (error) {
        res.status(404).send('Not found')
    }
});

//(id  => MasterClassId)
//get masterClass by id using mongo
//1
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const masterClassFind = await MasterClass.findById(id);
        if (!masterClassFind) return res.status(404).send({ error: 'masterClass does not exist' })
        res.json({ msg: 'You get the masterClass', data: masterClassFind })
    }
    catch (error) {
        res.sendStatus(404)
    }
});

//update masterClass using mongo
//(masterClass_id => masterClassId)
//1
router.put('/:id', async (req, res) => {
    try {
        const masterClassId = req.params.id
        const isValidated = masterClassValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        await MasterClass.findOneAndUpdate({ '_id': masterClassId }, req.body)
        const masterClassAfterUpdate = await MasterClass.findById(masterClassId)

        if(masterClassAfterUpdate.educationalOrganization != undefined){
            const educationalOrganization= await User.findById(masterClassAfterUpdate.educationalOrganization.id)
            const index = educationalOrganization.educationOrganizationMasterClasses.findIndex((masterClass)=> masterClass.id == masterClassId )
            if(index !=-1){
            const oldMasterClass=educationalOrganization.educationOrganizationMasterClasses.splice(index,1)
            educationalOrganization.educationOrganizationMasterClasses.push({
                id: masterClassAfterUpdate._id,
                name: masterClassAfterUpdate.name,
                date: oldMasterClass.date
            })
            educationalOrganization.save()
        }
    }
        res.json({ data: masterClassAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }
});

//(id  => educational_organizationId  ,masterClass_id => masterClassId)
//delete masterClass using mongo
//1
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedformMasterClass = await MasterClass.findOneAndRemove({ '_id': id })
        if (!deletedformMasterClass) return res.send('Not found')

        if(deletedformMasterClass.educationalOrganization != undefined){
            const educationalOrganization= await User.findById(deletedformMasterClass.educationalOrganization.id)
            educationalOrganization.educationOrganizationMasterClasses= educationalOrganization.educationOrganizationMasterClasses.filter((masterClass)=> masterClass.id!= id )
            educationalOrganization.save()
        }
        res.send(deletedformMasterClass)

    }
    catch (error) {
        res.sendStatus(404).send('Not found');
    }

});

// End of MasterClass CRUDS
module.exports = router;