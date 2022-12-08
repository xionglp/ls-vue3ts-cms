<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { searchFormConfig } from "./config/search.config"
import pageSearch from "@/components/page-search"

export default defineComponent({
  name: "user",
  components: {
    pageSearch
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
