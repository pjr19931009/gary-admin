<template>
  <div class="export-container" :class="[{ 'theme-bg': theme === 'dark' }]">
    <template v-if="routePath === 'Excel'">
      <el-select v-model="bookType" placeholder="请选择">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="exportExcel">导出excel</el-button>
    </template>

    <template v-if="routePath === 'Zip'">
      <el-button type="primary" @click="exportZip">导出zip</el-button>
    </template>

    <template v-if="routePath === 'PDF'">
      <el-button type="primary" @click="exportPDF">导出PDF</el-button>
    </template>

    <article-table :data="data" @selection="selection" />
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
      bookType: "xlsx",
      selectData: [],
      selectOptions: [
        { value: "xlsx", label: "xlsx" },
        { value: "csv", label: "csv" },
        { value: "txt", label: "txt" },
      ],
    };
  },
  methods: {
    ...mapActions("article", ["getArticle"]),
    async articleRequest() {
      const { list } = await this.getArticle();
      this.data = list;
    },
    exportExcel() {
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "id",
          "title",
          "sentence",
          "author",
          "readings",
          "date",
        ];
        const filterVal = [
          "id",
          "title",
          "sentence",
          "author",
          "readings",
          "date",
        ];
        const list = this.selectData.length > 0 ? this.selectData : this.data;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: "excel-list", //非必填
          autoWidth: true, //非必填
          bookType: this.bookType, //非必填
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
    selection(selection) {
      this.selectData = selection;
    },
    exportZip() {
      import("@/vendor/Export2Zip").then((zip) => {
        const list = this.selectData.length > 0 ? this.selectData : this.data;
        const filterVal = [
          "id",
          "title",
          "sentence",
          "author",
          "readings",
          "date",
        ];
        const data = this.formatJson(filterVal, list);
        const th = ["id", "title", "sentence", "author", "readings", "date"];
        const jsonData = data;
        const txtName = "text";
        const zipName = "zip-list";

        zip.export_txt_to_zip(th, jsonData, txtName, zipName);
      });
    },
    exportPDF() {
      window.print();
    },
  },
  computed: {
    routePath() {
      return this.$route.name;
    },
  },
  created() {
    this.articleRequest();
  },
};
</script>
<style lang="scss" scoped>
.export-container {
  height: 100%;
  background: #fff;

  .el-button,
  .el-select {
    margin: 10px;
  }
}
</style>
