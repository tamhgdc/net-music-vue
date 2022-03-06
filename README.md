# net-music-vue

## 运行

### 服务端部署

服务端使用 [Binaryify/NeteaseCloudMusicApi: 网易云音乐 Node.js API service (github.com)](https://github.com/Binaryify/NeteaseCloudMusicApi)

#### 1. 安装

```bash
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
npm i
```

#### 2. 运行

```bash
node app.js
```

#### 3. 也可以使用在线服务器

只需修改一下 src/utils/request.js 中的 baseURL

```js
https://netease-cloud-music-api-mocha-seven.vercel.app/
```

### 项目部署

#### 1.安装

```BASH
git clone git@gitee.com:convert_to/net-music-vue.git # 克隆项目到本地
npm i # 安装依赖
```

#### 2.运行

```bash
npm run serve # 运行
```
