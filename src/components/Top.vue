<template>
  <div>
    <div v-if="mode" class="top">
      <SidePopup />
      <SearchBox />
      <van-icon name="add" size="24" color="#fe3a3b" />
    </div>
    <div v-if="!mode" class="top-mode">
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
    </div>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 14vw;
  padding: 0 2vw;
}
.middle {
  width: 70vw;
}
.top-mode {
  .left,
  .right {
    height: 14vw;
    line-height: 14vw;
    padding: 0 2vw;
  }
}
</style>
