<template>
  <div class="user-list">
    <SearchUserCell
      v-for="user in data.userprofiles"
      :user="user"
      :key="user.id"
    />
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
