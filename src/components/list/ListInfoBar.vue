<template>
  <div class="list-info-bar">
    <div class="circle">
      <nav v-if="detail != undefined">
        <div class="item">
          <van-icon
            @click="subscribe"
            size="6vw"
            :name="detail.subscribed ? 'passed' : 'add-o'"
          />
          <span>{{ detail.subscribedCount | countFormat }}</span>
        </div>
        |
        <div
          class="item"
          @click="
            $router.push({
              name: 'Comment',
              params: {
                id: detail.id,
                type: 2,
              },
            })
          "
        >
          <van-icon size="6vw" name="comment-o" />
          <span>{{ detail.commentCount | countFormat }}</span>
        </div>
        |
        <div class="item">
          <van-icon size="5vw" name="share-o" />
          <span>{{ detail.shareCount | countFormat }}</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { subscribeAPI } from "../../service/playlist";
import { mapState } from "vuex";
export default {
  props: ["detail"],
  methods: {
    subscribe() {
      const type = this.detail.subscribed ? 2 : 1;
      if (!this.isLogin) {
        Toast.fail("请登录");
        return;
      }
      subscribeAPI({
        id: this.detail.id,
        t: type,
      }).then((res) => {
        console.log(res);

        if (type == 1 && res.code == 200) {
          Toast.success("收藏成功");
          this.detail.subscribed = true;
        }
        if (type == 2 && res.code == 200) {
          Dialog.confirm({ message: "确定不再收藏此歌单吗？" }).then(() => {
            this.detail.subscribed = false;
          });
        }
      });
    },
  },
  computed: {
    ...mapState("user", ["isLogin"]),
  },
  filters: {
    countFormat(v) {
      return v < 10000
        ? v
        : v < 100000000
        ? parseInt(v / 1000) / 10 + "万"
        : parseInt(v / 10000000) / 10 + "亿";
    },
  },
};
</script>

<style lang="less" scoped>
.list-info-bar {
  position: relative;
  overflow: hidden;
  height: 10vw;
  border-radius: 10vw;
  width: 70vw;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0.5vw 0.2vw 0 #00000030;
  cursor: pointer;
  nav {
    height: 10vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 2vw;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        margin-left: 1vw;
      }
    }
  }
}
</style>
