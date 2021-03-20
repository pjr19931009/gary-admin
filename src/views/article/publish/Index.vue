<template>
  <div
    class="article-publish"
    :class="[{ 'theme-bg theme-font': theme === 'dark' }]"
  >
    <div class="header">
      <input
        type="text"
        class="title"
        :class="[{ 'theme-bg': theme === 'dark' }]"
        placeholder="TITLE"
        v-model="title"
      />
    </div>

    <date-picker class="info" @date-change="dateChange" />

    <div class="art info">
      <span class="art-name">作者： </span>
      <el-input
        placeholder="请输入作者"
        prefix-icon="el-icon-user"
        v-model="art"
        class="art-input"
      >
      </el-input>
    </div>

    <div class="rich-text">
      <quill-editor
        class="editor"
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
      />
    </div>

    <div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>

    <el-button type="primary">提交</el-button>

    <div>{{ data }}</div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import DatePicker from "@/components/Article/DatePicker";
import themeMixin from "utils/theme";
export default {
  mixins: [themeMixin],
  components: {
    quillEditor,
    DatePicker,
  },
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
        },
        placeholder: "Compose an epic...",
        readOnly: false,
        theme: "snow",
      },
      art: "",
      date: "",
      title: "",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {
    data() {
      return {
        content: this.content,
        art: this.art,
        date: this.date,
        title: this.title,
      };
    },
  },
  mounted() {
    // console.log(this.editor);
    // var Clipboard = this.editor.import("modules/clipboard");
  },
  methods: {
    dateChange(date) {
      this.date = date;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.article-publish {
  height: calc(100vh - 120px);
  padding: 0 10px;
  box-sizing: border-box;
  background: $white;

  .header {
    width: 100%;
    padding: 40px 50px;
    box-sizing: border-box;

    .title {
      width: 100%;
      text-align: center;
      outline: none;
      border: none;
      border-bottom: 1px solid #eee;
      background: $white;
    }
  }

  .rich-text {
    display: flex;
    flex-direction: column;
    .editor {
      height: 100%;
    }
  }

  .info {
    width: 320px;
    display: inline-block;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
    text-align: right;
  }
}

::v-deep .ql-container {
  height: 280px;
}

::v-deep .art-input {
  width: 220px;
  display: inline-block;
}
</style>
