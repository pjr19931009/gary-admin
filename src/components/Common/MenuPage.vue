<template>
  <div class="menu-page">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true }
  }
};
</script>
<style lang="scss" scoped>
.menu-page {
  width: 100%;
  height: calc(100vh - 110px);
  display: flex;
  background: #34495e;
  border-radius: 10px;
  font-size: 100px;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
