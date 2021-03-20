<template>
  <div class="left-tool">
    <el-drawer
      :visible.sync="drawerStatus"
      :with-header="false"
      :append-to-body="true"
      @close="handlerClose"
      size="15%"
    >
      <header-title data="主题风格" />
      <div class="theme-category">
        <div
          class="default pointer"
          :class="[{ active: active === 'default' }]"
          @click="selectTheme('default')"
        ></div>
        <div
          class="dark pointer"
          :class="[{ active: active === 'dark' }]"
          @click="selectTheme('dark')"
        ></div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import headerTitle from "@/components/Common/headerTitle";
import { mapActions } from "vuex";
import { handleTheme } from "utils/storage";
export default {
  components: { headerTitle },
  data() {
    return {
      drawerStatus: false,
      active: "",
    };
  },
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    drawer() {
      this.drawerStatus = !this.drawerStatus;
    },
  },
  methods: {
    ...mapActions("theme", ["setTheme"]),
    handlerClose() {
      this.$emit("close", this.drawerStatus);
    },
    selectTheme(theme) {
      this.active = theme;
      handleTheme.setItem("theme", theme).then(() => {
        this.setTheme(theme);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-category {
  display: flex;
  padding: 10px 0;
  box-sizing: border-box;
  justify-content: space-evenly;

  .default,
  .dark {
    display: inline-block;
    width: 85px;
    height: 55px;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 0 5px -2px #333;
    position: relative;
  }
  .dark {
    background: $black-1;
  }

  .active {
    &::before {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgb(47, 182, 47);
      position: absolute;
      bottom: -20px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
</style>
