<template>
  <div class="user">
    <ls-form v-bind="searchFormConfig"></ls-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import LsForm from "@/base-ui/form/src/form.vue"
import { searchFormConfig } from "./config/search.config"

export default defineComponent({
  name: "user",
  components: {
    LsForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
