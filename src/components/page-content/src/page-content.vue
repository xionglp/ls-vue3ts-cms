<template>
  <div class="page-content">
    <ls-table
      :listData="dataList"
      :propList="contentTableConfig.propList"
      :showIndexColumn="contentTableConfig.showIndexColumn"
      :showSelectColumn="contentTableConfig.showSelectColumn"
      :title="contentTableConfig.title"
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
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ scope.row.createAt }}</span>
        <!-- <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong> -->
      </template>
      <template #updateAt="scope">
        <span>{{ scope.row.updateAt }}</span>
        <!-- <span>{{ $filters.formatTime(scope.row.updateAt) }}</span> -->
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
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import LsTable from "@/base-ui/table"
import { useStore } from "@/store"

export default defineComponent({
  components: {
    LsTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    // 发动网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("systemModule/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const dataList = computed(() => {
      return store.getters[`systemModule/pageListData`](props.pageName)
    })

    const selectionChange = (data: any) => {
      console.log("data:", data)
    }
    return {
      selectionChange,
      dataList,
      getPageData
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
