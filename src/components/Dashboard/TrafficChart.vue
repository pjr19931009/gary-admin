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
import * as echarts from "echarts";
export default {
  components: {
    ChartWrap,
    VEcharts
  },
  data() {
    return {
      option: {
        color: ["#75D589", "#308FF0"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#333"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 2
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(177, 255, 165, 0.8)"
                },
                {
                  offset: 1,
                  color: "rgba(122, 191, 236, 0.3)"
                }
              ])
            },
            emphasis: {
              focus: "series"
            },
            data: [140, 232, 101, 264, 90, 340, 250]
          },
          {
            name: "Line 2",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 2
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(200, 221, 255 , 0.8)"
                },
                {
                  offset: 1,
                  color: "rgba(177, 170, 255, 0.3)"
                }
              ])
            },
            emphasis: {
              focus: "series"
            },
            data: [120, 282, 111, 234, 220, 340, 310]
          }
        ],
        wrapWidth: "100%",
        wrapHeight: "100%"
      },
      title: "流量趋势",
      iconName: "visualize-color"
    };
  }
};
</script>
