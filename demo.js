
const filePathToWatch = 'C:\\Users\\Admin\\Desktop\\ServerFile\\photoshopStatus.txt';

const chokidar = require('chokidar');
const fs = require('fs');


const watcher = chokidar.watch(filePathToWatch, {
  // Tùy chọn có thể thêm ở đây
});

watcher.on('change', (path) => {
  console.log(`File ${path} đã thay đổi!`);

  // Đọc nội dung của file khi nó thay đổi
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Lỗi khi đọc nội dung của file: ${err}`);
      return;
    }

    // console.log('Nội dung của file:');
    // console.log(data);

    // Thực hiện các hành động khác bạn muốn khi file thay đổi ở đây
  });
});
