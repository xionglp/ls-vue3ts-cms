<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="users"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

import pageSearch from "@/components/page-search"
import pageContent from "@/components/page-content"

export default defineComponent({
  name: "user",
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less">
:deep(.el-button.is-link) {
  color: #409eff;
}
</style>
