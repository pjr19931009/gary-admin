<template>
  <div class="toggle-permission" :class="[{ 'theme-bg': theme === 'dark' }]">
    <el-button type="primary" @click="toggle"> 切换 </el-button>
    <div>{{ roles }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  data() {
    return {
      admin: true,
    };
  },
  inject: ["reload"],
  computed: {
    roles() {
      return this.$store.state.user.roles;
    },
  },
  methods: {
    ...mapActions("user", ["login", "resetInfo"]),
    async toggle() {
      let roles = {};
      if (this.roles.includes("admin")) {
        roles = {
          account: "editor",
          password: 123456,
        };
      } else {
        roles = {
          account: "admin",
          password: 123456,
        };
      }
      this.admin = !this.admin;
      await this.resetInfo();

      this.login(roles).then((res) => {
        this.$router.push({ path: "/login" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle-permission {
  padding: 20px;
  height: 745px;

  div{
    margin-top:10px;
  }
}
</style>
