<template>
  <div class="page-search">
    <ls-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button>
            <el-icon class="el-icon--left"><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary">
            <el-icon class="el-icon--left"><Search /></el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </ls-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LsForm from "@/base-ui/form/src/form.vue"

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    LsForm
  },
  setup() {
    const formData = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      createTime: ""
    })

    return {
      formData
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
