<template>
  <div class="title-container">
    <div class="title">
      <div class="title_context">{{ data }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      require: true,
    },
  },
};
</script>
<style lang='scss' scoped>
.title-container {
  position: relative;
  padding: 10px 0;
  box-sizing: border-box;

  .title_context {
    width: 30%;
    position: relative;
    text-align: center;
    line-height: 50px;
    background: #fff;
    margin: auto;
    font-size: 14px;
    color: $font-color-3;
  }

  .title::before {
    content: "";
    height: 2px;
    width: 80%;
    background: #ddd;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
