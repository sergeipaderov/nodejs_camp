const fs = require('fs');
const path = require('path');
const argv = require('yargs-parser')(process.argv.slice(2));

const folder = argv._[0];
const toFolder = argv._[1];

runApp(folder);
createNewFolder();

async function runApp(src) {
  const folders = await readDir(src);
  folders.forEach(async(item) => {
    let localFolder = path.join(src, item);
    let stats = await dirStat(localFolder);

    if (stats.isDirectory()) {
      runApp(localFolder);
    } else {
      copyFiles(item, localFolder);
    }
  });
}

function dirStat(localFolder) {
  return new Promise((resolve, reject) => {
    fs.stat(localFolder, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
}

function copiyng(file, localFolder, folderName) {
  return new Promise((resolve, reject) => {
    fs.copyFile(localFolder, path.join(__dirname, toFolder, folderName, file), err => {
      if (err) {
        reject(err);
      }
      resolve(`${file} is copied`);
    });
  });
}

async function copyFiles(file, localFolder) {
  const folderName = file.charAt(0).toUpperCase();

  if (!fs.existsSync(path.normalize(`./${toFolder}/${folderName}`))) {
    fs.mkdirSync(path.normalize(`./${toFolder}/${folderName}`));
  }
  const status = await copiyng(file, localFolder, folderName);
  console.log(status);
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
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, folders) => {
      if (err) {
        console.log(`Output directory - "${folder}" is not exist. Try again!`);
        fs.rmdirSync(path.normalize(`./${toFolder}`));
        reject(err);
        process.exit(0);
      }
      resolve(folders);
    });
  });
}

