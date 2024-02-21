
const fs = require('fs-extra');
const calFrontBack = require('./calFrontBack');
const path = require('path');
async function readJsonAndDownloadImages(GLLM, json,pathFolder) {
    
    let items = json.items;
    try {

        const downloadDirectory = pathFolder;
        async function processRows() {
            ///////////////////////////////////////////////////////////////////////
            try {
                for (let i = 0; i < items.length; i++) {
                    let product = items[i].product;
                    let variant = items[i].variant;
                    let dateParts = items[i].dateItem;
                    let name = items[i].sku;
                    let link = items[i].urlDesign;
                    await calFrontBack(GLLM, name, link, product, variant, dateParts, downloadDirectory);

                }
            } catch (error) {
                console.log(error);
            }
            ///////////////////////////////////////////////////////////////////////
        }
        await processRows();
    } catch (err) {
        console.error('Error reading Excel file:', err);
    }
}


module.exports = readJsonAndDownloadImages;