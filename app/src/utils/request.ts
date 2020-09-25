import { message } from 'antd'
const _parseJSON = (response: Response) => {
    if (response.ok) {
        return response.text().then((text) => {
            return text ? JSON.parse(text) : {}
        })
    } else {
        if (response.status === 400) {
            return response.json()
        }
        return Promise.reject(response)
    }
}
const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': ('Bearer ' + sessionStorage.getItem('demo-token')) || ''
})
const request = <T>(method: string, url: string, body?: ArrayBuffer | ArrayBufferView | Blob | File | string | URLSearchParams | FormData | undefined): Promise<T> => {
    method = method.toUpperCase()
    if (method === 'GET') {
        body = undefined
    }
    return fetch(url, {
        method,
        headers,
        body: body
    }).then((res: Response) => _parseJSON(res) as Promise<T>)
    .catch((error) => {
        if (error.status === 401) {
            message.error(error.statusText)
            setTimeout(() => {
                sessionStorage.removeItem('demo-token')
                window.location.href = '/'
            }, 1000)
        }
        throw error
    })
}

export const _post = <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
    return  fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then((res: Response) => _parseJSON(res) as Promise<T>)
}

export const _put = (url: string, data?: Record<string, unknown>): Promise<void | any> => {
    return  fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }).then((res: Response) => _parseJSON(res))
}

export const _get = <T>(url: string): Promise<T> => {
    return fetch(url, {
        method: 'GET',
        headers: headers
    }).then((res: Response) => _parseJSON(res) as Promise<T>)
}

export const _delete= (url: string): Promise<void | any> => {
    return fetch(url, {
        method: 'DELETE',
        headers: headers
    }).then((res: Response) => _parseJSON(res))
}

export default request
