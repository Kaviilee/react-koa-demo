import { Hello } from '@components/Hello'
import Login from '@components/Login'
import TodoList from '@components/TodoList'

type RoutesItem = {
    key?: string | number,
    path: string,
    exact: boolean,
    requireAuth?: boolean,
    authPath?: string,
    component: any
}

const routes: RoutesItem[] = [{
    path: '/hello',
    exact: true,
    component: Hello,
    requireAuth: false
}, {
    path: '/login',
    exact: true,
    component: Login
}, {
    path: '/todo',
    exact: true,
    component: TodoList
}]

export default routes
