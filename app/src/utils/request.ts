import message from '@components/Message'
// import axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise, Method } from 'axios'
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

console.log(localStorage.getItem('demo-token'))

const request = < T > (method: string, url: string, body ? : ArrayBuffer | ArrayBufferView | Blob | File | string | URLSearchParams | FormData | undefined): Promise < T > => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': ('Bearer ' + localStorage.getItem('demo-token')) || ''
  })

  method = method.toUpperCase()
  if (method === 'GET') {
    body = undefined
  }
  return fetch(url, {
      method,
      headers,
      body: body
    }).then((res: Response) => _parseJSON(res) as Promise < T > )
    .catch((error) => {
      if (error.status === 401) {
        message.error(error.statusText)
        setTimeout(() => {
          localStorage.removeItem('demo-token')
          window.location.href = '/login'
        }, 1000)
      }
      throw error
    })
}

// const Axios = axios.create()

// const token = localStorage.getItem('demo-token')
// if (token) {
//     Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

// Axios.interceptors.request.use((config: AxiosRequestConfig) => {
//     return config
// }, (error) => {
//     return Promise.reject(error)
// })

// Axios.interceptors.response.use((response: AxiosResponse) => {
//     return response
// }, error => {
//     if (error.response) {
//         switch (error.response.status) {
//             case 401: {
//                 localStorage.removeItem('demo-token')
//                 window.location.href = '/'
//                 break
//             }
//             default:
//         }
//     }

// })

// const request = <T>(method: Method, url: string, data?: any, params?: any): AxiosPromise<T> => {
//     console.log(data, params)
//     return Axios({
//         method,
//         url,
//         data: data && undefined,
//         params: params && undefined
//     })
// }

// export const _get = <T>(url: string, params?: unknown): AxiosPromise<T> => {
//     return Axios.get(url, params)
// }

// export const _delete = <T>(url: string, params?: unknown): AxiosPromise<T> => {
//     return Axios.get(url, params)
// }

// export const _post = <T>(url: string, data?: unknown): AxiosPromise<T> => {
//     return Axios.post(url, data)
// }

// export const _put = <T>(url: string, data?: unknown): AxiosPromise<T> => {
//     return Axios.put(url, data)
// }

export default request
