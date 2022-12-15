<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="item in propList" :key="item.name">
        <el-table-column align="center" v-bind="item">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ""
    },
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as any,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    }
  },
  emits: ["selectionChange"],
  setup(props, { emit }) {
    const currentPage = 2

    const handleSelectionChange = (value: any) => {
      console.log(value)
      emit("selectionChange", value)
    }

    const handleSizeChange = (value: any) => {
      console.log(value)
    }

    const handleCurrentChange = (value: any) => {
      console.log(value)
    }
    return {
      currentPage,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.table {
  :deep(.el-table__row) {
    height: 55px;
  }
}

.header {
  display: flex;
  height: 45px;
  padding: 0 5px 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  display: flex;
  justify-content: right;
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
