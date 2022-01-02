<template>
  <div class="mine-fav-music">
    <div>
      <router-link to="/">
        <div class="img-wrap">
          <img :src="isLogin ? likePlayList[0].al.picUrl : null" />
          <div>
            <van-icon class="icon" name="like"> </van-icon>
          </div>
        </div>
        <div class="text-wrap">
          <p>我喜欢的音乐</p>
          <p><span v-text="isLogin ? likePlayList.length : 0"></span>首</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["isLogin", "likePlayList"]),
  },
};
</script>

<style lang="less" scoped>
.mine-fav-music {
  a {
    display: flex;
    height: 15vw;

    .img-wrap {
      width: 15vw;
      height: 15vw;
      border-radius: 3vw;
      position: relative;
      display: flex;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      .icon {
        font-size: 8vw;
        color: white;
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 15vw;
        height: 15vw;
        background-color: #919191;
      }
    }
    .text-wrap {
      padding-left: 3vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p:nth-of-type(1) {
        font-size: 5vw;
        color: @black;
      }
      p:nth-of-type(2) {
        color: @gray-6;
      }
    }
  }
}
</style>
