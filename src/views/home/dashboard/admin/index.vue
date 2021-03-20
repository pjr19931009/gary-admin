<template>
  <div class="dashboard-admin-container">
    <console-card />
    <el-row :gutter="20">
      <el-col :lg="14" :span="24">
        <visits-chart />
      </el-col>
      <el-col :lg="10" :span="24">
        <todo-list />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="9" :xs="24" :sm="24">
        <traffic-chart />
      </el-col>
      <el-col :lg="8" :xs="24" :sm="24">
        <ring-chart />
      </el-col>
      <el-col :lg="7" :xs="24" :sm="24">
        <calendar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  ConsoleCard,
  VisitsChart,
  TodoList,
  TrafficChart,
  RingChart,
  Calendar
} from "components/Dashboard";
export default {
  components: {
    ConsoleCard,
    VisitsChart,
    TodoList,
    TrafficChart,
    RingChart,
    Calendar
  }
};
</script>
<style lang="scss" scoped>
.dashboard-admin-container {
  height: 100%;
  box-sizing: border-box;
}

%marginBottom {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
  }
}

.el-row {
  @extend %marginBottom;
}

.el-col {
  @extend %marginBottom;
}
</style>
