<template>
  <div
    class="top-bar-container"
    :class="[
      collapse ? 'width-collapse' : 'width-extend',
      device,
      { 'theme-bg': theme === 'dark' },
    ]"
  >
    <div
      class="topbar clearfix"
      :class="[{ 'theme-topbar-bg': theme === 'dark' }]"
    >
      <!-- 展开按钮 -->
      <div class="icon-box">
        <svg-icon
          :icon-name="collapse ? 'shouqi' : 'zhankai'"
          icon-class="sidebar-icon"
          @click.native="handlerSideBar"
          class="pointer"
        />
      </div>

      <!-- 头像 -->
      <div class="avatar pointer">
        <el-dropdown trigger="click">
          <span>
            <el-avatar :size="avatar.size" :src="avatar.url"></el-avatar>
            <svg-icon icon-name="arrow-down" icon-class="avatar-icon" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handlerLogout"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item
            :to="{ path: '/' }"
            key="/home"
            v-if="breadcrumbList[0].path !== '/home'"
          >
            <span class="theme-font">首页</span>
          </el-breadcrumb-item>
          <transition-group name="breadcrumb">
            <el-breadcrumb-item
              v-for="item in breadcrumbList"
              :key="item.path"
              :to="{ path: item.path }"
            >
              <span class="theme-font">{{ item.meta.title }}</span>
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
      </div>

      <!-- 设置 -->
      <div class="setting">
        <svg-icon
          icon-name="set"
          icon-class="tools-icon"
          @click.native="handlerSetting"
          @close="handlerClose"
        />
      </div>

      <!-- 工具 -->
      <div class="tools">
        <!-- <svg-icon
          icon-name="search"
          icon-class="tools-icon"
          @click.native="handleSearch"
        />
        <input
          type="text"
          placeholder="Search"
          :class="['tool-search', { 'tool-search-show': showInput }]"
        /> -->
        <svg-icon
          icon-name="chuangkou"
          icon-class="tools-icon"
          @click.native="exitFull"
          v-if="fullScreen"
        />
        <svg-icon
          icon-name="quanpin"
          icon-class="tools-icon"
          @click.native="enterFull"
          v-else
        />
      </div>
    </div>
    <tag-view />
    <left-tool :drawer="drawer" />
  </div>
</template>

<script>
import routeChange from "../mixins/routeChange";
import collapse from "../mixins/collapse";
import TagView from "./TagView";
import { mapGetters, mapActions } from "vuex";
import leftTool from "./leftTool";
import themeMixin from "utils/theme";
export default {
  mixins: [routeChange, collapse, themeMixin],
  components: {
    TagView,
    leftTool,
  },
  data() {
    return {
      avatar: {
        size: "medium",
        src: "",
      },
      showInput: false,
      breadcrumbList: null,
      drawer: false,
      fullScreen: false,
    };
  },
  inject: ["reload"],

  computed: {
    ...mapGetters("layout", ["device"]),
  },
  methods: {
    ...mapActions("user", ["logout"]),
    // ...mapActions("layout", ["setFullscreen"]),
    handleSearch() {
      this.showInput = !this.showInput;
    },
    routeChange(newValue, oldValue) {
      this.breadcrumbList = newValue.matched;
    },
    handlerLogout() {
      this.logout()
        .then((res) => {
          this.$router.push("/login");
        })
        .catch((err) => {
          this.$router.push("/login");
        });
    },
    handlerSetting() {
      this.drawer = !this.drawer;
    },
    handlerClose(status) {
      this.drawer = status;
    },
    enterFull() {
      const el = document.documentElement;
      el.requestFullscreen();
    },
    exitFull() {
      const el = document;
      el.exitFullscreen();
    },
  },
  mounted() {
    const context = this;
    document.addEventListener("fullscreenchange", function () {
      var full_screen_element = document.fullscreenElement;

      if (full_screen_element !== null) {
        context.fullScreen = true;
      } else {
        context.fullScreen = false;
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.top-bar-container {
  height: $height-topbar;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  box-sizing: border-box;
  border-bottom: 1px solid #efefef;
  background: #fff;
  transition: width 0.3s ease-in-out;
}

.mobile.top-bar-container {
  transition: width 0s ease-in-out;
}

.topbar {
  width: 100%;
  height: $height-topbar-tools;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid #efefef;
}

.width-collapse {
  width: calc(100% - #{$width-sidebar-close});
}
.width-extend {
  width: calc(100% - #{$width-sidebar-open});
}

%box {
  display: flex;
  height: 100%;
  align-items: center;
  float: left;
  padding: 0 5px;

  .sidebar-icon,
  .tools-icon {
    width: 30px;
    height: 30px;
    color: inherit;
    cursor: pointer;
  }
  .tool-search {
    width: 0px;
    height: 30px;
    border: none;
    border-bottom: 0px solid $black;
    transition: all 0.3s;
  }
  .tool-search-show {
    width: 200px;
    border-bottom: 1px solid $black;
  }
}

.icon-box,
.breadcrumb {
  @extend %box;
}

.avatar,
.setting,
.tools {
  @extend %box;
  float: right;
}

.mobile.width-collapse {
  width: 100%;
}
.mobile.width-extend {
  width: 100%;
}
</style>
<style lang="scss" scoped>
::v-deep .el-breadcrumb__item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

::v-deep .el-breadcrumb__inner.is-link {
  font-weight: 500;
  color: $black;
}

::v-deep .el-breadcrumb__item:last-child {
  .el-breadcrumb__inner.is-link {
    color: $grey-1;
  }
}
</style>
