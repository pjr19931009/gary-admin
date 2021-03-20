<template>
  <div>
    <el-button @click="show = !show">Custom</el-button>

    <!-- 选择进入过渡 -->
    <template>
      <el-select v-model="enterClass" placeholder="请选择" class="box">
        <el-option
          v-for="(item, index) in enterClassList"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </template>

    <!-- 选择退出过渡 -->
    <template>
      <el-select v-model="outClass" placeholder="请选择" class="box">
        <el-option
          v-for="(item, index) in outClassList"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </template>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition
        name="custom-classes-transition"
        :enter-active-class="enter"
        :leave-active-class="out"
      >
        <div v-show="show" class="transition-box">Custom</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    enterClass: "animate__bounceIn",
    outClass: "animate__backOutUp",
    enterClassList: [
      "animate__backInDown",
      "animate__backInLeft",
      "animate__backInRight",
      "animate__backInRight",
      "animate__bounceIn",
      "animate__bounceInDown",
      "animate__bounceInLeft",
      "animate__bounceInRight",
      "animate__bounceInUp",
      "animate__fadeIn",
      "animate__fadeInDown",
      "animate__fadeInDownBig",
      "animate__fadeInLeft",
      "animate__fadeInLeftBig",
      "animate__fadeInRight",
      "animate__fadeInRightBig",
      "animate__fadeInUp",
      "animate__fadeInUpBig",
      "animate__fadeInTopLeft",
      "animate__fadeInTopRight",
      "animate__fadeInBottomLeft",
      "animate__fadeInBottomRight",
      "animate__rotateIn",
      "animate__rotateInDownLeft",
      "animate__rotateInDownRight",
      "animate__rotateInUpLeft",
      "animate__rotateInUpRight",
      "animate__zoomIn",
      "animate__zoomInDown",
      "animate__zoomInLeft",
      "animate__zoomInRight",
      "animate__zoomInUp",
      "animate__slideInDown",
      "animate__slideInLeft",
      "animate__slideInRight",
      "animate__slideInUp"
    ],
    outClassList: [
      "animate__backOutDown",
      "animate__backOutLeft",
      "animate__backOutRight",
      "animate__backOutUp",
      "animate__bounceOut",
      "animate__bounceOutDown",
      "animate__bounceOutLeft",
      "animate__bounceOutRight",
      "animate__bounceOutUp",
      "animate__fadeOut",
      "animate__fadeOutDown",
      "animate__fadeOutDownBig",
      "animate__fadeOutLeft",
      "animate__fadeOutLeftBig",
      "animate__fadeOutRight",
      "animate__fadeOutRightBig",
      "animate__fadeOutUp",
      "animate__fadeOutUpBig",
      "animate__fadeOutTopLeft",
      "animate__fadeOutTopRight",
      "animate__fadeOutBottomRight",
      "animate__fadeOutBottomLeft",
      "animate__rotateOut",
      "animate__rotateOutDownLeft",
      "animate__rotateOutDownRight",
      "animate__rotateOutUpLeft",
      "animate__rotateOutUpRight",
      "animate__zoomOut",
      "animate__zoomOutDown",
      "animate__zoomOutLeft",
      "animate__zoomOutRight",
      "animate__zoomOutUp",
      "animate__slideOutDown",
      "animate__slideOutLeft",
      "animate__slideOutRight",
      "animate__slideOutUp"
    ],
    value: ""
  }),
  inject: ["reload"],
  computed: {
    enter() {
      return `animate__animated ${this.enterClass}`;
    },
    out() {
      return `animate__animated ${this.outClass}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

::v-deep .box {
  margin: 0 10px;
}
</style>
