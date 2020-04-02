# Webpack 配置过程中可能出现的问题

### 环境变量

#### package.json 中配置环境变量，windows 系统出错
在Mac上，可以在`package.json`中配置：

```JSON
"scripts": {
  "build"："NODE_ENV=production && ..."
}
```

Windows 系统报错

#### 解决方法
安装 `cross-env` 模块

```JSON
"scripts": {
  "build"："cross-env NODE_ENV=production && ..."
}
```