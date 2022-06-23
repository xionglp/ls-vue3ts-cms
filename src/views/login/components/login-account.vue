<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { useStore } from "vuex"
import { rules } from "../config/account-config"
import { ElForm } from "element-plus"
import localCache from "@/utils/local-cache"

export default defineComponent({
  setup() {
    const store = useStore()
    const formRef = ref<InstanceType<typeof ElForm>>()
    const account = reactive({
      username: localCache.getCache("username") ?? "",
      password: localCache.getCache("password") ?? ""
    })

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log("执行登录操作")
          // 1. 判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache("username", account.username)
            localCache.setCache("password", account.password)
          } else {
            localCache.deleteCache("username")
            localCache.deleteCache("password")
          }

          // 2. 开始进行登录验证
          store.dispatch("loginModule/accountLoginAction", { ...account })
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
