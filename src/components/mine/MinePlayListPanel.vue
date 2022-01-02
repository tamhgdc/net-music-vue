<template>
  <div>
    <van-tabs v-model="activeName">
      <van-tab title="标签 1" name="a">
        <div class="list-item" v-for="list in playlist" :key="list.id">
          <div>
            <img :src="list.coverImgUrl" alt="" />
          </div>
          <div>
            <p>{{ list.name }}</p>
            <p></p>
          </div>
        </div>
      </van-tab>
      <van-tab title="标签 2" name="b"> </van-tab>
      <van-tab title="标签 3" name="c"> </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "a",
    };
  },
  computed: {
    ...mapState("user", ["isLogin", "playlist"]),
  },
};
</script>

<style></style>
