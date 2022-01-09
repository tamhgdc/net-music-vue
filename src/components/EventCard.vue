<template>
  <div class="topic-comment-card">
    <div class="left">
      <van-image
        width="12vw"
        height="12vw"
        round
        fit="contain"
        :src="e.user.avatarUrl"
      />
    </div>
    <!-- 右侧 -->
    <div class="right">
      <!-- 头部 -->
      <div class="header">
        <div>
          <span class="usr">{{ e.user.nickname }}</span>
        </div>
        <span class="time">{{ e.eventTime | timeFormat }}</span>
      </div>

      <!-- 内容 -->
      <div class="content">
        <!-- 信息 -->
        <div class="msg" v-html="msg"></div>

        <!-- 图片 -->
        <div v-if="e.pics.length > 1" class="pics">
          <div class="wrap">
            <img
              v-for="pic in e.pics"
              :key="pic.squareUrl"
              :src="pic.squareUrl"
              alt=""
              @click="showBigImg(pic.originUrl)"
            />
          </div>
        </div>
        <div
          v-else-if="e.pics.length == 1 && e.pics[0] != undefined"
          class="pic"
        >
          <van-image
            @click="showBigImg(e.pics[0].originUrl)"
            width="100%"
            height="100%"
            :src="e.pics[0].squareUrl"
          />
        </div>

        <!-- 歌曲 -->
        <div v-if="e.content.song" class="song">
          <div class="cover" @click="play(e.content.song.id)">
            <img :src="e.content.song.album.picUrl" alt="" />
            <img src="../assets/play.png" alt="" />
          </div>
          <div class="info">
            <div class="name van-ellipsis">{{ e.content.song.album.name }}</div>
            <div class="artists van-ellipsis">
              {{ e.content.song.album.artists | artistsFlat }}
            </div>
          </div>
        </div>

        <!-- 状态 -->
        <TopicOperate :e="e" />
      </div>
    </div>
  </div>
</template>

<script>
import TopicOperate from "./topic/TopicOperate.vue";
import { mapActions } from "vuex";
import { ImagePreview } from "vant";
export default {
  props: ["e"],

  created() {
    console.log(JSON.parse(this.e.json));
  },
  methods: {
    showBigImg(src) {
      ImagePreview([src]);
    },
    play(id) {
      this.playById(id);
      this.$router.push({
        name: "Player",
      });
    },
    ...mapActions("player", ["playById"]),
  },
  computed: {
    msg() {
      return this.e.content.msg

        .replace(/(#.+# )|(#.+#)/g, "<span style=' color: #527ca9;'>$&</span>")
        .replace(/\n/g, "<br>");
    },
  },
  filters: {
    artistsFlat(v) {
      return v.map((x) => x.name).join("/");
    },
    timeFormat(v) {
      const data = new Date(v);
      return data.getFullYear() + "-" + data.getMonth() + "-" + data.getDate();
    },
  },
  components: {
    TopicOperate,
  },
};
</script>

<style lang="less" scoped>
@main: #527ca9;
.topic-comment-card {
  padding: 5vw 0 0;
  display: flex;

  .left {
  }
  .right {
    width: 80%;
    padding-left: 2vw;
    .header {
      .usr {
        color: @main;
      }
      .time {
        color: #7b7b7b;
        font-size: 3.5vw;
      }
    }

    .content {
      padding: 2vw 0 0;
      .msg {
        .tag {
          color: #527ca9;
        }
      }

      .pics {
        border-radius: 5vw;
        overflow: hidden;
        .wrap {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 1vw;
          row-gap: 1vw;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .pic {
        width: 100%;
        border-radius: 5vw;
        overflow: hidden;
      }
      .song {
        width: 100;
        padding: 2vw;
        margin: 2vw 0;
        background-color: #f2f2f2;
        border-radius: 2vw;
        display: flex;
        .cover {
          position: relative;
          height: 12vw;

          img {
            position: absolute;
            left: 0;
            top: 0;
            height: 12vw;
            width: 12vw;
            border-radius: 2vw;
          }
          img:nth-of-type(2) {
            height: 5vw;
            width: 5vw;
            left: 4vw;
            top: 4vw;
          }
        }
        .info {
          padding-left: 14vw;
          width: 50vw;
          .name {
            color: #313131;
          }
          .artists {
            color: #7b7b7b;
            font-size: 3vw;
            margin-top: 2vw;
          }
        }
      }
    }
  }
}
</style>
