<template>
  <chart-wrap :title="title" :iconName="iconName">
    <template #chart>
      <v-echarts :option="option" chart-title="访问数" />
    </template>
  </chart-wrap>
</template>

<script>
import ChartWrap from "../Common/ChartWrap";
import VEcharts from "@/plugins/echarts";
export default {
  components: {
    ChartWrap,
    VEcharts,
  },
  data() {
    return {
      title: "待办事项",
      iconName: "warning-color",
      option: {
        legend: {
          top: "bottom",
        },
        series: [
          {
            type: "pie",
            radius: [20, 100],
            center: ["50%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 0,
            },
            labelLine: {
              length: 5,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
        wrapWidth: "100%",
        wrapHeight: "100%",
      },
    };
  },
};
</script>
