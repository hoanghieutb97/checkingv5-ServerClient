const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');


async function method_PTSrun(dataJSON, dirPath) {
  
    console.log("chay pts script=======================================");
    const filePath = path.join(dirPath, 'data.json');  // Tạo đường dẫn tới file data.json trong thư mục ServerFile
    fs.writeFile(filePath, JSON.stringify(dataJSON, null, 2), (err) => {
        if (err) console.error('Error writing file:', err)
        else {
            try {
                const photoshopPath = 'C:\\Program Files\\Adobe\\Adobe Photoshop 2020\\Photoshop.exe';
                const scriptPath = '\\\\192.168.1.194\\photoshop-script-V4-ultimate\\HomeAuto.jsx';
                const command = `"${photoshopPath}" "${scriptPath}"`;

                exec(command, (err) => {  });
            } catch (error) {
                console.log("loi chay pts script", error);
            }

            // const networkPath = '\\\\192.168.1.240\\in';
            // exec(`start ${networkPath}`, (error) => {
            //     if (error) {
            //         console.error(`Error occurred: ${error}`);
            //         return;
            //     }
            //     console.log(`Thư mục ${networkPath} đã được mở.`);
            // });
        }
    });

}
module.exports = method_PTSrun