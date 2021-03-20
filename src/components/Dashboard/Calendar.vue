<template>
  <chart-wrap :title="title" :iconName="iconName">
    <template #chart>
      <div class="calendar" :class="[{ 'theme-bg': isdark }]">
        <v-calendar :is-dark="isdark" is-expanded :attributes="attrs" />
      </div>
    </template>
  </chart-wrap>
</template>

<script>
import ChartWrap from "../Common/ChartWrap";
import VCalendar from "v-calendar/lib/components/calendar.umd";
import VDatePicker from "v-calendar/lib/components/date-picker.umd";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  components: {
    ChartWrap,
    VCalendar,
    VDatePicker,
  },
  data() {
    const day = 86400000;
    return {
      title: "日历",
      iconName: "file-color",
      attrs: [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
        {
          bar: "red",
          dates: [
            new Date(new Date().valueOf() - day * 5),
            new Date(new Date().valueOf() + day * 5),
            new Date(new Date().valueOf() + day * 2),
          ],
          popover: {
            label: "noted something",
          },
        },
      ],
    };
  },
  computed: {
    isdark() {
      return this.theme === "dark";
    },
  },
};
</script>

<style lang="postcss" scoped>
.calendar {
  height: 100%;
  padding: 10px;
  padding-top: 55px;
  box-sizing: border-box;
}
</style>
