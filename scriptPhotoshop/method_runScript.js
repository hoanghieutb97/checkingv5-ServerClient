const axios = require('axios');
const path = require('path');
const fs = require('fs');
const readJsonAndDownloadImages = require('./../downFile/readJsonAndDownloadImages');
const method_PTSrun = require('./../scriptPhotoshop/method_PTSrun');

async function fetchGLLMData(url) {
    const response = await axios.get(url);
    return response.data.map(item => ({
        ...item,
        ProductType: item.ProductType.toLowerCase().trim().replace(/ /g, '').split(","),
        variant: item.variant.toLowerCase().trim().replace(/ /g, '').split(",")
    }));
}

async function method_runScript(dataJSON, KeyAndApi, dirPath) {
    try { // tải JSON và chạy tool
//         async function DownloadFile(dataJSON) {
//             // Lấy dữ liệu từ API
//             const url = KeyAndApi.gllm;
//             const GLLM = await fetchGLLMData(url);
// //             await readJsonAndDownloadImages(GLLM, dataJSON); 
// // console.log("da tai file xong !");
//             return GLLM
//         }
        // await DownloadFile(dataJSON);
        await method_PTSrun(dataJSON, dirPath);
 



    } catch (error) {
        console.log(error);
    }
}
module.exports = method_runScript;