# manhua

## Project setup
```bash
# 安装依赖
npm install

# 依赖安装有冲突或者报错可以尝试使用
npm install  --legacy-peer-deps

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

#运行不了的话也可能是创建项目的node.js版本太高或太低

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

### Compiles and hot-reloads for development

#运行项目
npm run serve

### Compiles and minifies for production

# 项目打包
npm run build

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```

## 在本地运行你vue打包的的dist文件
```bash
### 打开终端或命令行窗口，使用以下命令安装http-server
 npm install -g http-server

### 进入dist目录，使用以下命令启动http-server
 cd dist
 http-server
 git remote add github https://github.com/zzb-666-q/manhua.git
```
