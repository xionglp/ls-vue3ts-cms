<template>
  <div class="page-search">
    <ls-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon class="el-icon--left"><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
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
  emits: ["queryBtnClick", "resetBtnClick"],
  setup(props, { emit }) {
    // const formData = ref({
    //   id: "",
    //   name: "",
    //   password: "",
    //   sport: "",
    //   createTime: ""
    // })

    // 双向绑定的属性应该由配置文件的field决定
    // 1.formData中的属性动态获取
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ""
    }
    const formData = ref(formOriginData)

    // 2.点击重置，formData置为空
    const handleResetClick = () => {
      formData.value = formOriginData
      emit("resetBtnClick")
    }

    // 3.点击搜索
    const handleQueryClick = () => {
      console.log("-----")
      emit("queryBtnClick", formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
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
