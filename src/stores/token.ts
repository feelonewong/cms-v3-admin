import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ElMessage from 'element-plus/lib/components/message/index.js'

interface Token {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  user_id: string
}

export const useTokenStore = defineStore('mytoken', () => {
  const tokenJson = ref('')
  const token = computed<Token>(() => {
    try {
      return JSON.parse(tokenJson.value || localStorage.getItem('TokenInfo') || '{}')
    } catch (err) {
      ElMessage.error('JSON字符串格式不对,转化对象时失败.')
      localStorage.setItem('TokenInfo', '')

      throw err
    }
  })
  function saveToken(data: string) {
    tokenJson.value = data
    localStorage.setItem('TokenInfo', data)
  }
  return {
    token,
    saveToken
  }
})
