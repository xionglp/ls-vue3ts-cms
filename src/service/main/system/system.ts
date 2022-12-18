import lsRequest from "@/service"
import { IDataType } from "@/service/type"

// 获取页面列表数据
export function getPageListData(url: string, queryInfo: any) {
  return lsRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除数据
// users/id
export function deletePageData(url: string) {
  return lsRequest.delete<IDataType>({
    url: url
  })
}
