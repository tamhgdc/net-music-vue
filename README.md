# net-music-vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## api

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

- 评论展示（推荐评论，热门评论，最新评论）
