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
import themeMixin from "utils/theme";
// import * as echarts from "echarts";
export default {
  mixins: [themeMixin],
  components: {
    ChartWrap,
    VEcharts,
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
        },
        series: [
          {
            name: "访问量",
            data: [120, 200, 150, 80, 70, 110, 130, 230, 100, 90, 135, 190],
            type: "bar",
            barWidth: "25px",
          },
        ],
        grid: {
          show: false,
          top: "20%",
          left: "10%",
          right: "5%",
          bottom: "10%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "#fff",
        },
        wrapWidth: "100%",
        wrapHeight: "100%",
      },
      title: "访问量",
      iconName: "issue-color",
    };
  },
};
</script>
