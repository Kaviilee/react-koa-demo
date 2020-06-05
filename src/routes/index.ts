import { Hello } from '@components/Hello'

type RoutesItem = {
    key: string | number,
    path: string,
    exact: boolean,
    requireAuth: boolean,
    authPath: string,
    component: any
}

const routes = [{
    path: '/hello',
    exact: true,
    component: Hello,
    requireAuth: false
}] as RoutesItem[]

export default routes
