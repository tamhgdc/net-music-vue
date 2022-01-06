<template>
  <div v-if="opt != undefined" class="cmt-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentCell
        v-for="item in list"
        :comment="item"
        :opt="opt"
        :key="item.time + Math.random() * item.commentId"
      />
    </van-list>
  </div>
</template>

<script>
import CommentCell from "../comment/CommentCell.vue";
import { LoadCommentsAPI } from "../../service/comment";
export default {
  props: ["opt"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNo: 1,
      pageSize: 20,
      totalCount: 0,
    };
  },
  methods: {
    onLoad() {
      LoadCommentsAPI({
        ...this.opt,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then((res) => {
        if (this.pageNo == 1) {
          console.log(res.data.totalCount);
          this.$emit("setTotalCount", res.data.totalCount);
        }
        this.list = this.list.concat(res.data.comments);
        this.pageNo++;
        this.loading = false;
        if (res.data.comments.length <= 0) this.finished = true;
      });
    },
  },
  watch: {
    opt() {
      this.list = [];
      this.pageNo = 1;
      this.finished = false;
      this.loading = false;
      this.onLoad();
    },
  },
  components: {
    CommentCell,
  },
};
</script>

<style lang="less" scoped></style>
