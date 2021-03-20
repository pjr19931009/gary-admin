import XEUtils from "utils/XEUtils";
let { debounce } = XEUtils;

export default {
  data() {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null,
      $_device: ""
    };
  },
  computed: {
    $_chart() {
      return this.$store.getters["charts/charts"];
    },
    $_collapse() {
      return this.$store.getters["layout/isCollapse"];
    }
  },
  mounted() {
    this.$_getPageWidth();
    this.$_resizeHandler = debounce(
      () => {
        if (this.$_chart && this.$_chart.length > 0) {
          // this.chart.resize();
          this.$_chart.map(item => {
            item.resize();
          });
        }
      },
      16,
      false
    );
    this.$_initResizeEvent();
  },
  beforeDestroy() {
    this.$_destroyResizeEvent();
  },
  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  activated() {
    this.$_initResizeEvent();
  },
  deactivated() {
    this.$_destroyResizeEvent();
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_initResizeEvent() {
      window.addEventListener("resize", this.$_allInitResizeHandler);
    },
    $_destroyResizeEvent() {
      window.removeEventListener("resize", this.$_allInitResizeHandler);
    },
    $_getPageWidth() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      let $_device = "";
      // 设备划分
      if (width < 768) {
        $_device = "mobile";
      } else {
        $_device = "desktop";
      }
      // 设备变化触发
      if (this.$_device !== $_device) {
        this.$store.dispatch("layout/setDevice", $_device);
        this.$_device = $_device;
      }
    },
    $_allInitResizeHandler() {
      this.$_resizeHandler();
      this.$_getPageWidth();
    }
  }
};
