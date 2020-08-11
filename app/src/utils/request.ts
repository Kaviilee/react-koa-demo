export interface Config {
    body?: ArrayBuffer | ArrayBufferView | Blob | File | string | URLSearchParams | FormData
    cache?: RequestCache
    credentials?: RequestCredentials
    headers?: Headers
    method?: string
    mode?: RequestMode
    redirect?: RequestRedirect
    referrer?: string
}
const configs: Config = {
    headers: new Headers({
        'content-type': 'application/json'
    })
}
const token = sessionStorage.getItem('demo-token')
if (configs.headers && token) {
    configs.headers.set('Authorization', `Bearer ${token}`)
}


const _parseJSON = (response: Response) => {
    return response.text().then((text) => {
        return text ? JSON.parse(text) : {}
    })
}
const request = (url: string, config: Config): Promise<void | any> => {
    // console.log(url, config)
    return fetch(url, {
        body: config.body,
        credentials: config.credentials,
        headers: config.headers || configs.headers,
        method: config.method,
        mode: config.mode,
        redirect: config.redirect,
        referrer: config.referrer
    }).then((res: Response) => _parseJSON(res))
}

export const _post = (url: string, data?: Record<string, unknown>): Promise<void | any> => {
    return  fetch(url, {
        method: 'POST',
        headers: configs.headers,
        body: JSON.stringify(data)
    }).then((res: Response) => _parseJSON(res))
}

export const _put = (url: string, data?: Record<string, unknown>): Promise<void | any> => {
    return  fetch(url, {
        method: 'PUT',
        headers: configs.headers,
        body: JSON.stringify(data)
    }).then((res: Response) => _parseJSON(res))
}

export const _get = (url: string): Promise<void | any> => {
    return fetch(url, {
        method: 'GET',
        headers: configs.headers
    }).then((res: Response) => _parseJSON(res))
}

export const _delete= (url: string): Promise<void | any> => {
    return fetch(url, {
        method: 'DELETE',
        headers: configs.headers
    }).then((res: Response) => _parseJSON(res))
}

export default request
