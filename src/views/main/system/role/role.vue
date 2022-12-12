<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="role"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import pageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"

import { searchFormConfig } from "./config/search.congfig"
import { contentTableConfig } from "./config/content.config"

export default defineComponent({
  name: "role",
  components: {
    PageContent,
    pageSearch
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less">
:deep(.el-button.is-link) {
  color: #409eff;
}
</style>
