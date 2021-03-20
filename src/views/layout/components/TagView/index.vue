<template>
  <div
    class="tagview-container"
     :class="[{ 'theme-bg-2': theme === 'dark' }]"
    ref="tagview"
    v-if="theme"
  >
    <vue-scroll :ops="ops">
      <template v-for="(tag, index) in visitedView">
        <el-tag
          :key="tag.path"
          :closable="!tag.meta.keepTag"
          type="info"
          size="medium"
          :color="color"
          :class="[
            currentPath === tag.path ? 'active' : '',
            theme === 'dark' ? 'theme-bg' : '',
          ]"
          @close="handleClose(tag, index)"
        >
          <router-link :to="{ path: tag.path }">{{
            tag.meta.title
          }}</router-link>
        </el-tag>
      </template>
    </vue-scroll>
    <div class="tool pointer" :class="[theme === 'dark' ? 'theme-bg' : '']">
      <el-dropdown trigger="click">
        <i class="el-icon-close"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeAll">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import routeChange from "../../mixins/routeChange";
import { white } from "@/assets/styles/variables.scss";
import { mapGetters } from "vuex";
import themeMixin from "utils/theme";
export default {
  mixins: [routeChange, themeMixin],
  data() {
    return {
      visitedView: [],
      color: white,
      ops: {
        vuescroll: {
          wheelDirectionReverse: true,
          wheelScrollDuration: 1000,
        },
        scrollPanel: {
          scrollingX: true,
          scrollingY: false,
          easing: "easeOutQuart",
        },
        rail: {
          opacity: 0,
        },
        bar: {
          background: "#dfdfdf",
          opacity: 0.5,
        },
      },
      currentPath: "",
    };
  },
  computed: {
    ...mapGetters("layout", ["routeList"]),
  },
  methods: {
    routeChange(newVal) {
      if (newVal.name === "Dashboard") return (this.currentPath = newVal.path);
      let flag = this.visitedView.some(
        (item, index) => item.path === newVal.path
      );
      if (!flag) this.visitedView.push(newVal);
      this.currentPath = newVal.path;
    },
    handleClose(tag, index) {
      this.visitedView.splice(index, 1);
      const endTag = this.visitedView[this.visitedView.length - 1];
      if (tag.path === this.currentPath && endTag) {
        this.$router.push(endTag.path);
      }
    },
    closeAll() {
      this.visitedView.splice(1);
    },
  },
  created() {
    this.routeList.map((item) => {
      if (item.meta.keepTag) {
        this.visitedView.splice(0, 0, item);
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.tagview-container {
  height: $height-tagView;
  background: $white-1;
  padding: 5px 10px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  transition: all 0.5s;
  position: relative;
  transition: background 0s;

  .tool {
    width: 30px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: 5px 10px;
    background: $white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.active {
  color: $font-color-2 !important;
}

::v-deep .el-tag {
  height: $height-tagView;
  margin-right: 5px;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;

  a {
    color: $font-color-3;
  }
  .router-link-exact-active.router-link-active {
    color: $font-color-2;
  }
}

::v-deep .el-icon-close {
  transform: scale(1);
  transition: all 0.5s;
}
</style>
