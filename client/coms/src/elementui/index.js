import {
  Pagination, Dialog,
  Dropdown, DropdownItem, DropdownMenu,
  Input, InputNumber,
  Checkbox, Switch,
  Select, Option, Button,
  Table, TableColumn,
  Popover, Tooltip, Breadcrumb, BreadcrumbItem,
  Form, FormItem,
  Tabs, TabPane,
  Upload,
  Container, Main, Scrollbar,
  Popconfirm,
} from "element-ui"

const load = () => import('./el_coms.js')

const getElComponent = (name) => {
  return new Promise(resolve => {
    load().then(el => {
      console.log('el component loaded,', name)
      resolve(el.default[name])
    })
  })
}

// 使用懒加载的方法注册 elementui 组件
const registElComponent = (Vue, name) => {
  Vue.component(`El${name}`, () => getElComponent(name))
}

const element = {
  install: function (Vue) {
    Vue.use(Pagination)
    Vue.use(Dialog)
    Vue.use(Dropdown)
    Vue.use(DropdownItem)
    Vue.use(Input)
    Vue.use(InputNumber)
    Vue.use(Checkbox)
    Vue.use(Switch)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Popover)
    Vue.use(Tooltip)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Upload)
    Vue.use(Container)
    Vue.use(Main)
    Vue.use(Scrollbar)
    Vue.use(DropdownMenu);
    Vue.use(Popconfirm)

    // 使用懒加载的方法注册不会马上用到的 elementui 组件
    registElComponent(Vue, 'DatePicker')
    registElComponent(Vue, 'ColorPicker')
    registElComponent(Vue, 'Image')
    registElComponent(Vue, 'Menu')
    registElComponent(Vue, 'MenuItem')
    registElComponent(Vue, 'Submenu')
    registElComponent(Vue, 'Radio')
    registElComponent(Vue, 'RadioGroup')
    registElComponent(Vue, 'CheckboxGroup')
    registElComponent(Vue, 'Tree')
    registElComponent(Vue, 'Icon')
    registElComponent(Vue, 'Progress')
    registElComponent(Vue, 'Cascader')
    registElComponent(Vue, 'Slider')
    registElComponent(Vue, 'Card')
    registElComponent(Vue, 'Row')
    registElComponent(Vue, 'Col')
    registElComponent(Vue, 'Aside')
    registElComponent(Vue, 'Timeline')
    registElComponent(Vue, 'TimelineItem')

  }
}

export default element
