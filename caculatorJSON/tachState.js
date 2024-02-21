const { KeyAndApi } = require('./../constants');
const dirPath = KeyAndApi.serverFile;
const path = require('path');
const fs = require('fs').promises;
var tachStatePath = path.join(KeyAndApi.serverFile, 'tachState');

async function tachState(dataJSON) {
    let items = dataJSON.items;

    const groupedByState = items.reduce((acc, item) => {
        if (!acc[item.state]) {
            acc[item.state] = [];
        }
        acc[item.state].push(item);
        return acc;
    }, {});
    var allStates = Object.keys(groupedByState); // ten key cua cac mang  groupedByState


    async function checkAndEmptyDirectory(directoryPath) {
        const files = await fs.readdir(directoryPath);
        if (files.length === 0) {
            console.log('Thư mục đã trống.');
            return true;
        }
        else try {
            for (const file of files) {
                const filePath = path.join(directoryPath, file);
                await fs.unlink(filePath);
            }

            console.log('Tất cả các file trong thư mục đã được xóa.');
            return true
        } catch (err) {

            console.error('Lỗi khi xử lý thư mục:', err);
            return false
        }
    } 

    
    var status = await checkAndEmptyDirectory(tachStatePath) // true là đã xóa xong
    console.log("status................",status);

}
module.exports = tachState