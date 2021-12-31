<template>
  <div :class="isPlay ? 'player start' : 'player stop'">
    <div class="needle"></div>
    <h2 class="s-name">{{ n }}</h2>
    <div class="img-wrap">
      <img
        :class="state ? 's-img startRotate' : 's-img stop'"
        :src="imgSrc + '?param=200y200'"
        alt=""
      />
      <div class="wrap"></div>
    </div>
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
  async created() {
    clearInterval(this.timer);
    this.n = this.$route.params.n;

    await loadSongDetailAPI(this.$route.params.id).then((res) => {
      console.log(res);
      this.imgSrc = res.songs[0].al.picUrl;
    });
    // console.log(this.$route.params.id);
    const res = await loadSongUrlAPI(this.$route.params.id);

    // console.log(res);
    this.mp3url = res.data[0].url;
    /* 解析歌词 */
    loadLyricAPI(this.$route.params.id).then((lrcData) => {
      console.log(lrcData.lrc.lyric);
      console.log(lrcData.tlyric.lyric);

      this.lrc = this.lyricParse(lrcData.lrc.lyric);
      // console.log(this.lrc);
      if (lrcData.tlyric) {
        const tlrc = this.lyricParse(lrcData.tlyric.lyric);
        console.log(tlrc);
        this.lrc.text = this.lrc.text.map((x, i) => {
          const index = tlrc.time.indexOf(this.lrc.time[i]);

          if (index != -1) {
            console.log(x + "<br>" + tlrc.text[index]);
            x += "<br>" + tlrc.text[index];
          }
          return x;
        });
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
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
  },
};
</script>

<style lang="less" scoped>
.player {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #1f1f1f;
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
    top: 3vw;
    right: 32vw;
    z-index: 2;
    transition: transform 1s;
    transform-origin: left top;
  }

  .img-wrap {
    width: 60vw;
    height: 60vw;
    position: relative;
    animation-name: rotateImg;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: 60vw;
      height: 60vw;
      border-radius: 60vw;
      background: url("../assets/disc.png") center;
      background-size: contain;
    }
    .s-img {
      width: 41vw;
      height: 41vw;
      border-radius: 40vw;
    }

    @keyframes rotateImg {
      from {
        transform: rotateZ(0);
      }
      to {
        transform: rotateZ(360deg);
      }
    }
  }
  .s-name {
    margin: 5vw 0;
    color: #cfcfcf;
    z-index: 10;
    font-size: 10vw;
  }

  .lyric {
    margin-top: 5vw;
    height: 35vw;
    overflow: auto;
    position: relative;
    p {
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
