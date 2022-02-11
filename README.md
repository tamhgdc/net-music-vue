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

## 日志

### 2021 年 12 月 30 日

完成：

- 接口封装
- 登录页（两种登录方式，验证码，账号（手机/邮箱））
- 首页基本模块（自定义轮播图，推荐歌单模块，滚动菜单模块）

### 2021 年 12 月 31 日

完成：

- 歌单列表页（基础款）
- 播放器（歌词同步，可加载歌词翻译）

### 2022 年 1 月 1 日

完成：

- vuex 应用（用户信息状态全局共享）
- 仓库整理

### 2022 年 1 月 2 日

完成：

- 我的页面（基本模块实现）
- 播放器美化

待完成：

- 自定义播放器（上一曲、下一曲、顺序/乱序播放，思路：用 vuex 整全局播放器）
- 首页其他模块
- 更多功能。。。

### 2022 年 1 月 3 日

完成：

- vuex 实现全局播放器（上一曲，下一曲，暂停/播放，播放列表基础样式）
- 播放器（当前时间，整曲时间，进度条显示，进度条控制播放位置）

待完成：

- 顺序/乱序
- 播放列表高亮显示当前播放歌曲
- 播放列表选歌
- 喜欢/不喜欢
- 评论
- 首页其他模块
- 更多功能。。。

### 2022 年 1 月 4 日

完成

- 全局播放器功能优化(顺序/乱序)
- 迷你播放器组件
- 列表页播放全部

### 2022 年 1 月 5 日

完成

- 播放器功能完善
- 列表页重构

### 2022 年 1 月 6 日

完成

- 歌单和歌曲评论展示（推荐评论，热门评论，最新评论）
- 歌单列表样式完善（官方歌单样式，基础歌单样式）
- 首页（每日推荐，私人 FM）

待解决

- 评论点赞，发送评论，报错（请您联系运营商或者重新绑定号码验证~ 风险提示）

### 2022 年 1 月 7 日

完成

- 歌单广场 --- 更多页面渲染（歌单类别）--- 点击可跳转对应的歌单列表

- 歌单广场内容（精品区可筛选分类）
- 排行榜 基本完成（可直接点图标播放全部，也可跳转歌单详情页）
  - 官方榜单 判断是否包含 **ToplistType**
  - 全球榜单（通过正则过滤 语 欧美等关键字）
  - 特色榜单 判断歌单描述是否匹配 ’首个‘
  - 曲风榜单 歌单名匹配 ‘云音乐’
  - 精品歌单 排除其它已有的就是精品
  - 可以用 sort 配合 **playCount** 属性，按播放量降序或顺序排列

### 2022 年 1 月 8 日

完成

- 布局优化，
- 首页实现了专属雷达歌单和场景歌单两个模块
- 歌单广场添加了 ”官方“ 选项卡（展示官方歌单）
- 自动登录功能
- 歌单收藏/取消收藏功能
- 首页热门话题模块
- 话题页面

### 2022 年 1 月 9 日

完成

- 关注页面内容渲染(用户关注歌手或好友的动态)
- 搜索页面（根据关键词显示，综合、单曲、歌单、歌手、用户等内容）
- 搜索建议

### 2022 年 2 月 12 日

完成

- 部署至 Vercel
- 解决 首页 keep-alive 页面切换后轮播图不动 bug
- 解决 搜索框 高亮提示 导致搜索关键词带 html 标签 bug（正则表达式剔除 html 标签）
- 改善 mp3 url 获取（副作用 某些歌可能听不了）
- 结局 新方案获取链接 无法播放试听歌曲的 bug（ 不过可能还会有点卡 ）

待完成

- vuex 逻辑优化

## API

### user.js

| 函数                 | 描述         |
| -------------------- | ------------ |
| loadPrivateMsgAPI    | 获取用户私信 |
| dailySignInAPI       | 签到         |
| likeOrNotAPI(params) | 喜欢音乐     |
| logoutAPI            | 退出         |

### playlist.js

| 函数                           | 描述                       |
| ------------------------------ | -------------------------- |
| loadPlaylistAPI                | 获取推荐歌单               |
| loadPlaylistAndLimitAPI(limit) | 获取推荐歌单 默认获取 6 条 |
| loadPlaylistByIdAPI(id)        | 通过 ID 获取播放列表       |
| loadDailyRemdPlayListAPI       | 获取每日推荐歌单（需登录） |
| loadPrivateFMPlayListAPI       | 获取私人 FM 歌单（需登录） |
| loadLikePlayListAPI(did)       | 获取用户喜欢列表           |

### login.js

| 函数                  | 描述                 |
| --------------------- | -------------------- |
| loginByPhoneAPI(obj)  | 手机密码｜验证码登录 |
| sendCaptchaAPI        | 发送给验证码         |
| loginByEmailAPI (obj) | 邮箱登录             |
| getQrCodeAPI          | 获取二维码           |
| checkQrCodeAPI(key)   | 校验二维码状态       |

### homepage.js

| 函数            | 描述           |
| --------------- | -------------- |
| loadHomePageAPI | 获取发现页数据 |

### banner.js

| 函数                       | 描述        |
| -------------------------- | ----------- |
| <del>loadBannersAPI </del> | 获取 banner |

### songs.js

| 函数              | 描述             |
| ----------------- | ---------------- |
| loadSongUrlAPI    | 获取歌曲播放地址 |
| loadSongDetailAPI | 获取歌曲详情     |
| loadLyricAPI      | 获取歌词         |
