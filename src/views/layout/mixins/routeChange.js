export default {
  watch: {
    "$route": {
      handler: function (newValue, oldValue) {
        this.routeChange && this.routeChange(newValue, oldValue)
      },
      immediate: true
    }
  },
};
