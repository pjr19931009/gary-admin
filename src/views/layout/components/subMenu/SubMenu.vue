<template>
  <el-submenu
    :index="item.name"
    :popper-append-to-body="false"
    v-if="!item.hidden"
  >
    <template slot="title">
      <svg-icon :icon-name="item.meta.icon || ''" v-if="item.meta.icon" />
      <span slot="title">{{ item.meta.title }}</span>
    </template>
    <item-group :children="item.children || []"></item-group>
  </el-submenu>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  beforeCreate() {
    // 递归组件
    this.$options.components.ItemGroup = () =>
      import("../itemGroup/ItemGroup.vue");
  },
};
</script>
