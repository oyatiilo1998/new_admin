
import Category from './category'
import Retailer from './retailer'

const children = [
  Category,
  Retailer
]

export default children.map(el => ({ ...el,
component: {
    name: 'RouteView',
    render: (h) => h('router-view')
  }
}))
