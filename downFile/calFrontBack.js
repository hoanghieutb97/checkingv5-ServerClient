const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra');

const downloadImage = require('./downloadImage');

async function calFrontBack(GLLM, name, link, product, variant, dateParts, downloadDirectory) {
    const sccccc = GLLM.filter(item =>
        _.intersection(item.ProductType, [product.toLowerCase().trim().replace(/ /g, '')]).length &&
        _.intersection(item.variant, [variant.toLowerCase().trim().replace(/ /g, '')]).length
    );
    var thoigian = dateParts.split(" ");
    var thoigian = thoigian[0].split("-");
    const basePath = path.join('//192.168.1.230/production', thoigian[0], thoigian[1], thoigian[2], product);
    
    const formatLink = link => typeof (link) !== "object" ? link.replace(/www\.dropbox\.com/g, 'dl.dropboxusercontent.com') : link.text.replace(/www\.dropbox\.com/g, 'dl.dropboxusercontent.com');
    // Function to process image download or copy
    async function processImage(amountFile, nameSuffix = '') {
        const imageName = `${name}${nameSuffix}.png`;
        const imagePath = path.join(basePath, imageName);
        if (!fs.existsSync(imagePath)) {
            const splitLink = formatLink(link).split(";");
            if (nameSuffix == " back" && splitLink.length > 1) {
                await downloadImage(splitLink[1], `${name}${nameSuffix}`, downloadDirectory);
                console.log(`link---- ${name}${nameSuffix}`);

            } else {
                await downloadImage(splitLink[0], `${name}${nameSuffix}`, downloadDirectory);
                console.log(`link---- ${name}${nameSuffix}`);
            }
        } else {
            async function copyFile(source, destination) {
                return new Promise((resolve, reject) => {
                    const readStream = fs.createReadStream(source);
                    const writeStream = fs.createWriteStream(destination);

                    readStream.on('error', reject);
                    writeStream.on('error', reject);
                    writeStream.on('finish', resolve);

                    readStream.pipe(writeStream);
                });
            }
            try {
                await copyFile(imagePath, path.join(downloadDirectory, imageName));
                console.log(`ip---- ${imageName}`);
            } catch (error) {
                console.error(`Error copying file: ${error}`);
            }

        }
    }
    // Handling based on amountFile

    if (sccccc[0].amountFile === "1") {
        await processImage("1");
    } else if (sccccc[0].amountFile === "2") {
        await Promise.all([processImage("2", ' front'), processImage("2", ' back')]);
    }
}

module.exports = calFrontBack;
