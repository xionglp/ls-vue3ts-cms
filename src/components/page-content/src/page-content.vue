<template>
  <div class="page-content">
    <ls-table
      :listData="dataList"
      :listCount="dataCount"
      :propList="contentTableConfig.propList"
      :showIndexColumn="contentTableConfig.showIndexColumn"
      :showSelectColumn="contentTableConfig.showSelectColumn"
      :childrenProps="contentTableConfig.childrenProps"
      :showFooter="contentTableConfig.showFooter"
      :title="contentTableConfig.title"
      v-model:page="pageInfo"
      @selectionChange="selectionChange"
    >
      <!-- 1. header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="handleNewClick">
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
      <template #handler="scope">
        <div class="handle-btns">
          <el-button link v-if="isUpdate" @click="handleEditClick(scope.row)">
            <el-icon class="el-icon--left"><EditPen /></el-icon>
            编辑
          </el-button>
          <el-button link v-if="isDelete" @click="handleDeleteClick(scope.row)">
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
import { usePermission } from "@/hooks/use-permission"

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
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, "create")
    const isUpdate = usePermission(props.pageName, "update")
    const isDelete = usePermission(props.pageName, "delete")
    const isQuery = usePermission(props.pageName, "query")

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })

    // 2.发动网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch("systemModule/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
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

    // 4.获取其他的动态插槽名
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      // if (item.slotName === "status") return false
      if (item.slotName === "createAt") return false
      if (item.slotName === "updateAt") return false
      if (item.slotName === "handler") return false
      return true
    })

    // 5.删除/编辑/新增操作
    const handleDeleteClick = (item: any) => {
      console.log(item.id)
      store.dispatch("systemModule/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleNewClick = () => {
      emit("newBtnClick")
    }

    const handleEditClick = (item: any) => {
      emit("editBtnClick", item)
    }

    return {
      selectionChange,
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
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
