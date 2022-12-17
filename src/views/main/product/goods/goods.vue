<template>
  <div class="goods">
    <PageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #status="scope">
        <el-button size="small" plain :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #image="scope">
        <el-image
          :src="scope.row.imgUrl"
          style="width: 45px; height: 45px"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope"> {{ "¥ " + scope.row.oldPrice }}</template>
      <template #newPrice="scope"> {{ "¥ " + scope.row.newPrice }}</template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PageContent from "@/components/page-content"
import { contentTableConfig } from "./config/content.config"

export default defineComponent({
  name: "goods",
  components: {
    PageContent
  },
  setup() {
    return {
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
