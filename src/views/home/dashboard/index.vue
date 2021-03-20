<template>
  <div class="dashboard-warp">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import adminDashboard from "./admin";

export default {
  components: {
    adminDashboard,
  },

  data() {
    return {
      currentRole: "adminDashboard",
    };
  },
  // computed: {
  //   ...mapGetters(["roles"])
  // },
  // created() {
  //   if (!this.roles.includes("admin")) {
  //     this.currentRole = "editorDashboard";
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.dashboard-warp {
  height: 100%;
}
</style>
