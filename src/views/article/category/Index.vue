<template>
  <div class="page-content" :class="[{ 'dark-page': theme === 'dark' }]">
    <table-bar :showTop="false" :columns="columns" @changeColumn="changeColumn">
      <div slot="top">
        <el-form label-width="82px">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="分类名称：">
                <el-input placeholder="分类名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="文章数量：">
                <el-input placeholder="文章数量"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="分类ID：">
                <el-input placeholder="分类ID"></el-input>
              </el-form-item>
            </el-col>

            <el-row
              :xs="24"
              :sm="12"
              :lg="6"
              style="float: right; margin-right: 10px"
            >
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-row>
          </el-row>
        </el-form>
      </div>
      <div slot="bottom">
        <el-button type="primary" plain @click="showDialog('add')"
          >新增分类</el-button
        >
      </div>
    </table-bar>

    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      :header-row-class-name="tableRowClassName"
    >
      <el-table-column label="分类" style="display: flex">
        <template slot-scope="scope">
          <svg-icon :icon-name="scope.row.icon" />
          <span style="margin-left: 5px">
            {{ scope.row.title }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="number" label="文章数量" show-overflow-tooltip />
      <el-table-column prop="date" label="创建时间" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" width="150px">
        <template>
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="showDialog('edit')"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            class="el-btn-red"
            @click="deleteClassify()"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogTitle"
      width="500px"
      :visible.sync="dvEdit"
      top="30vh"
    >
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="分类">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dvEdit = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TableBar from "@/components/Article/TableBar";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  components: {
    TableBar,
  },
  data() {
    return {
      dvEdit: false,
      dialogTitle: "",
      form: {
        name: "",
      },
      tableData: [
        {
          icon: "vue",
          title: "Vue",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "React",
          title: "React",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "flutter-fill",
          title: "Flutter",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "html",
          title: "HTML",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "CSS",
          title: "CSS",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "js",
          title: "js",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "java",
          title: "java",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "xiaoxiong-",
          title: "Golang",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "05huiyipeixunjiyao",
          title: "总结",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "MySQL",
          title: "MySQL",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "git",
          title: "Git",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "linux",
          title: "Linux",
          number: 20,
          date: "2020-03-12",
        },
        {
          icon: "nginx",
          title: "Nginx",
          number: 20,
          date: "2020-03-12",
        },
      ],
      columns: [
        { name: "分类", show: true },
        { name: "文章数量", show: true },
        { name: "创建时间", show: true },
        { name: "状态", show: true },
      ],
    };
  },
  methods: {
    showDialog(type) {
      this.dvEdit = true;
      this.dialogTitle = type === "add" ? "新增分类" : "编辑分类";
    },
    onSubmit() {
      this.dvEdit = false;
    },
    deleteClassify(scope) {
      this.$confirm("您确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {})
        .catch(() => {});
    },
    changeColumn(columns) {
      this.columns = columns;
      this.$refs.table.doLayout();
    },
    tableRowClassName() {
      return this.theme === "dark" ? "dark" : "default";
    },
  },
};
</script>

<style lang="scss" scoped>
.page-content {
  .svg-icon {
    width: 1.8em;
    height: 1.8em;
    vertical-align: -8px;
    fill: currentColor;
    overflow: hidden;
  }
}

::v-deep .dark {
  background: $black;

  th {
    border-bottom: 1px solid #333;
    background: $black;
  }

  td {
    border-bottom: 1px solid #333;
  }
}

.dark-page {
  ::v-deep .el-table,
  ::v-deep .el-table__fixed-right {
    &::before {
      background-color: #333;
    }
  }
}
</style>
