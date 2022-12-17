<template>
  <div class="page-content">
    <ls-table
      :listData="dataList"
      :listCount="dataCount"
      :propList="contentTableConfig.propList"
      :showIndexColumn="contentTableConfig.showIndexColumn"
      :showSelectColumn="contentTableConfig.showSelectColumn"
      :title="contentTableConfig.title"
      v-model:page="pageInfo"
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
      <!-- 在page-content插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- 3. footer插槽， 不写就用内部默认的分页器 -->
    </ls-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
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

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })

    // 2.发动网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("systemModule/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取数据
    const dataList = computed(() => {
      return store.getters[`systemModule/pageListData`](props.pageName)
    })
    const dataCount = computed(() => {
      return store.getters[`systemModule/pageListCount`](props.pageName)
    })

    const selectionChange = (data: any) => {
      console.log("data:", data)
    }

    // 4. 获取其他的动态插槽名
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      // if (item.slotName === "status") return false
      if (item.slotName === "createAt") return false
      if (item.slotName === "updateAt") return false
      if (item.slotName === "handler") return false
      return true
    })

    return {
      selectionChange,
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots
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
