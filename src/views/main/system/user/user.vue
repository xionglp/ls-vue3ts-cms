<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" @queryBtnClick="queryBtnClick" @resetBtnClick="resetBtnClick"></page-search>
    <page-content ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="users"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"

// import { usePageSearch } from "@/hooks/use-page-search"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // const [pageContentRef, queryBtnClick, resetBtnClick]: any[] = usePageSearch()

    const pageContentRef = ref<InstanceType<typeof PageContent>>()

    const queryBtnClick = (queryInfo: any) => {
      console.log("查询--", queryInfo)
      pageContentRef.value?.getPageData(queryInfo)
    }

    const resetBtnClick = () => {
      pageContentRef.value?.getPageData()
    }

    return {
      searchFormConfig,
      contentTableConfig,
      resetBtnClick,
      queryBtnClick,
      pageContentRef
    }
  }
})
</script>

<style scoped lang="less">
:deep(.el-button.is-link) {
  color: #409eff;
}
</style>
