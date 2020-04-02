const OSS = require('ali-oss').Wrapper;
const { execSync } = require('child_process');

const binPath = '/mnt/auto/instdir/program/soffice';
const defaultArgs = ["--headless", "--invisible", "--nodefault", "--view", "--nolockcheck", "--nologo", "--norestore"];

module.exports.handler = (event, context, callback) => {
  const filePath = '/tmp/example.docx';

  execSync(`cp -f /code/example.docx ${filePath}`);

  const cmd = `${binPath} ${defaultArgs.join(' ')} --convert-to pdf --outdir /tmp ${filePath}`;

  const logs = execSync(cmd, { cwd: '/tmp' });

  execSync(`rm ${filePath}`, { cwd: '/tmp'});

  console.log(logs.toString('utf8'));

  uploadToOss(context, '/tmp/example.pdf').then((url) => {
    callback(null, url);
  }).catch((e) => {
    callback(e);
  })
};

async function uploadToOss(context, file) {
    let client = new OSS({
        region: `oss-${process.env.OSS_REGION || context.region}`,
        accessKeyId: context.credentials.accessKeyId,
        accessKeySecret: context.credentials.accessKeySecret,
        stsToken: context.credentials.securityToken,
        bucket: process.env.OSS_BUCKET
    });
  
    let result = await client.put('example.pdf', file);
    await client.putACL('example.pdf', 'public-read');
  
    return result.url.replace('-internal.aliyuncs.com/', '.aliyuncs.com/');
}