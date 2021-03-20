<template>
  <menu-page :title="$route.name"></menu-page>
</template>

<script>
import MenuPage from "@/components/Common/MenuPage";
export default {
  components: {
    MenuPage
  },
};
</script>
