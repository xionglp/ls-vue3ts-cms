<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="queryBtnClick"
      @resetBtnClick="resetBtnClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button size="small" plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
    </page-content>

    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { modalConfig } from "./config/modal.config"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // const [pageContentRef, queryBtnClick, resetBtnClick]: any[] = usePageSearch()
    // page相关逻辑
    const pageContentRef = ref<InstanceType<typeof PageContent>>()
    const queryBtnClick = (queryInfo: any) => {
      console.log("查询--", queryInfo)
      pageContentRef.value?.getPageData(queryInfo)
    }
    const resetBtnClick = () => {
      pageContentRef.value?.getPageData()
    }

    // dialog 相关逻辑
    const pageModalRef = ref<InstanceType<typeof PageModal>>()
    const defaultInfo = ref<any>()

    const handleNewData = () => {
      defaultInfo.value = {}
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
      // 处理password输入框(显示)
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === "password"
      })
      passwordItem!.isHidden = false
    }

    const handleEditData = (item: any) => {
      defaultInfo.value = { ...item } // 浅拷贝
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
      // 处理password输入框(隐藏)
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === "password"
      })
      passwordItem!.isHidden = true
    }

    return {
      searchFormConfig,
      contentTableConfig,
      resetBtnClick,
      queryBtnClick,
      pageContentRef,
      handleNewData,
      modalConfig,
      pageModalRef,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less">
:deep(.el-button.is-link) {
  color: #409eff;
}
</style>
