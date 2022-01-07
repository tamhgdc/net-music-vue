<template>
  <div class="tags-list">
    <BaseTopNav />
    <TagPlaylist :cat="$route.params.cat" />
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
import TagPlaylist from "../components/tags/TagPlaylist.vue";
export default {
  components: {
    BaseTopNav,
    TagPlaylist,
  },
};
</script>

<style></style>
