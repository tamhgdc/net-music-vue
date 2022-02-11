<template>
  <div class="search-result">
    <div v-if="results.length > 0" class="search-top">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        autofocus="autofocus"
      />
      <input ref="searchInput" v-model="key" type="text" />
    </div>
    <van-tabs v-model="active" animated>
      <van-tab v-for="(tab, i) in options" :key="tab.title" :title="tab.title">
        <component
          :is="tab.is"
          :type="tab.type"
          :data="results[i]"
          @setAct="setAct"
        ></component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import SearchSynthesis from "../components/search/SearchSynthesis.vue";
import SearchSongList from "../components/search/SearchSongList.vue";
import SearchPlayList from "../components/search/SearchPlayList";
import SearchArtistsList from "../components/search/SearchArtistsList.vue";
import SearchUserList from "../components/search/SearchUserList.vue";
import { loadSearchSuggestAPI, searchByTypesAPI } from "../service/search";
export default {
  data() {
    return {
      active: 0,
      key: "",
      suggest: {},
      options: [
        { title: "综合", type: 1018, is: "SearchSynthesis" },
        { title: "单曲", type: 1, is: "SearchSongList" },
        { title: "歌单", type: 1000, is: "SearchPlayList" },
        { title: "歌手", type: 100, is: "SearchArtistsList" },
        { title: "用户", type: 1002, is: "SearchUserList" },
      ],
      results: [],
    };
  },
  async created() {
    this.key = this.$route.params.key;
    await loadSearchSuggestAPI(this.$route.params.key).then((res) => {
      console.log(res);
      this.suggest = res.result;
    });
    const types = this.options.map((x) => x.type);
    await searchByTypesAPI(this.key, types).then((res) => {
      // res.forEach((e, i) => {
      //   this.results[types[i]] = e.result;
      // });

      this.results = res.map((x) => x.result);
      console.log("demo", this.results[0]);
    });
  },
  methods: {
    setAct(v) {
      this.active = v;
    },
  },
  components: {
    SearchSynthesis,
    SearchSongList,
    SearchPlayList,
    SearchArtistsList,
    SearchUserList,
  },
};
</script>

<style lang="less" scoped>
.search-result {
  > div {
    width: 100vw;
  }
  .search-top {
    height: 14vw;
    margin: 0;
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
}
</style>
