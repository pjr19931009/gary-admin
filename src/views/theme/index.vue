<template>
  <div class="theme-container" :class="[{ 'theme-bg': theme === 'dark' }]">
    <template>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </template>
    {{ value }}
  </div>
</template>


<script>
import { handleTheme } from "utils/storage";
import { mapActions } from "vuex";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  data() {
    return {
      options: [
        {
          value: "default",
          label: "默认",
        },
        {
          value: "dark",
          label: "暗黑",
        },
      ],
      value: "",
    };
  },
  watch: {
    value(newVal) {
      handleTheme.setItem("theme", newVal).then(() => {
        this.setTheme(this.value);
      });
    },
  },
  methods: {
    ...mapActions("theme", ["setTheme"]),
  },
  activated() {
    handleTheme.getItem("theme").then((res) => {
      if (res) {
        this.value = res;
      } else {
        this.value = "default";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.theme-container {
  padding: 20px;
  height: calc(100vh - 120px);
  box-sizing: border-box;

  div {
    margin-top: 10px;
  }
}
</style>
