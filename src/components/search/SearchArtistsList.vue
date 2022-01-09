<template>
  <div class="artists-list">
    <SearchUserCell v-for="user in data.artists" :user="user" :key="user.id" />
  </div>
</template>

<script>
import SearchUserCell from "./SearchUserCell.vue";
export default {
  props: ["data"],
  components: {
    SearchUserCell,
  },
};
</script>

<style></style>
