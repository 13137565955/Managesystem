import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  container,
  header,
  aside,
  main,
  menu,
  submenu,
  menuItem,
  breadcrumb,
  breadcrumbItem,
  card,
  Row,
  Col,
  table,
  tableColumn,
  Switch,
  tooltip,
  pagination,
} from 'element-ui'

Vue.use(pagination)
Vue.use(tooltip)
Vue.use(Switch)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(card)
Vue.use(breadcrumbItem)
Vue.use(breadcrumb)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(container)
Vue.use(header)
Vue.use(aside)
Vue.use(main)
Vue.use(menu)
Vue.use(submenu)
Vue.use(menuItem)
Vue.prototype.$message = Message