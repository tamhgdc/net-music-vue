<template>
  <div class="search">
    <div class="search-top">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        autofocus="autofocus"
      />
      <input
        ref="searchInput"
        v-model="key"
        type="text"
        @keyup.enter="search"
      />
    </div>
    <div v-show="key.length > 0" class="suggest-list">
      <div
        v-for="s in suggestList"
        :key="s.feature + Math.random() * 100000"
        class="s-item"
        @click="searchByKey(s.keyword)"
      >
        <div class="icon">
          <van-icon name="search"></van-icon>
        </div>
        <p v-html="s.keyword"></p>
      </div>
    </div>
    <div class="title">热搜榜</div>
    <div class="hot-list">
      <div
        v-for="(item, i) in list"
        :key="item.content"
        class="item"
        @click="searchByKey(item.searchWord)"
      >
        <span :style="i < 3 ? 'color:#fd383a' : ''">{{ i + 1 }}</span>
        <span
          :style="i < 3 ? 'font-weight:600' : ''"
          class="search-word van-ellipsis"
          >{{ item.searchWord }}</span
        >
        <span v-show="i == 0" class="hot">HOT</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  loadSearchDefaultAPI,
  loadSearchHotListAPI,
  loadSearchSuggestAPI,
} from "../service/search";
export default {
  data() {
    return {
      key: "",
      realkeyword: "",
      list: [],
      suggestList: [],
    };
  },
  created() {
    loadSearchDefaultAPI()
      .then((res) => {
        this.$refs.searchInput.placeholder = res.data.showKeyword;
        this.realkeyword = res.data.realkeyword;
        return loadSearchHotListAPI();
      })
      .then((res) => {
        this.list = res.data;
      });
  },
  watch: {
    key(v) {
      loadSearchSuggestAPI(v).then((res) => {
        if (res.code == 200) {
          this.suggestList = res.result.allMatch.map((x) => {
            x.keyword = x.keyword.replace(
              new RegExp(v),
              '<span style="color:red!important">' + v + "</span>"
            );
            return x;
          });
        }
      });
    },
  },
  methods: {
    search() {
      this.$router.push({
        name: "SearchResult",
        params: {
          key: this.key.length > 0 ? this.key : this.realkeyword,
        },
      });
    },
    searchByKey(key) {
      this.$router.push({ name: "SearchResult", params: { key } });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  > div {
    width: 94vw;
    margin: 5vw 3vw 0;
  }
  .suggest-list {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 14vw;
    left: -3vw;
    background-color: white;
    .s-item {
      display: flex;
      height: 14vw;
      align-items: center;
      .icon {
        font-size: 5vw;
        padding: 0 2vw;
      }
      p {
        flex: 1;
        padding: 2vw;
        border-bottom: 1px solid #cecece70;
      }
    }
  }
  .search-top {
    height: 14vw;
    margin: 0;
    padding: 0 3vw;
    font-size: 5vw;
    line-height: 14vw;
    background-color: white;
    input {
      padding: 0 5vw;
    }
  }
  .title {
    font-size: 5vw;
    font-weight: 900;
  }
  .hot-list {
    border-radius: 3vw;
    background: white;
    margin-top: 3vw;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    align-items: center;
    padding: 3vw 0;
    .hot {
      color: #fd383a;
      font-weight: 900;
      font-style: italic;
    }
    .item {
      padding: 2vw 0 0 2vw;
      span {
        padding: 0 0vw 0 2vw;
        font-size: 4.5vw;
      }
      .search-word {
        width: 20vw;
        color: black;
      }
    }
  }
}
</style>
