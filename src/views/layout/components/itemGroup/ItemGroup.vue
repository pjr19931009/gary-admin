<template>
  <el-menu-item-group>
    <template v-for="item in children">
      <div
        class="menu-item"
        :class="[{ 'theme-bg-1': theme === 'dark' }]"
        :key="item.name"
        v-if="!item.hidden"
      >
        <sub-menu
          :item="item"
          v-if="item.children && item.children.length > 0"
        />
        <template v-else>
          <template v-if="isUrl(item.path)">
            <a :href="item.path" target="_blank">
              {{ item.meta.title }}
            </a>
          </template>
          <el-menu-item :index="getPath(item.name, item)" v-else>
            <template>
              {{ item.meta.title }}
            </template>
          </el-menu-item>
        </template>
      </div>
    </template>
  </el-menu-item-group>
</template>

<script>
import SubMenu from "../subMenu/SubMenu";
import XEUtils from "@/utils/XEUtils";
import themeMixin from "utils/theme";
const { isArray, isEmpty, each, _isUrl } = XEUtils;
export default {
  mixins: [themeMixin],
  components: {
    SubMenu,
  },
  props: {
    children: { type: Array, required: true },
  },
  computed: {
    routeList() {
      return this.$store.getters["layout/routeList"];
    },
  },
  methods: {
    getPath(name, cur) {
      let path = "";
      if (isArray(this.routeList) && !isEmpty(this.routeList)) {
        each(this.routeList, (item, key) => {
          if (item.name === name) {
            path = item.path;
          }
        });
      }
      return path;
    },
    isUrl(url) {
      return _isUrl(url);
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-item {
  a {
    display: block;
    height: 56px;
    line-height: 56px;
    padding: 0 40px;
    color: $font-color-3;
    font-size: 14px;

    &:hover {
      background: #ecf5ff;
    }
  }
}
</style>
