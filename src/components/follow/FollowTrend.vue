<template>
  <div class="follow-trend">
    <template v-if="events.length > 0">
      <EventCard :e="first" />
      <EventCard
        v-for="e in events"
        :key="Math.random() * e.eventTime"
        :e="e"
      />
    </template>
  </div>
</template>

<script>
//,LoadUserFollowerEventsAPI
import {
  LoadUserFollowersAPI,
  LoadUserFollowerEventsAPI,
} from "../../service/follow";
import EventCard from "../EventCard.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      first: {},
      events: [],
    };
  },
  created() {
    LoadUserFollowersAPI(this.isLogin ? this.profile.userId : 1287293193)
      .then((res) => {
        res.follow.map((x) => x.userId);
        return LoadUserFollowerEventsAPI(res.follow.map((x) => x.userId));
      })
      .then((res) => {
        const arr = res
          .filter((x) => x.events[0] != undefined)
          .map((x) => x.events)
          .flat()
          .sort((a, b) => b.eventTime - a.eventTime)
          .map((e) => {
            e.content = JSON.parse(e.json);
            return e;
          });
        console.log(arr);
        this.first = arr[0];
        this.events = arr.splice(1);
        // console.log(this.first, this.events);
      });
  },
  computed: {
    ...mapState("user", ["profile", ["isLogin"]]),
  },
  components: {
    EventCard,
  },
};
</script>

<style lang="less" scoped>
.follow-trend {
  width: 92vw;
  padding: 0 2vw;
}
</style>
