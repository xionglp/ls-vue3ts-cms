<template>
  <div class="table">
    <el-table :data="listData" style="width: 100%" border>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as any,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.table {
  :deep(.el-table__row) {
    height: 55px;
  }
}
</style>
