
const fs = require('fs-extra');



const DefaultLink = '//192.168.1.194/design';
const calFrontBack = require('./calFrontBack');

async function readExcelAndDownloadImages(GLLM, sheet, NameFolder) {
    try {
        const worksheet = sheet;
        var downloadDirectory = DefaultLink + "/" + NameFolder
        if (!fs.existsSync(downloadDirectory)) {
            fs.mkdirSync(downloadDirectory);
        }
        async function processRows() {
            ///////////////////////////////////////////////////////////////////////
            try {


                for (let rowNumber = 3; rowNumber <= worksheet.rowCount; rowNumber++) {
                    const row = worksheet.getRow(rowNumber);
                    const [name, link, product, variant] = ['C', 'I', 'F', 'E'].map(col => row.getCell(col).value);
                    const dateParts = row.getCell('J').value.split(" ")[0].split("-");
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


module.exports = readExcelAndDownloadImages;