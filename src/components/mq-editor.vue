<template>
  <div>
    <quilleditor
      v-model="content"
      ref="myTextEditor"
      :options="editorOption"
      @change="onChange"
      class="ql-editor"
    >
      <div id="toolbar" slot="toolbar">
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <!-- Add subscript and superscript buttons -->
        <span class="ql-formats">
          <button class="ql-script" value="sub"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-script" value="super"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-bold"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-italic"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-blockquote"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-list" value="ordered"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-link"></button>
        </span>
        <span class="ql-formats">
          <button type="button" @click="imgClick" style="outline:none">
            <svg viewBox="0 0 18 18">
              <rect class="ql-stroke" height="10" width="12" x="3" y="4" />
              <circle class="ql-fill" cx="6" cy="7" r="1" />
              <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12" />
            </svg>
          </button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-video"></button>
        </span>
      </div>
    </quilleditor>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import axios from "axios";
export default {
  name: "v-editor",
  props: {
    value: {
      type: String,
    },
    /*上传图片的地址*/
    uploadUrl: {
      type: String,
      default: "http://106.75.154.40:9005/information/upload/",
    },
    /*上传图片的file控件name*/
    fileName: {
      type: String,
      default: "file",
    },
    maxUploadSize: {
      type: Number,
      default: 1024 * 1024 * 500,
    },
  },
  data() {
    return {
      originalPicList: [],
      newPicList: [],
      content: "",
      editorOption: {
        modules: {
          toolbar: "#toolbar",
        },
      },
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.content, this.originalPicList);
    },
    /*选择上传图片切换*/
    onFileChange(e) {
      var fileInput = e.target;
      if (fileInput.files.length === 0) {
        return;
      }
      this.editor.focus();
      if (fileInput.files[0].size > this.maxUploadSize) {
        this.$alert("图片不能大于500KB", "图片尺寸过大", {
          confirmButtonText: "确定",
          type: "warning",
        });
      }
      var data = new FormData();
      data.append(this.fileName, fileInput.files[0]);
      console.log(this.uploadUrl);
      axios.post(this.uploadUrl, data).then((response) => {
        // response.flag = true; //-
        // response.data = "https://img-blog.csdnimg.cn/2019091813595558.png"; //-
        response = response.data;
        if (response.flag) {
          this.originalPicList.push(response.data);
          this.editor.insertEmbed(
            this.editor.getSelection().index,
            "image",
            response.data
          );
        }
      });
    },
    /*点击上传图片按钮*/
    imgClick() {
      if (!this.uploadUrl) {
        console.log("no editor uploadUrl");
        return;
      }
      /*内存创建input file*/
      var input = document.createElement("input");
      input.type = "file";
      input.name = this.fileName;
      input.accept = "image/jpeg,image/png,image/jpg,image/gif";
      input.onchange = this.onFileChange;
      input.click();
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
  },
  components: {
    quilleditor: quillEditor,
  },
  mounted() {
    this.content = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      console.log(newVal);
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>

  

</style>
