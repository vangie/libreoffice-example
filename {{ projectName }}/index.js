const { convertFileToPDF } = require('fc-libreoffice');
const { execSync } = require('child_process');

const binPath = '/mnt/auto/lo.tar.br';


module.exports.handler = (event, context, callback) => {
  execSync('cp -f /code/example.docx /tmp/example.docx');

  convertFileToPDF('/tmp/example.docx', binPath)
      .then(() => {
          console.log('convert success.');
          callback(null, "pdf save to /tmp/example.pdf");
      })
      .catch((e) => {
          console.log('convert fail.');
          callback(e, 'fail');
      });

};