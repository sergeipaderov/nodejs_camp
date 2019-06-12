const fs = require('fs');
const path = require('path');
const argv = require('yargs-parser')(process.argv.slice(2));

const folder = fs.existsSync(path.normalize(`/home/serg/dev/nodejs_camp/hw_1/${argv._[0]}`)) ?
  `./${argv._[0]}` : console.log('Initial folder is not exist');
const toFolder = argv._[1];

readDir(folder, 0);
createNewFolder();

function copyFiles(file, localFolder) {
  const folderName = file.charAt(0).toUpperCase();

  if (!fs.existsSync(path.normalize(`/home/serg/dev/nodejs_camp/hw_1/${toFolder}/${folderName}`))) {
    fs.mkdirSync(path.normalize(`/home/serg/dev/nodejs_camp/hw_1/${toFolder}/${folderName}`));
    console.log(`Created ${folderName}`);
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
  if (!fs.existsSync(path.normalize(`/home/serg/dev/nodejs_camp/hw_1/${toFolder}`))) {
    fs.mkdirSync(path.normalize(`/home/serg/dev/nodejs_camp/hw_1/${toFolder}`));
    console.log('Created new folder');
  }
}

function readDir(folder) {
  fs.readdir(folder, (err, folders) => {
    if (err) {
      console.log(err.message);
      return;
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
