<template>
  <div class="list-operate">
    <div class="circle">
      <nav v-if="detail != undefined">
        <div class="item"></div>
        |
        <div class="item"></div>
        |
        <div class="item"></div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detail"],
};
</script>

<style lang="less" scoped>
.list-operate {
  position: relative;
  overflow: hidden;
  width: 60vw;
  height: 10vw;
  border-radius: 10vw;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0.5vw 0.2vw 0 #00000030;
}
</style>
