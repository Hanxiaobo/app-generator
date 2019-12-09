# swagger-compile

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 使用方法

``` bash

在项目中安装 app-config-generator

配置命令：swagger: app-config-generator http://39.107.204.205:20000/*-api/v2/api-docs

命令窗口运行命令
npm run swagger merchant-api admin/findAdminInfoByAdminId ajax myPath

myPath可指定生成文件路径，若为空
成功后，生成src/appConfig/merchant-api/admin/findAdminInfoByAdminId/ajax.json文件

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
