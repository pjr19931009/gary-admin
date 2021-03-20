  <!-- <svg-icon icon-name="account" icon-class="login" /> -->
<template>
  <svg :class="_iconClass" aria-hidden="true">
    <use :xlink:href="_iconName"></use>
  </svg>
</template>

<script>
export default {
  components: {},
  props: {
    iconName: { type: String, required: true },
    iconClass: { type: String, default: "" }
  },
  data() {
    return {};
  },
  computed: {
    _iconName() {
      return `#icon-${this.iconName}`;
    },
    _iconClass() {
      return ["svg-icon", this.iconClass];
    }
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
