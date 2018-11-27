const fs = require('fs'),
      rimraf = require('rimraf'),
      imagemin = require('imagemin'),
      imageminPngquant = require('imagemin-pngquant'),
      imageminMozjpeg = require('imagemin-mozjpeg');

const srcImgRoot = 'src/img',
      publicImgRoot = 'dist/img',
      argv = (process.argv[2] === 'top') ? '' : process.argv[2];
let arr = [''],
    fileList = fs.readdirSync(srcImgRoot).filter((file) => {
      let path = `${srcImgRoot}/${file}`;
      if(fs.statSync(path).isDirectory()) {
        fs.readdirSync(path).map((file2) => {
          if(fs.statSync(`${path}/${file2}`).isDirectory()) arr.push(`${file}/${file2}`);
        });
        return file;
      }
    });

const dirExists = (dir) => {
        try {
          fs.accessSync(dir);
          return true;
        } catch(e) {
          return false;
        }
      },
      fileDel = (dir) => {
        let path = `${publicImgRoot}/${dir}`;
        if(dirExists(path)) {
          if(dir === '') {
            fs.readdirSync(path).map((file) => {
              let f = `${path}${file}`;
              if(fs.statSync(f).isFile()) {
                rimraf.sync(f);
              }
            });
          } else {
            rimraf.sync(path);
          }
        }
      },
      imgmin = (dir) => {
        if(dir !== '') dir = `${dir}/`;
        imagemin([`src/img/${dir}*.{jpg,png,gif,svg}`], `${publicImgRoot}/${dir}`, {
          plugins: [
            imageminMozjpeg(),
            imageminPngquant(),
          ]
        }).then(files => {
          console.log(`\u001b[32m${publicImgRoot}/${dir}: ${files.length} image minified\u001b[0m`);
        });
      };

fileList = fileList.concat(arr);
if(typeof argv !== 'undefined') {
  if(fileList.indexOf(argv) < 0) {
    console.log('指定されたディレクトリは存在しません');
    return;
  }
  fileList = [argv];
}
console.log('target directory');
console.log(fileList);
fileList.forEach((i) => {
  fileDel(i);
  imgmin(i);
});

