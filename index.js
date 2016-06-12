import create from './core/create'
import { start } from './core/router'
import modal from './modules/modal'

var route = {
  create : create,
  start : start,
  modal : modal,
  routes : {},
  t : {
    link : [],
    back : [],
    tap : []
  }
}

export default route
