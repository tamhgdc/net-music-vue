<template>
  <div>
    <van-search
      class="search-box"
      background="#f5f5f5"
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style></style>
