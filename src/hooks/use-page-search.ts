import { ref } from "vue"
import PageContent from "@/components/page-content"

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const queryBtnClick = (queryInfo: any) => {
    console.log("查询--", queryInfo)
    pageContentRef.value?.getPageData(queryInfo)
  }

  const resetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }

  return [pageContentRef, resetBtnClick, queryBtnClick]
}
