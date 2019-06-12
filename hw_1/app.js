const fs = require('fs');
const path = require('path');
const argv = require('yargs-parser')(process.argv.slice(2));

const folder = argv._[0];
const toFolder = argv._[1];

readDir(folder, 0);
createNewFolder();

function copyFiles(file, localFolder) {
  const folderName = file.charAt(0).toUpperCase();

  if (!fs.existsSync(path.normalize(`./${toFolder}/${folderName}`))) {
    fs.mkdirSync(path.normalize(`./${toFolder}/${folderName}`));
  }
  fs.copyFile(localFolder, path.join(__dirname, toFolder, folderName, file), err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`${file} is copied`);
  });
}

function createNewFolder() {
  if (!fs.existsSync(path.normalize(`./${toFolder}`))) {
    fs.mkdirSync(path.normalize(`./${toFolder}`));
    console.log(`Created new folder: ${toFolder}`);
  } else {
    console.log(`Directory "${toFolder}" already exist. Try another name for folder`);
    process.exit(0);
  }
}

function readDir(folder) {
  fs.readdir(folder, (err, folders) => {
    if (err) {
      console.log(`Output directory - "${folder}" is not exist. Try again!`);
      fs.rmdirSync(path.normalize(`./${toFolder}`));
      process.exit(0);
    }
    folders.forEach(item => {
      let localFolder = path.join(folder, item);
      fs.stat(localFolder, (err, stats) => {
        if (err) {
          console.log(err.message);
          return;
        }
        if (stats.isDirectory()) {
          readDir(localFolder);
        } else {
          copyFiles(item, localFolder);
        }
      });
    });
  });
}
