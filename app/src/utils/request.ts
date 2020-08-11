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

export default request
