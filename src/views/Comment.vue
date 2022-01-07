<template>
  <div class="comment">
    <BaseTopNav>
      <template #title> 评论({{ totalCount }}) </template>
    </BaseTopNav>
    <div class="type-nav">
      <van-sticky z-index="1" offset-top="14vw">
        <nav>
          <div>评论区</div>
          <div>
            <span :class="sortType == 1 ? 'curr' : ''" @click="sortType = 1"
              >推荐</span
            >
            ｜
            <span :class="sortType == 2 ? 'curr' : ''" @click="sortType = 2"
              >最热</span
            >
            ｜
            <span :class="sortType == 3 ? 'curr' : ''" @click="sortType = 3"
              >最新</span
            >
          </div>
        </nav>
      </van-sticky>
    </div>
    <div class="list-wrap">
      <CommentList :opt="opt" @setTotalCount="setTotalCount" />
    </div>
    <CommentInput :opt="opt" @send="send" />
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
import CommentList from "../components/comment/CommentList.vue";
import CommentInput from "../components/comment/CommentInput.vue";
import { Toast } from "vant";

export default {
  data() {
    return {
      sortType: 1,
      totalCount: 0,
    };
  },
  components: {
    BaseTopNav,
    CommentList,
    CommentInput,
  },
  methods: {
    setTotalCount(v) {
      // console.log(v);
      this.totalCount = v;
    },
    send(r) {
      switch (r.code) {
        case 200:
          Toast.success(r.msg);
          this.sortType = 3;
          break;
        case 301:
          Toast.fail(r.msg);
          break;
        default:
          Toast.fail(r.msg);
      }
    },
  },
  computed: {
    opt() {
      return {
        id: this.$route.params.id,
        type: this.$route.params.type,
        sortType: this.sortType,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  background-color: white;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .type-nav {
    nav {
      display: flex;
      height: 14vw;
      width: 90vw;
      padding: 0 5vw;
      background: white;
      justify-content: space-between;
      align-items: center;
      span {
        color: #a3a2a2;
        &.curr {
          color: #333333;
        }
      }
    }
    .list-wrap {
      position: relative;
      div {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
