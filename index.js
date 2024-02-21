

// //////////////////////////////////////////////////////////////////////////
// const Excel = require('exceljs');
const axios = require('axios');
const cors = require('cors');
const os = require('os');
const express = require('express');
const app = express();
const port = 4444;
app.use(cors()); // Sử dụng CORS middleware
// app.use(express.json());

const method_runScript = require("./scriptPhotoshop/method_runScript");

const method_downDesign = require("./scriptPhotoshop/method_downDesign");
const check_awaitPTS = require("./scriptPhotoshop/check_awaitPTS");
const checkStates = require("./caculatorJSON/checkStates");
const tachState = require("./caculatorJSON/tachState");
const { getStatusPTS_ONE, check_statusPTS } = require("./scriptPhotoshop/check_statusPTS");

app.use(express.json({ limit: '50mb' }));  // Tăng giới hạn lên 50mb
const { KeyAndApi } = require('./constants');


const dirPath = KeyAndApi.serverFile;


async function sendIP() {
    console.log("khi server khoi dong ---------------------------------------------------");

    var { state, err, cardId } = await getStatusPTS_ONE()

    try {
        async function getLocalIP() {
            const interfaces = os.networkInterfaces();

            const addresses = [];
            for (const k in interfaces) {
                for (const k2 in interfaces[k]) {
                    const address = interfaces[k][k2];
                    if (address.family === 'IPv4' && !address.internal) {

                        addresses.push(address.address);
                    }
                }
            }

            return addresses;
        }

        const localIPs = await getLocalIP();
        console.log("lorem-------------", { ip: localIPs, state: state, err: err, cardId: cardId });
        const response = await axios.post('http://192.168.1.194:3010/Ipclient', { ip: localIPs, state: state, err: err, cardId: cardId })

        console.log("res__Ipclient:", response.data); // Log phản hồi từ Server 2
    } catch (error) {
        console.log("3errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
        console.error('Lỗi hoặc không nhận được phản hồi, thử lại...');
        setTimeout(sendIP, 5000); // Thử lại sau 5 giây
    }
    setTimeout(sendIP, 1800000); // Thử lại sau 30 phút mặc định
};

async function checkTxtPts() {

    function getLocalIP() {
        const interfaces = os.networkInterfaces();
        const addresses = [];
        for (const k in interfaces) {
            for (const k2 in interfaces[k]) {
                const address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
        return addresses;
    }

    const localIPs = getLocalIP();
    await check_statusPTS(localIPs);

}
// Gọi hàm khi Server 1 khởi động
sendIP(); // req lần đầu khi khởi động server
checkTxtPts()// req  khi .txt thay đổi


app.post('/get-ip', (req, res) => {  // lay ip cua pc hien tai
    function getLocalIP() {
        const interfaces = os.networkInterfaces();
        const addresses = [];
        for (const k in interfaces) {
            for (const k2 in interfaces[k]) {
                const address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
        return addresses;
    }

    const localIPs = getLocalIP();
    console.log(localIPs);

    res.send({ ip: localIPs[0] });
});




app.post('/photoshopScriptTrello', async (req, res) => {
    
    const dataJSON = req.body;

    var statusDownFile = await method_downDesign(dataJSON, KeyAndApi, dirPath);
    if (statusDownFile) {
        method_runScript(dataJSON, KeyAndApi, dirPath);
        return res.status(200).send('Success chay tool oke');
    }
    else {
        ///////////////////////////////// cac phan code xu ly them
        return res.status(200).send('loi khi tai file Client');

    }

    // console.log("111111a", dataJSON);

});

app.get('/checkAwaitPhotoshop', (req, res) => {

    check_awaitPTS();

    res.status(200).send('Success await pts');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




