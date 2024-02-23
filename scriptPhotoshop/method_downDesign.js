const path = require('path');
const fs = require('fs').promises;
const fetchGLLMData = require("./../downFile/fetchGLLMData");

const { KeyAndApi } = require('./../constants');

const method_deleteDesign = require("./method_deleteDesign");
const method_checkFile = require("./method_checkFile");
const readJsonAndDownloadImages = require("./../downFile/readJsonAndDownloadImages");
async function method_downDesign(dataJSON, GLLM) {
    var designPath = path.join(KeyAndApi.serverFile, 'design');
    if (method_deleteDesign(designPath)) { // xoa file thanh cong, bat dau tai file


        await readJsonAndDownloadImages(GLLM, dataJSON, designPath);
        var LostFile = await method_checkFile(dataJSON, designPath);

        return LostFile
    }
    else {
        console.log(" loi khi xoa file design cu---------");
        return false
    }
}
module.exports = method_downDesign;