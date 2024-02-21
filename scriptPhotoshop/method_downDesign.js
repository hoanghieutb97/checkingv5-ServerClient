const path = require('path');
const fs = require('fs').promises;
const fetchGLLMData = require("./../downFile/fetchGLLMData");

const { KeyAndApi } = require('./../constants');

const method_deleteDesign = require("./method_deleteDesign");
const method_checkFile = require("./method_checkFile");
const readJsonAndDownloadImages = require("./../downFile/readJsonAndDownloadImages");
async function method_downDesign(dataJSON) {
    var designPath = path.join(KeyAndApi.serverFile, 'design');
    if (method_deleteDesign(designPath)) { // xoa file thanh cong, bat dau tai file
        var dw = await DownloadFile(dataJSON, designPath); // tải file mới
        var LostFile = await method_checkFile(dataJSON, designPath);
        console.log("tai xong........");
        return LostFile
    }
    else
        return false


}
async function DownloadFile(dataJSON, designPath) {
    // Lấy dữ liệu từ API
    const GLLM = await fetchGLLMData();
    await readJsonAndDownloadImages(GLLM, dataJSON, designPath);
    return GLLM
}
module.exports = method_downDesign;