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
import { rules } from "../config/account-config"
import { ElForm } from "element-plus"

export default defineComponent({
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const account = reactive({
      username: "",
      password: ""
    })

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log("执行登录操作")
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
