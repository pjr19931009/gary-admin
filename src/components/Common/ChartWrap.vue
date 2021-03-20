<template>
  <div class="chart-wrap" :class="[{ 'theme-bg': theme === 'dark' }]">
    <div class="header" :class="[{ 'dark theme-bg': theme === 'dark' }]">
      <svg-icon :icon-name="iconName" />
      <span>
        {{ title }}
      </span>
    </div>
    <slot name="chart"></slot>
  </div>
</template>

<script>
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  props: {
    title: { type: String, default: "" },
    iconName: { type: String, default: "" },
  },
};
</script>

<style lang="scss" scoped>
.chart-wrap {
  width: 100%;
  height: 350px;
  background: #fff;
  border-radius: 5px;
  position: relative;

  .header {
    width: 100%;
    font-size: 16px;
    color: $font-color-3;
    line-height: 1.5em;
    padding: 10px;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    z-index: 50;
    span {
      padding: 0 10px;
    }
  }
  .dark.header {
    border-bottom: 1px solid #333;
  }
}
</style>
