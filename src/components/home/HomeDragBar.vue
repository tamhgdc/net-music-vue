<template>
  <div class="drag-bar">
    <nav>
      <div
        v-for="item in data"
        :key="item.id"
        :id="item.id"
        class="item"
        @click="clickHandle(item)"
      >
        <div class="item-icon">
          <!-- <div
            class="icon"
            :style="{
              backgroundImage: `url(${item.iconUrl}),linear-gradient(#f00, #f00)`,
            }"
          ></div> -->
          <img :src="item.iconUrl" alt="" />
        </div>
        <div class="item-title">
          {{ item.name }}
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { loadHomeDragBarAPI } from "../../service/homepage";
import { loadPrivateFMPlayListAPI } from "../../service/playlist";
export default {
  data() {
    return {
      data: [],
      links: ["DailyRemdList", "", "PlaylistPlaza"],
    };
  },
  created() {
    loadHomeDragBarAPI().then((res) => {
      this.data = res.data;
      this.links.forEach((x, i) => (this.data[i].link = x));
    });
  },
  methods: {
    clickHandle(item) {
      console.log(item.name);
      if (item.name == "私人FM") {
        loadPrivateFMPlayListAPI().then((res) => {
          console.log(res);
          this.playAllBySongs(res.data);
          this.$router.push({
            name: "Player",
          });
        });
      } else {
        this.$router.push({ name: item.link });
      }
    },
    ...mapActions("player", ["playAllBySongs"]),
  },
};
</script>

<style lang="less" scoped>
@icon: 14vw;
@iconWrap: 18vw;
.drag-bar {
  background-color: white;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  nav {
    display: flex;
    align-items: center;
    padding: 5vw 0 0;
    .item {
      flex-shrink: 0;
      padding: 0 2.5vw;
      .item-icon {
        width: @iconWrap;
        height: @iconWrap;
        text-align: center;
        background-color: #fdf1f1;
        border-radius: @iconWrap;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        img {
          position: relative;
          left: -@icon * 2;
          width: @icon;
          height: @icon;
          filter: drop-shadow(@icon*2 0 #fe3a3b);
        }
        .icon {
          width: @icon;
          height: @icon;
          background-blend-mode: darken;
          background-size: contain;
        }
      }
      .item-title {
        text-align: center;
        padding: 1vw 0;
      }
    }
  }
}
</style>
