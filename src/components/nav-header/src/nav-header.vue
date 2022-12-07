<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
    <div class="content">
      <ls-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import UserInfo from "./user-info.vue"
import LsBreadcrumb from "@/base-ui/breadcrumb"
import { pathMapToBreadcrumbs } from "@/utils/map-menus"

export default defineComponent({
  components: {
    UserInfo,
    LsBreadcrumb
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      console.log(isFold.value)
      emit("foldChange", isFold.value)
    }

    // 面包屑数据
    const store = useStore()
    const route = useRoute()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      const currentPath = route.path
      return pathMapToBreadcrumbs(userMenus, currentPath)
    })

    console.log("breadcrumbs: ", breadcrumbs.value)

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 24px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
