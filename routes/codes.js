const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const dbUserCred = require("./secrets/db/login")

const { dbUname, dbPword } = dbUserCred;


const uri = `mongdb Uri here`


mongoose.connect(uri)
    .then(console.log('succesfully connected to db'))
    .catch(e => console.log(e.message));

const codesSchema = new mongoose.Schema({
    codesArr: [String]
});

const LoginCode = mongoose.model('LoginCode', codesSchema);



router.delete('/:id', (req, res) => {

    try {
        async function getArr() {
        const codeObj = await LoginCode.findById('5b368a42fb6fc021a67dbddd');

        const codesArr = codeObj.codesArr;

        return codesArr;

    }
    
    async function validateCode() {
        const codesArr = await getArr();

        const code = codesArr.find(c => {
            return c === req.params.id;
        });

        if (!code) return res.status(404).send('Code does not exist');


        codesArr.splice(codesArr.indexOf(code), 1);

        updateCode(codesArr);
    }



    function updateCode(codesArr) {

        LoginCode.findByIdAndUpdate('5b368a42fb6fc021a67dbddd', {
                $set: {
                    codesArr: codesArr
                }
            })
            .then(result => {
                if (result) return res.status(200).send('Success');
            })
            .catch(err => console.log(err));
    }


    validateCode();

    } catch (err) {
        console.log(err.message);
    }


});




module.exports = router;

