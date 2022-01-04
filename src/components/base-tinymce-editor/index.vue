<template>
  <vue-tinymce
    id="meet"
    name="meet"
    placeholder="20000个字符以内"
    v-model="contents"
    :setting="setting"
    @change="change"
  />
</template>

<script>
  import {VueTinymce} from '@packy-tang/vue-tinymce'
  import '../../../public/tinymce/langs/zh_CN.js'
  import commonReq from "@/api/public/commonReq.js"

  export default {
    name: "BaseTinymceEditor",
    components: {VueTinymce},
    props: {
      value: {
        type: String,
        default: '',
        request: true
      },
      isImage: {
        type: String,
        default: ''
      }
    },
    watch: {
      value: {
        handler (newName) {
          this.contents = newName
        },
        immediate: true
      },
      isImage: {
        handler (newName) {
          if(this.isImage=='1'){
            this.setting.toolbar="numlist bullist | styleselect | forecolor backcolor  |  removeformat |"
          }else{
            this.setting.toolbar="bold italic underline | numlist bullist |H2 alignleft aligncenter alignright alignjustify | forecolor backcolor | image  |  removeformat |"
          }

        },
        immediate: true
      }
    },
    data () {
      return {
        contents: this.value,
        setting: {
          menubar: false,
          paste_data_images: false, // 设置为“true”将允许粘贴图像，而将其设置为“false”将不允许粘贴图片
          // toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
          toolbar: "bold italic underline | numlist bullist | alignleft aligncenter alignright alignjustify | forecolor backcolor | image  |  removeformat | styleselect link unlink |",
          toolbar_drawer: "sliding",
          quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
          plugins: "preview",
          language_url: '@/tinymce/langs/zh_CN.js',// 语言包的路径
          language: 'zh_CN',
          height: 350,
          style_formats: [
            {
              title: "行高",
              items: [
                { title: "1", block: "p", styles: { "line-height": "1" } },
                { title: "1.5", block: "p", styles: { "line-height": "1.5" } },
                { title: "1.75", block: "p", styles: { "line-height": "1.75" } },
                { title: "2", block: "p", styles: { "line-height": "2" } },
                { title: "3", block: "p", styles: { "line-height": "3" } },
                { title: "4", block: "p", styles: { "line-height": "4" } },
                { title: "5", block: "p", styles: { "line-height": "5" } }
              ]
            }
          ],
          style_formats_merge: true, //设置行高
          style_formats_autohide: true, //设置行高
          // init_instance_callback : function(editor) {
          //   console.log("ID为: " + editor.id + " 的编辑器已初始化完成")
          // },
          images_upload_handler: (blobInfo, success, failure) => {
            if(blobInfo.blob().name){
              this.handleImgUpload(blobInfo, success, failure)
            }
          },
          init_instance_callback: editor => {
            if (this.value) {
              editor.setContent(this.value)
            }
            this.hasInit = true
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.hasChange = true
              // const val = editor.getContent().replace(/<p><img\s?src="data.*?<\/p>/g, '')
              this.$emit('input', editor.getContent())
            })
            editor.on('paste', (evt) => {
              // 监听粘贴事件
              this.onPaste(evt)
            })
          },
          setup(editor) {
            editor.on('FullscreenStateChanged', (e) => {
              this.fullscreen = e.state
            })
          },
          convert_urls: false
        }

      }
    },

    methods: {
      onPaste(event) {
        // 实现图片粘贴上传
        const items = (event.clipboardData || window.clipboardData).items

        // 搜索剪切板items 只取第一张
        if (items[0].type.indexOf('image') !== -1) {
          console.log('粘贴的是图片类型')
          // const timestamp = new Date().getTime()
          // const file = items[0].getAsFile()
          // const formData = new FormData()
          let file = items[0].getAsFile()
          let timestamp = new Date().getTime()
          let formData = new FormData()
          formData.set('file', file)
          formData.set('bizId', timestamp)
          formData.set('bizType', 'editorFile')

          // 上传图片
          // UpLoadImg(formData).then(res => {
          //   console.log(res)
          //   if (res.code === 200) {
          //     // 放到内容当中
          //     window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${res.data.image}" >`)
          //   } else {
          //     this.$message.error('图片上传失败,联系开发人员')
          //   }
          // })
          commonReq.uploadFile(formData).then(response => {
            const res = response
            // if (res.code === 0) {
            this.value = this.contents.replace(/<p><img\s?src="data.*?<\/p>/g, '')
            window.tinymce.get(this.tinymceId).setContent(`<img class="wscnph" src="${res.downloadUrlByUrl}" >`)
            // }else{
            //   this.$message.error('图片上传失败,联系开发人员')
            // }
          }).catch(res => {
            // console.log("catch")
          })
        } else {
          console.log('粘贴的不是图片，不能上传')
        }
      },

      change (editor) {
        this.$emit('input', editor)
      },
      // 附件上传接口
      handleImgUpload (blobInfo, success, failure) {
        let timestamp = new Date().getTime()
        let formdata = new FormData()
        formdata.set('file', blobInfo.blob())
        formdata.set('bizId', timestamp)
        formdata.set('bizType', 'editorFile')
        commonReq.uploadFile(formdata).then(response => {
          const res = response
          success(res.url)
        }).catch(res => {
          failure('error')
        })
      },
    }
  }
</script>
