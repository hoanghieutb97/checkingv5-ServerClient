const axios = require('axios');
const path = require('path');
const fs = require('fs');

const method_PTSrun = require('./../scriptPhotoshop/method_PTSrun');


async function method_runScript(dataJSON, KeyAndApi, dirPath) {
    try {
       
        await method_PTSrun(dataJSON, dirPath);




    } catch (error) {
        console.log(error);
    }
}
module.exports = method_runScript;