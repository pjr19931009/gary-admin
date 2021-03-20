<template>
  <chart-wrap :title="title" :iconName="iconName">
    <template #chart>
      <div class="table-box" :class="[{ 'theme-bg': theme === 'dark' }]">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          :header-row-class-name="tableRowClassName"
        >
          <el-table-column prop="title" label="计划事项"> </el-table-column>
          <el-table-column prop="percentage" label="进度"> </el-table-column>
          <el-table-column prop="startDate" label="开始时间" align="center">
          </el-table-column>
          <el-table-column prop="endDate" label="结束时间" align="center">
          </el-table-column>
        </el-table>
      </div>
    </template>
  </chart-wrap>
</template>
<script>
import ChartWrap from "../Common/ChartWrap";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  components: { ChartWrap },
  data() {
    return {
      title: "计划",
      iconName: "warning-color",
      tableData: [
        {
          title: "学习英语",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 10,
          color: "#19BE6B !important",
        },
        {
          title: "学习Flutter",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 100,
          color: "#64B6F5 !important",
        },
        {
          title: "六块腹肌",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 10,
          color: "#E6A23C !important",
        },
        {
          title: "网站重构",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 100,
          color: "#FF9C80 !important",
        },
        {
          title: "Golang",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 100,
          color: "#B7CBE2 !important",
        },
        {
          title: "TypeScript",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 70,
          color: "#909399 !important",
        },
        {
          title: "HTTP",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 10,
          color: "#9BB4F3 !important",
        },
        {
          title: "设计模式",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 30,
          color: "#F2B985 !important",
        },
        {
          title: "算法",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 5,
          color: "#F5B7CE !important",
        },
        {
          title: "Node.js",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 10,
          color: "#7CC6DD !important",
        },
        {
          title: "Vue深入学习",
          startDate: "2020-1-1",
          endDate: "2020-12-31",
          percentage: 30,
          color: "#F06B7C !important",
        },
      ],
    };
  },
  methods: {
    tableRowClassName() {
      return this.theme === "dark" ? "dark" : "default";
    },
  },
};
</script>


<style lang="scss" scoped>
.table-box {
  height: 100%;
  padding-top: 45px;
  overflow: auto;
  box-sizing: border-box;
}

::v-deep .dark {
  background: $black;

  th {
    border-bottom: 1px solid #333;
    background: $black;
  }

  td {
    border-bottom: 1px solid #333;
  }
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}

::v-deep .theme-bg {
  .el-table {
    &::before {
      background-color: #333;
    }
  }
}
</style>
