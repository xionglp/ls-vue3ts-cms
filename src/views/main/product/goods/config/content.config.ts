export const contentTableConfig: any = {
  title: "商品列表",
  propList: [
    { prop: "name", label: "商品名称", minWidth: "100" },
    { prop: "oldPrice", label: "原价格", minWidth: "100", slotName: "oldPrice" },
    { prop: "newPrice", label: "现价格", minWidth: "100", slotName: "newPrice" },
    { prop: "imgUrl", label: "商品图片", minWidth: "100", slotName: "image" },
    { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "250",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "250",
      slotName: "updateAt"
    },
    { prop: "", label: "操作", minWidth: "140", slotName: "handler" }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
