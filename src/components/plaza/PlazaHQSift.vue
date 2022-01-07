<template>
  <div class="plaza-hq-sift">
    <van-icon name="filter-o" @click="showPopup" />
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="wrap">
        <div class="wrap-header">精品歌单</div>
        <div class="allHQ">
          <van-button
            round
            block
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="$emit('setCat', '')"
          >
            全部精品
          </van-button>
        </div>
        <TagsWrap
          v-if="tags != undefined && tags.length > 0"
          :data="{ tags }"
          @setCat="setCat"
          :mode="true"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { loadHighQualityTagsAPI } from "../../service/playlist";
import TagsWrap from "../tags/TagsWrap.vue";
export default {
  data() {
    return {
      show: false,
      tags: [],
    };
  },
  created() {
    loadHighQualityTagsAPI().then((res) => {
      this.tags = res.tags;
    });
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    setCat(v) {
      this.$emit("setCat", v);
    },
  },
  components: {
    TagsWrap,
  },
};
</script>

<style lang="less" scoped>
.plaza-hq-sift {
  .wrap {
    .wrap-header {
      height: 15vw;
      line-height: 15vw;
      text-align: center;
    }
    .allHQ {
      width: 90vw;
      padding: 0 5vw;
      border-radius: 50%;
    }
  }
}
</style>
