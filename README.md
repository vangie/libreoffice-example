# libreoffice 模板项目

该项目模板是一个基于 libreoffice 的 Word 转 PDF 工具，该项目是一个 funcraft 工程，借助 funcraft 工具进行依赖安装，上传 libreoffice 二进制文件到 NAS，并部署代码到阿里云的函数计算平台，作为一个 serverless 的 word 转换服务。

## 依赖工具

本项目是在 MacOS 下开发的，涉及到的工具是平台无关的，对于 Linux 和 Windows 桌面系统应该也同样适用。在开始本例之前请确保如下工具已经正确的安装，更新到最新版本，并进行正确的配置。

* [Docker](https://www.docker.com/)
* [Funcraft](https://github.com/alibaba/funcraft)

对于 MacOS 用户可以使用 [homebrew](https://brew.sh/) 进行安装：

```bash
brew cask install docker
brew tap vangie/formula
brew install fun
```

Windows 和 Linux 用户安装请参考：

1. https://github.com/aliyun/fun/blob/master/docs/usage/installation.md
2. https://github.com/aliyun/fcli/releases

安装好后，记得先执行 `fun config` 初始化一下配置。

## 初始化

使用 fun init 命令可以快捷地将本模板项目初始化到本地。

```bash
$ fun init vangie/libreoffice-example
```

## 安装依赖

```bash
$ fun install

Installing recursively on fun.yml

skip pulling image aliyunfc/runtime-nodejs8:build-1.6.1...
Task => [UNNAMED]
     => apt-get update (if need)
     => apt-get install -y -d -o=dir::cache=/code/.fun/tmp/install libnss3 --reinstall
     => bash -c
        for f in $(ls /code/.fun/tmp/install/archives/*.deb); do
          dpkg -x $f /code/.fun/root;
          mkdir -p /code/.fun/tmp/install/deb-control/${f%.*};
          dpkg -e $f /code/.fun/tmp/install/deb-control/${f%.*};

          if [ -f "/code/.fun/tmp/install/deb-control/${f%.*}/postinst" ]; then
            FUN_INSTALL_LOCAL=true /code/.fun/tmp/install/deb-control/${f%.*}/postinst configure;
          fi;
        done;
     => bash -c 'rm -rf /code/.fun/tmp/install/archives'
Task => [UNNAMED]
     => bash -c  'npm install --production && mkdir -p .fun/nas/auto-default/libreoffice/ && mv ./node_modules/fc-libreoffice/bin/lo.tar.br .fun/nas/auto-default/libreoffice/'
info looking for cached prebuild @ /root/.npm/_prebuilds/95f620-iltorb-v2.4.3-node-v57-linux-x64.tar.gz
http request GET https://github.com/MayhemYDG/iltorb/releases/download/v2.4.3/iltorb-v2.4.3-node-v57-linux-x64.tar.gz
http 200 https://github.com/MayhemYDG/iltorb/releases/download/v2.4.3/iltorb-v2.4.3-node-v57-linux-x64.tar.gz
info downloading to @ /root/.npm/_prebuilds/95f620-iltorb-v2.4.3-node-v57-linux-x64.tar.gz.152-11c561798275d.tmp
info renaming to @ /root/.npm/_prebuilds/95f620-iltorb-v2.4.3-node-v57-linux-x64.tar.gz
info unpacking @ /root/.npm/_prebuilds/95f620-iltorb-v2.4.3-node-v57-linux-x64.tar.gz
info unpack resolved to /code/node_modules/iltorb/build/bindings/iltorb.node
info unpack required /code/node_modules/iltorb/build/bindings/iltorb.node successfully
info install Successfully installed iltorb binary!
npm WARN libreoffice-example@1.0.0 No description
npm WARN libreoffice-example@1.0.0 No repository field.
```

## 部署

```bash
$ fun deploy
using template: template.yml
using region: cn-shanghai
using accountId: ***********4733
using accessKeyId: ***********EUz3
using timeout: 60

Waiting for service libreoffice to be deployed...
	make sure role 'aliyunfcgeneratedrole-cn-shanghai-libreoffice' is exist
	role 'aliyunfcgeneratedrole-cn-shanghai-libreoffice' is already exist
	attaching police 'AliyunECSNetworkInterfaceManagementAccess' to role: aliyunfcgeneratedrole-cn-shanghai-libreoffice
	attached police 'AliyunECSNetworkInterfaceManagementAccess' to role: aliyunfcgeneratedrole-cn-shanghai-libreoffice
	using 'VpcConfig: Auto', Fun will try to generate related vpc resources automatically
		vpc already generated, vpcId is: vpc-uf6jphcirs45lekbtw59k
		vswitch already generated, vswitchId is: vsw-uf6gmxg7cyl3dlohlck9p
		security group already generated, security group is: sg-uf6hkd156qntmzxr51h3
	generated auto VpcConfig done:  {"vpcId":"vpc-uf6jphcirs45lekbtw59k","vswitchIds":["vsw-uf6gmxg7cyl3dlohlck9p"],"securityGroupId":"sg-uf6hkd156qntmzxr51h3"}
	using 'NasConfig: Auto', Fun will try to generate related nas file system automatically
		nas file system already generated, fileSystemId is: 3f95748ba7
		nas file system mount target is already created, mountTargetDomain is: 3f95748ba7-ips53.cn-shanghai.nas.aliyuncs.com
	generated auto NasConfig done:  {"UserId":10003,"GroupId":10003,"MountPoints":[{"ServerAddr":"3f95748ba7-ips53.cn-shanghai.nas.aliyuncs.com:/libreoffice","MountDir":"/mnt/auto"}]}
	Checking if nas directories /libreoffice exists, if not, it will be created automatically
	Checking nas directories done ["/libreoffice"]
	Waiting for function word2pdf to be deployed...
		Waiting for packaging function word2pdf code...
		The function word2pdf has been packaged. A total of 1019 files files were compressed and the final size was 6.36 MB
	function word2pdf deploy success
service libreoffice deploy success
```

## 执行

```bash
$ fun invoke word2pdf
using template: template.yml
========= FC invoke Logs begin =========
FC Invoke Start RequestId: 20e7c0e4-d674-4be0-854f-bd876dc00043
load code for handler:index.handler
Error: source file could not be loaded
2019-09-17T13:57:35.716Z 20e7c0e4-d674-4be0-854f-bd876dc00043 [verbose] convert success.
FC Invoke End RequestId: 20e7c0e4-d674-4be0-854f-bd876dc00043

Duration: 4741.22 ms, Billed Duration: 4800 ms, Memory Size: 640 MB, Max Memory Used: 578.54 MB
========= FC invoke Logs end =========

FC Invoke Result:
pdf save to /tmp/example.pdf
```

PDF 文件会写入到 /tmp 目录，如果希望能看到结果，可以把文件上传到 OSS，然后从 OSS 下载下来。

## 参考阅读

1. https://github.com/awesome-fc/fc-libreoffice