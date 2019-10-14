# LibreOffice 模板项目

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

**备注: 本文介绍的技巧需要 Fun 版本大于等于 3.0.6 。**

## 初始化

使用 fun init 命令可以快捷地将本模板项目初始化到本地。

```bash
$ fun init vangie/libreoffice-example
```

**修改 template.yml 文件，将 OSS_REGION 和 OSS_BUCKET 改为您账号的 OSS 配置。**

## 安装依赖


```bash
$ fun install
```

## 同步文件到 NAS

同步本地 NAS 目录 .fun/nas/auto-default/libreoffice/ 下的文件到 NAS 网盘

```bash
$ fun nas sync
```

## 部署

```bash
$ fun deploy
```

## 执行

```bash
$ fun invoke word2pdf-nodejs8
using template: .fun/build/artifacts/template.yml
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

```bash
$ fun invoke word2pdf-python3
using template: .fun/build/artifacts/template.yml
========= FC invoke Logs begin =========
FC Invoke Start RequestId: 3e4e5ca5-55aa-4361-88e3-184b17d1b33e
convert /tmp/example.docx -> /tmp/example.pdf using filter : writer_pdf_Export
FC Invoke End RequestId: 3e4e5ca5-55aa-4361-88e3-184b17d1b33e

Duration: 3662.16 ms, Billed Duration: 3700 ms, Memory Size: 1024 MB, Max Memory Used: 222.48 MB
========= FC invoke Logs end =========

FC Invoke Result:
upload to oss success, the url is http://vangie-test.oss-cn-shanghai.aliyuncs.com/example.pdf?security-token=CAISmwJ1q6Ft5B2yfSjIr4%2FPIe%2F8ir1n3oylSBHcjzJkT7Zeh4%2FquDz2IHpFfnFsBukftvU3nW5U5%2FYYlqZdVplOWU3Da%2BB364xK7Q75hxoyPX%2Fwv9I%2Bk5SANTW5KXyShb3%2FAYjQSNfaZY3eCTTtnTNyxr3XbCirW0ffX7SClZ9gaKZ8PGD6F00kYu1bPQx%2FssQXGGLMPPK2SH7Qj3HXEVBjt3gX6wo9y9zmnZDFtUKD0AymkbRJ%2BN%2BqGPX%2BMZkwZqUYesyuwel7epDG1CNt8BVQ%2FM909vceqG2f4o7EWgEAu0zYb7uEqMcqJQt4d7U8FaVLof7xj%2FRkt%2BDJkID6jh1LeOFSVSvcQ4avhc%2FFEvmkMdg3dL32K8pAU1cDq3ieGoABYo1HN8jkjweNasamY%2B0io9C2ovRum9qV50adS4RvGZhpLiZBaui%2F9J9v8iQq8EXkKkkTiURu7Qy6dyKzca4M6QrS51CgcJ4I%2Fel8KkzquqGrgDu0WXaQLVecwgD7bUjC11IK%2BExfiXMivAQRmTxdJUIbvzLW30a0M89wHpRV3EM%3D&OSSAccessKeyId=STS.NLzjUHgbFiNNJ7mk21C9rhJAZ&Expires=1570803861&Signature=gjwAOqHYNIpqOSYIUaXIFLcGxS8%3D
```

通过最后输出的 OSS 临时链接访问 pdf 文件，临时链接的有效期 10 分钟。

## 参考阅读

1. https://github.com/awesome-fc/fc-libreoffice
2. [Funcraft](https://github.com/alibaba/funcraft)
3. [Aliyun Serverless VSCode Extension](https://github.com/alibaba/serverless-vscode)
