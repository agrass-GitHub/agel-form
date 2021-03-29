<template>
  <agel-form v-model="form" class="demo"></agel-form>
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
              name: "这是一个图片文件.png",
              url: "https://cn.vuejs.org/images/components.png",
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
          ],
          files2: [
            {
              name: "这是一个图片文件.png",
              url: "https://cn.vuejs.org/images/components.png",
            },
          ],
          files3: [
            {
              name: "这是一个图片文件.png",
              url: "https://cn.vuejs.org/images/components.png",
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
            onSuccess: () => {
              // 需要 return 一个包含 name，url 的对象 {name:"xx.jpg",url:'http://xxx.jpg}
              return res.data;
            },
          },
          files2: {
            label: "picture-card 样式",
            component: "el-upload",
            action: "/xxx/upload",
            listType: "picture-card",
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
            label: "主动上传",
            component: "el-upload",
            action: "/xxx/upload",
            autoUpload: false,
          },
          files6: {
            label: "插槽样式",
            component: "el-upload",
            action: "/xxx/upload",
            slots: {
              trigger: () => {
                return <el-button>自定义选取文件</el-button>;
              },
              default: () => {
                return (
                  <el-button style="margin-left:10px">
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
