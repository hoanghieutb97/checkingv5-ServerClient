const chokidar = require('chokidar');
const axios = require('axios');
const { KeyAndApi } = require('./../constants');
// constants.js
const path = require('path');

const filePathToWatch = path.join(KeyAndApi.serverFile, "photoshopStatus.txt");



async function check_statusPTS(localIPs) {
    console.log("khi txt thay doi ---------------------------------------------------");
    const fs = require('fs');
    const watcher = chokidar.watch(filePathToWatch, {
        // Tùy chọn có thể thêm ở đây
    });
    var dataIP = "";
    watcher.on('change', (path) => {
        console.log(`File ${path} đã thay đổi!`);

        // Đọc nội dung của file khi nó thay đổi
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(`Lỗi khi đọc nội dung của file: ${err}`);
                return;
            }

            console.log('Nội dung của file:', data);
            var { state, err, cardId } = JSON.parse(data);


            const response = axios.post(`${KeyAndApi.serverURL}Ipclient`, { ip: localIPs, state: state, err: err, cardId: cardId });


            // Thực hiện các hành động khác bạn muốn khi file thay đổi ở đây
        });
    });

}

async function getStatusPTS_ONE() {
    const fs = require('fs').promises;
    console.log("filePathToWatch.................", filePathToWatch);
    // const filePathToWatch = 'C:\\Users\\Admin\\Desktop\\ServerFile\\photoshopStatus.txt';

    try {
        const data = await fs.readFile(filePathToWatch, 'utf8');

        return JSON.parse(data);
    } catch (err) {
        console.error(`Lỗi khi đọc nội dung của file: ${err}`);
        throw err;
    }
}


module.exports = { check_statusPTS, getStatusPTS_ONE };