<template>
  <div
    class="main-container"
    ref="main-container"
    :class="[
      collapse ? 'padding-left-close' : 'padding-left-open',
      device,
      { 'theme-bg-2': theme === 'dark' },
    ]"
  >
    <top-bar v-bind="$attrs" v-on="$listeners" />
    <div class="outer-warp" :class="[{ 'theme-bg-2': theme === 'dark' }]">
      <keep-alive>
        <router-view v-if="isRouterAlive" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TopBar from "./TopBar";
import { mapGetters } from "vuex";
import transitionend from "../mixins/transitionend";
import themeMixin from "utils/theme";
export default {
  mixins: [transitionend, themeMixin],
  components: {
    TopBar,
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  computed: {
    ...mapGetters("layout", ["device"]),
    collapse() {
      return this.$store.getters["layout/isCollapse"] || false;
    },
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  padding-top: $height-topbar;
  transition: padding 0.3s ease-in-out;
  box-sizing: border-box;
  background: $white-1;
}

.mobile.main-container {
  transition: padding 0s ease-in-out;
}

.outer-warp {
  padding: 10px;
  background: $white-1;
  box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.padding-left-open {
  padding-left: $width-sidebar-open;
}

.padding-left-close {
  padding-left: $width-sidebar-close;
}

.mobile.padding-left-close {
  padding-left: 0;
}

.mobile.padding-left-open {
  padding-left: 0;
}
</style>
