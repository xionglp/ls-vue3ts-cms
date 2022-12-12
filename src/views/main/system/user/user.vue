<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <div class="content">
      <ls-table
        :propList="propList"
        :listData="userList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
        :title="title"
        @selectionChange="selectionChange"
      >
        <!-- 1. header中的插槽 -->
        <template #headerHandler>
          <el-button type="primary">
            <el-icon class="el-icon--left"><CirclePlus /></el-icon>
            新增
          </el-button>
        </template>

        <!-- 2. 列中的插槽 -->
        <template #status="scope">
          <el-button size="small" plain :type="scope.row.enable ? 'success' : 'danger'">{{ scope.row.enable ? "启用" : "禁用" }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
        </template>
        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #handler>
          <div class="handle-btns">
            <el-button link>
              <el-icon class="el-icon--left"><EditPen /></el-icon>
              编辑
            </el-button>
            <el-button link>
              <el-icon class="el-icon--left"><Delete /></el-icon>
              删除
            </el-button>
          </div>
        </template>

        <!-- 3. footer插槽， 不写就用内部默认的分页器 -->
      </ls-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { searchFormConfig } from "./config/search.config"
import pageSearch from "@/components/page-search"
import LsTable from "@/base-ui/table"
import { useStore } from "vuex"

export default defineComponent({
  name: "user",
  components: {
    pageSearch,
    LsTable
  },
  setup() {
    const store = useStore()
    store.dispatch("system/getPageListAction", {
      url: "/users/list",
      queryInfo: {
        offset: 0,
        size: 20
      }
    })

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)
    const showIndexColumn = true
    const showSelectColumn = true
    const title = "用户列表"

    const propList = [
      { prop: "name", label: "用户名", minWidth: "100" },
      { prop: "realname", label: "真实姓名", minWidth: "100" },
      { prop: "cellphone", label: "手机号码", minWidth: "100" },
      { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
      { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "createAt" },
      { prop: "updateAt", label: "更新时间", minWidth: "250", slotName: "updateAt" },
      { prop: "", label: "操作", minWidth: "120", slotName: "handler" }
    ]

    const selectionChange = (data: any) => {
      console.log("data:", data)
    }

    return {
      searchFormConfig,
      userList,
      userCount,
      propList,
      showIndexColumn,
      showSelectColumn,
      title,
      selectionChange
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}

:deep(.el-button.is-link) {
  color: #409eff;
}
</style>
