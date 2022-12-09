import lsRequest from "@/service"
import { IDataType } from "@/service/type"

export function getPageListData(url: string, queryInfo: any) {
  return lsRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
