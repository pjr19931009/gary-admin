export default {
  computed: {
    collapse() {
      return this.$store.getters["layout/isCollapse"] || false;
    }
  },
  methods: {
    handlerSideBar() {
      this.$store.dispatch("layout/setCollapse", !this.collapse);
    },
  }
}
