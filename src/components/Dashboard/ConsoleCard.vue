<template>
  <div class="card-wrap">
    <el-row :gutter="gutter">
      <el-col
        :xs="responseSize.xs"
        :sm="responseSize.sm"
        :md="responseSize.md"
        :lg="responseSize.lg"
        :xl="responseSize.xl"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div
          class="col-box pointer"
          :class="[{ 'theme-bg': theme === 'dark' }]"
        >
          <svg-icon :icon-name="item.icon" icon-class="svg-icon"></svg-icon>
          <span class="des">{{ item.des }}</span>
          <count-to
            class="number"
            :startVal="item.startVal"
            :endVal="item.endVal"
            :duration="1500"
            separator=""
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import themeMixin from "utils/theme";
export default {
  name: "ConsoleCard",
  mixins: [themeMixin],
  components: {
    countTo,
  },
  data() {
    return {
      startVal: 0,
      responseSize: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 0 },
        md: { span: 8, offset: 0 },
        lg: { span: 4, offset: 0 },
        xl: { span: 4, offset: 0 },
      },
      gutter: 20,
      dataList: [
        {
          des: "总访问次数",
          icon: "issue-color",
          startVal: 0,
          duration: 1000,
          endVal: 9520,
        },
        {
          des: "在线访客数",
          icon: "visualize-color",
          startVal: 0,
          duration: 1000,
          endVal: 182,
        },
        {
          des: "点击量",
          icon: "amount-color",
          startVal: 0,
          duration: 1000,
          endVal: 8888,
        },
        {
          des: "文章数",
          icon: "file-color",
          startVal: 0,
          duration: 1000,
          endVal: 156,
        },
        {
          des: "留言数",
          icon: "chat-color",
          startVal: 0,
          duration: 1000,
          endVal: 1024,
        },
        {
          des: "待办任务",
          icon: "warning-color",
          startVal: 0,
          duration: 1000,
          endVal: 12,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background: transparent !important;

  .el-row {
    box-sizing: border-box;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      margin-bottom: 10px;
    }

    .col-box {
      height: 125px;
      font-size: 16px;
      line-height: 125px;
      text-align: center;
      box-sizing: border-box;
      background: #fff;
      display: flex;
      justify-content: space-evenly;
      padding: 0 40px;
      position: relative;
      border-radius: 8px;
      box-shadow: 0 0px 7px rgba(28, 76, 186, 0.08);
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 5px 20px rgba(28, 76, 186, 0.12);
      }

      .svg-icon {
        width: 2em;
        height: 2em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
        bottom: 0;
        left: 10%;
      }

      .number {
        color: #515a6e;
        font-size: 26px;
        line-height: 26px;
        margin: 0;
        position: absolute;
        bottom: 50%;
        right: 10%;
      }

      .des {
        color: #999999;
        font-size: 12px;
        line-height: 14px;
        height: 14px;

        position: absolute;
        bottom: 30%;
        right: 10%;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }
    }
  }
}
</style>
