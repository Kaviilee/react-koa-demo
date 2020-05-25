import Login from '../Login'
import TodoList from '../components/TodoList'
const routes = [{
    path: '/login',
    exact: true,
    component: Login,
    requireAuth: false
}, {
    path: '/todo',
    exact: true,
    component: TodoList,
    requireAuth: true
}]

export default routes