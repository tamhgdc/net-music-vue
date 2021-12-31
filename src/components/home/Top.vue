<template>
  <div class="top">
    <SidePopup></SidePopup>
    <component class="middle" :is="curr"></component>
    <van-icon name="add" size="24" color="#fe3a3b" />
  </div>
</template>

<script>
import SidePopup from "./SidePopup.vue";
import SearchBox from "../SearchBox.vue";

export default {
  data() {
    return {
      curr: "SearchBox",
      show: false,
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
  justify-content: space-around;
  padding: 0.1vh 0;
}
.middle {
  width: 70vw;
}
</style>
