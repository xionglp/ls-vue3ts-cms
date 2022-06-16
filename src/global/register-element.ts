import { App } from "vue"

import { ElButton, ElAside, ElTable, ElInput, ElButtonGroup, ElAlert } from "element-plus"

const components = [ElButton, ElAlert, ElAside, ElButtonGroup, ElInput, ElTable]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
