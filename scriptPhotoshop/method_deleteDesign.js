const path = require('path');
const fs = require('fs').promises;


async function method_deleteDesign(dirPath) {
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
    var status = await checkAndEmptyDirectory(dirPath)
    return status;
}
module.exports = method_deleteDesign; 