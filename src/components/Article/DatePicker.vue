<template>
  <div class="date-picker">
    <span class="date-select-title">选择日期： </span>
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期"
      @change="change"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    };
  },
  methods: {
    change() {
      this.$emit("date-change", this.value);
    }
  }
};
</script>
