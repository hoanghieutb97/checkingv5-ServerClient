const fs = require('fs');
const path = require('path');


async function method_checkFile(dataJSON, designPath) {
    var items = dataJSON.items;
    const files = fs.readdirSync(designPath).map(file => path.basename(file, path.extname(file)).toLocaleLowerCase());
    // console.log('Các file trong thư mục:', dataJSON);



    const checkMissingSKUs = (items, files) => {
        // Xử lý và kiểm tra từng item trong sheet


        return items.map(item => {
            let skuNormalized = item.sku.toLowerCase();
            let hasSKU = files.includes(skuNormalized);

            // Kiểm tra và xử lý cho các trường hợp có nhiều hơn một file cho mỗi SKU
            if (item.amountFile === "2") {
                let hasSkuFront = files.includes(skuNormalized + " front");
                let hasSkuBack = files.includes(skuNormalized + " back");
                return { ...item, hasSkuFront, hasSkuBack };
            }

            // Trả về item đã được cập nhật trạng thái SKU
            return { ...item, hasSKU };
        })
            // Lọc và chỉ giữ lại những items mất SKU
            .filter(item => item.amountFile === "1" ? !item.hasSKU : !item.hasSkuFront || !item.hasSkuBack);
    }
    let lostSheet = checkMissingSKUs(items, files);
    if (lostSheet.length == 0) return true
    return false
}
module.exports = method_checkFile;