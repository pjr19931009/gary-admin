<template>
  <div
    class="table-container"
    :class="[{ 'theme-bg theme-font-1': theme === 'dark' }]"
  >
    <article-table
      :data="data"
      @selection="selection"
      :showOperation="showOperation"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ArticleTable from "@/components/Common/ArticleTable";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  components: {
    ArticleTable,
  },
  data() {
    return {
      data: [],
      showOperation: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions("article", ["getArticle"]),
    async articleRequest() {
      const { list } = await this.getArticle();
      this.data = list;
    },
    selection(selection) {
      this.selectData = selection;
    },
  },
  created() {
    this.articleRequest();
  },
};
</script>
<style lang="scss" scoped>
.table-container {
  height: 100%;
  background: #fff;
}
</style>
