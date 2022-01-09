<template>
  <div class="cell" @click="goList(item)">
    <img :src="item.coverImgUrl" alt="" />
    <div class="info">
      <div class="name">{{ item.name }}</div>
      <div class="desc">
        {{ item.trackCount }}首,by {{ item.creator.nickname }}, 播放{{
          parseInt(item.playCount / 1000) * 10
        }}万次
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    goList(pl) {
      this.$router.push({
        name: "List",
        params: {
          id: pl.id,
          type: pl.alg.includes("official")
            ? "ListOfficialHeader"
            : "ListBaseHeader",
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  display: flex;
  align-items: center;
  padding: 3vw;
  img {
    width: 15vw;
    height: 15vw;

    border-radius: 3vw;
  }
  .info {
    padding-left: 3vw;
    height: 15vw;

    .name {
      color: black;
      font-size: 4.5vw;
    }
    .desc {
      padding-top: 3vw;
      font-size: 3vw;
    }
  }
}
</style>
