<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, watchEffect } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus/lib/components/index.js'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      fieldName: 'file',
      server: 'http://39.97.218.60/boss/course/upload',
      customInsert: (res: any, insertFn: any) => {
        console.log(res.data.name)
        if (res.code === '000000') {
          insertFn(res.data.name)
        } else {
          ElMessage.error('富文本编辑器图片上传失败！')
          throw new Error('富文本编辑器图片上传失败！')
        }
      }
    }
  }
}
// 监听 modelValue 的变化，及时同步到编辑器
watchEffect(() => {
  valueHtml.value = props.modelValue
})
// 监听编辑器内容的变化，及时同步到 modelValue
watch(valueHtml, (val) => {
  emits('update:modelValue', val)
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
