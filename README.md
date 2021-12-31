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
