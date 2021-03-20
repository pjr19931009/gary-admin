import { mapGetters } from "vuex";
import XEUtils from "utils/XEUtils";
let { debounce } = XEUtils;
export default {
  data() {
    return {
      $_resizeHandler: null,
      $_flag: false
    };
  },
  computed: {
    ...mapGetters("charts", ["charts"]),
    $_elMenu() {
      return this.$refs["main-container"];
    },
    $_chart() {
      return this.$store.getters["charts/charts"];
    }
  },
  mounted() {
    this.$_resizeHandler = debounce(
      () => {
        if (this.$_chart && this.$_chart.length > 0) {
          // this.chart.resize();
          this.$_chart.map(item => {
            item.resize();
          });
          this.$_flag = false;
        }
      },
      16,
      false
    );

    this.$_elMenu &&
      this.$_elMenu.addEventListener("transitionend", this.$_transitionend);
  },
  beforeDestroy() {
    this.$_elMenu &&
      this.$_elMenu.removeEventListener("transitionend", this.$_transitionend);
  },
  methods: {
    $_transitionend() {
      if (!this.$_flag) {
        this.$_flag = true;
        this.$_resizeHandler();
      }
    }
  }
};
