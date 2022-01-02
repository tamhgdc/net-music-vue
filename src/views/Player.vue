<template>
  <div :class="isPlay ? 'player start' : 'player stop'">
    <div class="bg" ref="bg"></div>
    <div>
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon name="share-o" size="18" />
        </template>
        <template #title>
          <van-notice-bar
            color="white"
            background="#00000000"
            speed="30"
            :text="n"
          />
        </template>
      </van-nav-bar>
    </div>

    <div class="needle"></div>
    <PlayerDisc :state="state" :imgSrc="imgSrc" :size="'60vw'" />
    <div ref="lrcWrap" :currIndex="currIndex" class="lyric">
      <p v-for="(t, i) in lrc.text" :key="i" v-html="t"></p>
    </div>
    <audio
      ref="s_player"
      class="s-song"
      :src="mp3url"
      autoplay
      controls
    ></audio>
  </div>
</template>

<script>
import {
  loadSongDetailAPI,
  loadSongUrlAPI,
  loadLyricAPI,
} from "../service/song";
import PlayerDisc from "../components/player/PlayerDisc.vue";
export default {
  data() {
    return {
      n: "",
      mp3url: "",
      imgSrc: "",
      state: true,
      lrc: {},
      currIndex: 0,
      timer: null,
      isPlay: true,
    };
  },
  components: {
    PlayerDisc,
  },
  async created() {
    clearInterval(this.timer);
    this.n = this.$route.params.n;

    await loadSongDetailAPI(this.$route.params.id).then((res) => {
      this.imgSrc = res.songs[0].al.picUrl;
    });
    // console.log(this.$route.params.id);
    const res = await loadSongUrlAPI(this.$route.params.id);

    // console.log(res);
    this.mp3url = res.data[0].url;

    // 解析歌词
    await loadLyricAPI(this.$route.params.id).then((lrcData) => {
      // console.log(lrcData);
      // 加载歌词
      if (!lrcData.lrc.lyric.match("纯音乐")) {
        this.lrc = this.lyricParse(lrcData.lrc.lyric);
        // 歌词翻译大于0 加载翻译歌词
        if (lrcData.tlyric.lyric.length > 0) {
          // console.log(lrcData.tlyric.lyric);
          const tlrc = this.lyricParse(lrcData.tlyric.lyric);
          // console.log(tlrc);
          this.lrc.text = this.lrc.text.map((x, i) => {
            const index = tlrc.time.indexOf(this.lrc.time[i]);

            if (index != -1) {
              // console.log(x + "<br>" + tlrc.text[index]);
              x += "<br>" + tlrc.text[index];
            }
            return x;
          });
        }
      }
    });
    this.$refs.bg.style.backgroundImage = `url(${this.imgSrc})`;
  },
  mounted() {
    this.$nextTick(() => {
      // 歌词高亮
      if (this.lrc.time) {
        this.timer = setInterval(() => {
          const arr = [...this.lrc.time].map((x) =>
            Math.abs(x - this.$refs.s_player.currentTime)
          );
          const index = arr.indexOf(Math.min(...arr));
          // console.log(arr, index);
          if (index - 1 >= 0) {
            // console.log(this.$refs);
            this.$refs.lrcWrap.scrollTop =
              this.$refs.lrcWrap.children[index - 1].offsetTop;
            this.$refs.lrcWrap.children[index - 1].style.color = "black";
            this.$refs.lrcWrap.children[index].style.color = "red";
            this.currIndex = index;
          }

          if (this.$refs.s_player.paused) {
            this.stopPlay();
          }
          if (!this.$refs.s_player.paused) {
            this.startPlay();
          }
        }, 2000);
      }
    });
  },
  updated() {},
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    startPlay() {
      this.isPlay = true;
      this.$refs.s_player.play();
    },
    stopPlay() {
      this.isPlay = false;
      this.$refs.s_player.pause();
    },
    /**
     * 歌词解析
     */
    lyricParse(lyric) {
      const arr = lyric.match(/\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g);
      return lyric.match(/\d\].*/g).reduce(
        (p, c, i) => {
          p.time.push(
            /\[|\]/g.test(arr[i])
              ? arr[i].replaceAll(/\[|\]/g, "").split(":")[0] * 60 +
                  Number(arr[i].replaceAll(/\[|\]/g, "").split(":")[1])
              : 0
          );
          p.text.push(c.replaceAll(/\d\]/g, ""));

          return p;
        },
        { time: [], text: [] }
      );
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
  },
};
</script>

<style lang="less">
.player {
  .van-notice-bar__wrap {
    justify-content: center;
  }
}
</style>
<style lang="less" scoped>
.player {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1f1;
  .bg {
    width: 110vw;
    height: 110vh;
    position: absolute;
    left: -5vw;
    top: -5vh;
    z-index: 0;
    background-size: cover;
    background-position: center;
    filter: blur(10px);
  }

  > div:nth-of-type(2) {
    width: 100vw;

    .van-nav-bar {
      background-color: transparent;
    }
    .van-notice-bar {
      align-self: center !important;
      width: 50vw;
    }
  }
  &.start {
    .needle {
      transform: rotateZ(0deg);
    }
    .img-wrap {
      animation-play-state: running;
    }
  }
  &.stop {
    .needle {
      transform: rotateZ(-20deg);
    }
    .img-wrap {
      animation-play-state: paused;
    }
  }
  .needle {
    width: 20.1vw;
    height: 40.9vw;
    background: url("../assets/needle-ab.png") no-repeat;
    background-size: contain;
    position: fixed;
    top: 14vw;
    right: 32vw;
    z-index: 2;
    transition: transform 1s;
    transform-origin: left top;
  }
  .img-wrap {
    top: 35vw;
  }
  .lyric {
    position: absolute;
    top: 85vw;
    height: 35vw;
    overflow: auto;
    position: relative;
    p {
      text-align: center;
      padding: 2vw 0;
      font-size: 4vw;
    }
  }
  .s-song {
    position: fixed;
    bottom: 0;
  }
}
</style>
