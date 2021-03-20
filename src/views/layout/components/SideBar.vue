<template>
  <div class="sidebar-container" :key="key">
    <el-menu
      ref="sidebar"
      :default-active="currentMenu"
      :class="['el-menu-sidebar', 'sidebar-scrollbar', device]"
      :collapse="collapse"
      :collapse-transition="true"
      :unique-opened="true"
      :router="true"
      :text-color="textColor"
      :background-color="bgColor"
      v-if="isShow"
    >
      <div class="sidebar-header pointer" @click="headerClick">
        <img
          style="width: 25px; height: 25px"
          :src="imgUrl"
          class="header-img"
        />
        <span class="header-title" v-if="!collapse">gary-admin</span>
      </div>
      <template v-for="(submenu, index) in routes">
        <sub-menu :item="submenu" :index="index" :key="submenu.name" />
      </template>
    </el-menu>
    <div
      :class="[collapse ? '' : 'mask', 'pointer', device]"
      @click="handlerSideBar"
    ></div>
  </div>
</template>

<script>
import SubMenu from "./subMenu/SubMenu";
import { fontColorGrey } from "@/assets/styles/variables.scss";
import routeChange from "../mixins/routeChange";
import collapse from "../mixins/collapse";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("layout");
import themeMixin from "utils/theme";
export default {
  mixins: [routeChange, collapse, themeMixin],
  components: {
    SubMenu,
  },
  data() {
    return {
      currentMenu: "",
      routes: [],
      key: 0,
      imgUrl: require("@/assets/img/p-logo-transparent.png"),
    };
  },
  computed: {
    ...mapGetters(["device"]),
    textColor() {
      return fontColorGrey;
    },
    bgColor() {
      return this.theme === "dark" ? "#22252A" : "#FFFFFF";
    },
    isShow() {
      return this.theme ? true : false;
    },
  },
  watch: {
    device: function (newVal) {
      const collapse = newVal === "mobile" ? true : false;
      this.$store.dispatch("layout/setCollapse", collapse);
    },
    "$store.state.permission.routes": {
      handler: function (newVal) {
        this.routes = this.$store.state.permission.routes;
        this.key++;
      },
      immediate: true,
    },
  },
  mounted() {
    this.setRouteList(this.$router.getRoutes());
  },
  methods: {
    ...mapActions(["setRouteList"]),
    routeChange() {
      this.currentMenu = this.$route.path;
    },
    headerClick() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-right: none;
  box-shadow: 2px 0 10px -8px rgba(0, 0, 0, 0.5);
  z-index: 1333;

  .horizontal-collapse-transition {
    transition: all 0.3s ease-in-out;
  }
}

::v-deep .svg-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: middle;
}

.mask {
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: none;
}
.mobile.mask {
  display: block;
}

// element ui
.el-menu-sidebar {
  width: $width-sidebar-close;
  height: 100%;
  overflow: auto;
  z-index: 999;
  border: none;
  transition: background 0.3s;
}

.el-menu-sidebar:not(.el-menu--collapse) {
  width: $width-sidebar-open;
  min-height: 100%;
}

.mobile.el-menu-sidebar {
  width: 0;
}
.mobile.el-menu-sidebar:not(.el-menu--collapse) {
  width: $width-sidebar-open;
}

::v-deep .el-menu--inline {
  background: $white-1 !important;
}

::v-deep .el-menu-item-group__title {
  display: none;
}

.sidebar-header {
  height: 56px;
  line-height: 56px;
  white-space: nowrap;
  user-select: none;

  .header-img {
    vertical-align: middle;
    padding: 0 20px;
  }

  .header-title {
    color: $font-color-3;
    white-space: nowrap;
  }
}

::v-deep .el-menu-item,
::v-deep .el-submenu {
  user-select: none;
}
</style>
