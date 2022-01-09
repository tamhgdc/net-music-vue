<template>
  <div v-if="list.length > 0" class="top-list-wrap">
    <div class="header">
      <slot name="icon"></slot>
      {{ title }}
    </div>
    <div v-if="mode">
      <TopListCard
        v-for="pl in list"
        :key="pl.id"
        :opt="{
          route: {
            name: 'List',
            params: {
              id: pl.id,
              type: 'ListOfficialHeader',
            },
          },
          pl,
        }"
      />
    </div>
    <div v-if="!mode" class="list-wrap">
      <PLBlock
        v-for="pl in list"
        :key="pl.id"
        :size="'28vw'"
        :mode="true"
        :opt="{
          route: {
            name: 'List',
            params: {
              id: pl.id,
              type: 'ListOfficialHeader',
            },
          },
          pl,
        }"
      >
        <template #title>
          {{ pl.updateFrequency }}
        </template>
      </PLBlock>
    </div>
  </div>
</template>

<script>
import PLBlock from "../PLBlock.vue";
import TopListCard from "./TopListCard.vue";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
    },
    mode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PLBlock,
    TopListCard,
  },
};
</script>

<style lang="less" scoped>
.top-list-wrap {
  width: 94vw;
  padding: 0 3vw;
  margin-top: 2vw;
  background-color: white;
  border-radius: 3vw;
  .header {
    height: 10vw;
    line-height: 10vw;
    font-size: 5vw;
    font-weight: 900;
    color: #313131;
    .iconfont {
      font-size: 5.5vw;
    }
  }
  .list-wrap {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
}
</style>
