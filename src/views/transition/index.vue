<template>
  <div class="transition-container" :class="[{ 'theme-bg': theme === 'dark' }]">
    <custom class="transition-item" />
    <fade class="transition-item" />
    <zoom class="transition-item" />
    <collapse class="transition-item" />
  </div>
</template>

<script>
import Fade from "@/components/Transition/Fade";
import Zoom from "@/components/Transition/Zoom";
import Collapse from "@/components/Transition/Collapse";
import Custom from "@/components/Transition/Custom";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  components: {
    Fade,
    Zoom,
    Collapse,
    Custom,
  },
};
</script>
<style lang="scss" scoped>
.transition-container {
  height: calc(100vh - 120px);
  padding: 20px;
  box-sizing: border-box;
  .transition-item {
    margin-bottom: 10px;
  }
}
</style>
