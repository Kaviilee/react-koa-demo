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
const request = <T>(url: string, config: Config): Promise<T> => {
    // console.log(url, config)
    return fetch(url, {
        body: config.body,
        credentials: config.credentials,
        headers: config.headers || configs.headers,
        method: config.method,
        mode: config.mode,
        redirect: config.redirect,
        referrer: config.referrer
    }).then((res: Response) => _parseJSON(res) as Promise<T>)
        .catch((error: Error) => {
            throw error
        })
}

export const _post = <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
    return  fetch(url, {
        method: 'POST',
        headers: configs.headers,
        body: JSON.stringify(data)
    }).then((res: Response) => _parseJSON(res) as Promise<T>)
}

export const _put = (url: string, data?: Record<string, unknown>): Promise<void | any> => {
    return  fetch(url, {
        method: 'PUT',
        headers: configs.headers,
        body: JSON.stringify(data)
    }).then((res: Response) => _parseJSON(res))
}

export const _get = <T>(url: string): Promise<T> => {
    return fetch(url, {
        method: 'GET',
        headers: configs.headers
    }).then((res: Response) => _parseJSON(res) as Promise<T>)
}

export const _delete= (url: string): Promise<void | any> => {
    return fetch(url, {
        method: 'DELETE',
        headers: configs.headers
    }).then((res: Response) => _parseJSON(res))
}

export default request
