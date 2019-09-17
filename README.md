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
```

## 部署

```bash
$ fun deploy
```

## 执行

```bash
$ fun invoke word2pdf
```

PDF 文件会写入到 /tmp 目录，如果希望能看到结果，可以把文件上传到 OSS，然后从 OSS 下载下来。

## 参考阅读

1. https://github.com/awesome-fc/fc-libreoffice