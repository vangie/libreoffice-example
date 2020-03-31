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

经过测试 libreoffice 在 MacOS 本地 Docker 环境里无法运行，可能和 Linux 的 kernel 版本有关，所以本例跳过了 fun local invoke，直接 deploy 到云端运行。

```bash
$ fun deploy
```

## 执行

### 调用 nodejs8 版本

```bash
$ fun invoke word2pdf-nodejs8
using template: template.yml
========= FC invoke Logs begin =========
FC Invoke Start RequestId: 9f68ec8b-a1ca-4fab-a605-e5414a878c7e
load code for handler:index.handler
2019-10-14T08:20:52.559Z 9f68ec8b-a1ca-4fab-a605-e5414a878c7e [verbose] convert /tmp/example.docx -> /tmp/example.pdf using filter : writer_pdf_Export

FC Invoke End RequestId: 9f68ec8b-a1ca-4fab-a605-e5414a878c7e

Duration: 3397.91 ms, Billed Duration: 3400 ms, Memory Size: 640 MB, Max Memory Used: 203.46 MB
========= FC invoke Logs end =========

FC Invoke Result:
http://vangie-test.oss-cn-shanghai.aliyuncs.com/example.pdf
```

### 调用 python3 版本

```bash
$ fun invoke word2pdf-python3
using template: template.yml
========= FC invoke Logs begin =========
FC Invoke Start RequestId: 4bbb507d-1f57-4ca1-a877-4ce4d9096d4d
convert /tmp/example.docx -> /tmp/example.pdf using filter : writer_pdf_Export
FC Invoke End RequestId: 4bbb507d-1f57-4ca1-a877-4ce4d9096d4d

Duration: 1855.37 ms, Billed Duration: 1900 ms, Memory Size: 640 MB, Max Memory Used: 67.22 MB
========= FC invoke Logs end =========

FC Invoke Result:
upload to oss success, the url is http://vangie-test.oss-cn-shanghai.aliyuncs.com/example.pdf?security-token=CAISmwJ1q6Ft5B2yfSjIr4%2BHJvjBgI9I%2F6CEM1D1oEMFf7dD16D61Tz2IHpFfnFsBukftvU3nW5U5%2FYYlqZdVplOWU3Da%2BB364xK7Q757QoRDHjwv9I%2Bk5SANTW5KXyShb3%2FAYjQSNfaZY3eCTTtnTNyxr3XbCirW0ffX7SClZ9gaKZ8PGD6F00kYu1bPQx%2FssQXGGLMPPK2SH7Qj3HXEVBjt3gX6wo9y9zmnZDFtUKD0AymkbRJ%2BN%2BqGPX%2BMZkwZqUYesyuwel7epDG1CNt8BVQ%2FM909vceqG2f4o7EWgEAu0zYb7uEqMcqJQt4d7U8FaVLof7xj%2FRkt%2BDJkID6jh1LeOFSVSvcQ4avhc%2FFEvmkMdg3dL32K8pAU1cDq3ieGoABAiBcEZ5ZzqlsXeIfiEKFAsIlNr3yYTflfBp%2FOr%2BktvB54GISQyX%2BzAlhBeq1IkBl3pudBcz%2FSsluxyR9kySjvx07UU4Zdh5dS%2BaNrDimZVvKxxYZaMtA%2FFqetiO1NZ6iE6GPOBe0lb5Hg%2FRHUrSaVK5JgQR%2B0JSvy%2BEUcw%2B44jE%3D&OSSAccessKeyId=STS.NL2mBumPiHbo1vDDCPs8o8eQ7&Expires=1571041909&Signature=kfDwm6JRZ2odtXU5IML3ETQjHds%3D
```

通过最后输出的 OSS 临时链接访问 pdf 文件，临时链接的有效期 10 分钟。

### 调用 custom 版本

```bash
$fun invoke word2pdf-custom
using template: template.yml
========= FC invoke Logs begin =========
Not all function logs are available, please retry
FC Invoke End RequestId: d1e1be15-afca-48d8-a97c-8f55fd016567
Duration: 1955.96 ms, Billed Duration: 2000 ms, Memory Size: 640 MB, Max Memory Used: 55.70 MB
========= FC invoke Logs end =========

FC Invoke Result:
example.docx
example.pdf
hsperfdata_root
pear
```

## 参考阅读

1. [五分钟上线——函数计算 Word 转 PDF 云服务](https://www.atatech.org/articles/126345)
2. [手把手教您将 libreoffice 移植到函数计算平台](https://www.atatech.org/articles/126379)
3. https://github.com/awesome-fc/fc-libreoffice
4. [模板项目](https://github.com/vangie/libreoffice-example)
5. [Funcraft](https://github.com/alibaba/funcraft)
6. [Aliyun Serverless VSCode Extension](https://github.com/alibaba/serverless-vscode)
