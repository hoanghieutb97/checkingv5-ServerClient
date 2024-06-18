const { exec } = require('child_process');

function check_awaitPTS() {
    try {
        
        const photoshopPath = 'C:/Program Files/Adobe/Adobe Photoshop 2020/Photoshop.exe';
        const scriptPath = '//192.168.1.194/photoshop-script-V4-ultimate/checkAwait.jsx';
        const command = `"${photoshopPath}" "${scriptPath}"`;
         exec(command, (err) => { })
         
    } catch (error) {
        console.log(error);
    }

}
module.exports = check_awaitPTS;