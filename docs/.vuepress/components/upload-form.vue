<template>
  <agel-form v-model="form" class="demo border"></agel-form>
</template>
 
<script>
export default {
  name: "upload-form",
  data() {
    return {
      form: {
        labelWidth: "100px",
        span: 18,
        data: {
          files1: [
            {
              name: "这是一个图片文件.jpeg",
              url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
            {
              name: "这是一个视频文件.mp4",
              url: "https://www.runoob.com/try/demo_source/movie.mp4",
            },
            {
              name: "这是一个音频文件.mp3",
              url: "https://www.runoob.com/try/demo_source/horse.mp3",
            },
            {
              name: "这是一个docx文件.docx",
              url: "https://view.xdocin.com/doc/preview.docx",
            },
            {
              name: "这是一个不可预览文件.zip",
              url: "/xxx.zip",
            },
            {
              name: "这是一个没有预览弹窗文件.png",
              url: "",
            },
          ],
          // v.0.3.37 更新，支持 string类型的 value
          files2:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          files3: [
            {
              url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            },
          ],
        },
        items: {
          files1: {
            label: "默认样式",
            component: "el-upload",
            action: "/xxx/upload",
            tip: "点击 file list 查看预览样式,且最大只能上传 10kb 大小",
            limitSize: 10,
            preview: (file) => (file.url ? true : false),
            onSuccess: (res) => {
              // 需要 return 一个包含 name，url 的对象 {name:"xx.jpg",url:'http://xxx.jpg}
              return { name: res.data.fileName, url: res.data.fileUrl };
            },
            onRemove: (file, filelist) => {
              console.log(file, filelist);
            },
          },
          files2: {
            label: "picture-card 样式",
            component: "el-upload",
            action: "/xxx/upload",
            listType: "picture-card",
            limit: 1,
            limitHide: true, // 超出允许上传个数，隐藏上传按钮
            tip: "最大只能上传一个，超出自动隐藏上传按钮",
            onSuccess: (res) => {
              //  v.0.3.37 更新，支持 string类型的 value
              return res.data.fileUrl;
            },
          },
          files3: {
            label: "picture 样式",
            component: "el-upload",
            action: "/xxx/upload",
            listType: "picture",
          },
          files4: {
            label: "拖拽样式",
            component: "el-upload",
            action: "/xxx/upload",
            drag: true,
          },
          files5: {
            label: "手动上传",
            component: "el-upload",
            action: "/xxx/upload",
            autoUpload: false,
            slots: {
              trigger: () => {
                return <el-button>自定义选取文件</el-button>;
              },
              default: () => {
                return (
                  <el-button
                    style="margin-left:10px"
                    onClick={() => this.form.getRef("files5").submit()}
                  >
                    自定义上传到服务器
                  </el-button>
                );
              },
            },
          },
        },
      },
    };
  },
};
</script>

