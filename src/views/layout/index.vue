<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <side-bar />
    <!-- 主体区 -->
    <keep-alive>
      <main-container />
    </keep-alive>
  </div>
</template>

<script>
import { MainContainer, SideBar } from "./components";
import resize from "utils/resize";
import { handleTheme } from "utils/storage";
export default {
  components: {
    SideBar,
    MainContainer,
  },
  mixins: [resize],
  created() {
    handleTheme.getItem("theme").then((res) => {
      if (!res) {
        res = "default";
      }
      this.$store.dispatch("theme/setTheme", res);
    });
  },
};
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
