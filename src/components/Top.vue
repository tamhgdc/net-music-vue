<template>
  <div class="top">
    <template v-if="mode">
      <SidePopup />
      <SearchBox />
      <van-icon name="add" size="24" color="#fe3a3b" />
    </template>
    <template v-if="!mode">
      <van-tabs @change="change" v-model="active" animated swipeable sticky>
        <template #nav-left>
          <div class="left"><SidePopup /></div>
        </template>
        <van-tab v-for="o in option" :title="o" :key="o"> </van-tab>
        <template #nav-right>
          <div class="right">
            <van-icon name="add" size="24" color="#fe3a3b" />
          </div>
        </template>
      </van-tabs>
    </template>
  </div>
</template>

<script>
import SidePopup from "./SidePopup.vue";
import SearchBox from "./SearchBox.vue";

export default {
  props: {
    mode: {
      type: Boolean,
      default: true,
    },
    option: {
      type: Array,
    },
  },
  methods: {
    change(m) {
      this.$emit("setCurr", m);
    },
  },
  data() {
    return {
      show: false,
      active: 0,
    };
  },
  components: {
    SidePopup,
    SearchBox,
  },
};
</script>

<style lang="less">
.top {
  width: 94vw;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  z-index: 100;
  height: 8vh;
  padding: 0 3vw;
  .middle {
    width: 70vw;
    height: 14vw;
  }
  .left,
  .right {
    height: 14vw;
    line-height: 14vw;
    padding: 0 2vw;
  }
  .van-tabs {
    width: 100%;
    height: 14vw;
  }
  .search-box {
    padding: 0;
    border-radius: 50%;
  }
}
</style>
