<template>
  <div
    class="v-echart"
    ref="v-echart"
    :style="style"
    :class="[theme === 'dark' ? 'theme-bg' : '']"
  ></div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts";
import "./theme/dark";
import "./theme/macarons";
import { mapActions, mapGetters } from "vuex";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  data() {
    return {
      chart: null,
    };
  },
  props: {
    option: {
      type: Object,
      required: true,
    },
    defaultTheme: {
      type: String,
      default: "macarons",
    },
  },
  computed: {
    ...mapGetters("layout", ["device"]),
    style() {
      return {
        width: this.option.wrapWidth,
        height: this.option.wrapHeight,
      };
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  deactivated() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    ...mapActions("charts", ["setCharts"]),
    init() {
      this.$nextTick(() => {
        const dom = this.$refs["v-echart"];
        this.chart = echarts.init(dom, this.defaultTheme);
        this.option && this.chart.setOption(this.option);
        this.setCharts(this.chart);
        this.chart.resize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.v-echart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
