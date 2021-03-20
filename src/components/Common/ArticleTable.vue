<template>
  <div class="article-table">
    <div v-if="showOperation">{{ idList }}</div>
    <el-table
      :data="newList"
      border
      style="width: 100%"
      @select="selectRow"
      :row-class-name="tableRowClassName"
      :header-row-class-name="tableRowClassName"
    >
      <el-table-column prop="date" label="日期" align="center" type="selection">
      </el-table-column>
      <el-table-column prop="id" label="id" align="center" width="50">
      </el-table-column>
      <el-table-column prop="title" label="标题">
        <template v-slot="scope">
          <span v-if="edit !== scope.row.id">
            {{ scope.row.title }}
          </span>
          <el-input v-model="scope.row.title" v-else></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" align="center" width="100">
      </el-table-column>
      <el-table-column
        prop="readings"
        label="阅读量"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="date" label="日期" align="center" width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="250"
        v-if="showOperation"
        class-name="tools-column"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="edit !== scope.row.id"
            >编辑</el-button
          >

          <el-button
            size="mini"
            type="success"
            @click="confirm(scope.$index, scope.row)"
            v-else
            >确定</el-button
          >

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >

          <div class="icon-wrap pointer">
            <svg-icon icon-name="move" icon-class="drag-icon" />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  data() {
    return {
      newList: [],
      idList: [],
      edit: "",
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    showOperation: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    data: {
      handler: function (newValue, oldValue) {
        this.newList = this.data;
        this.idList = this.sortID(newValue);
      },
      immediate: true,
    },
  },
  methods: {
    selectRow(selection, row) {
      this.$emit("selection", selection);
    },
    handleEdit(index, item) {
      this.edit = item.id;
    },
    handleDelete(index, item) {
      const id = item.id;
      this.$notify({
        title: "删除成功",
        message: "删除成功",
      });
      this.data.map((item, index) => {
        if (item.id === id) {
          this.data.splice(index, 1);
        }
      });
    },
    sortID(list) {
      return list.map((item) => item.id);
    },
    confirm(index, item) {
      this.edit = "";
    },
    tableRowClassName() {
      return this.theme === "dark" ? "dark table-row" : "table-row";
    },
  },
  mounted() {
    const context = this;
    let el = document.querySelectorAll(
      ".el-table__body-wrapper > table > tbody"
    )[0];
    let sortable = Sortable.create(el, {
      onEnd: (evt) => {
        context.newList = context.data;
        const tempIndex = context.newList.splice(evt.oldIndex, 1)[0];
        context.newList.splice(evt.newIndex, 0, tempIndex);
        context.idList = this.sortID(context.newList);
      },
    });
  },
};
</script>
<style lang="scss" scoped>
.article-table {
  padding: 10px;
}
.icon-wrap {
  display: inline-block;
  width: 25px;
  height: 25px;
}
.drag-icon {
  width: 25px;
  height: 25px;
  padding: 0 10px;
}
::v-deep .tools-column {
  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

::v-deep .table-row {
  height: 50px;
}

::v-deep .dark.table-row {
  background: $black !important;
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
</style>
