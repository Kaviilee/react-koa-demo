import message from '@components/Message'
const _parseJSON = (response: Response) => {
  if (response.ok) {
    return response.text().then((text) => {
      return text ? JSON.parse(text) : {}
    })
  }
  return Promise.reject(response)
}

const request = <T>(
  method: string,
  url: string,
  body?: ArrayBuffer | ArrayBufferView | Blob | File | string | URLSearchParams | FormData | undefined,
): Promise<T> => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: (localStorage.getItem('demo-token') && 'Bearer ' + localStorage.getItem('demo-token')) || '',
  })

  method = method.toUpperCase()
  if (method === 'GET') {
    body = undefined
  }
  return fetch(url, {
    method,
    headers,
    body: body,
  })
    .then((res: Response) => _parseJSON(res) as Promise<T>)
    .catch((error) => {
      // console.log(error.error)
      if ([401].includes(error.status)) {
        message.error(error.statusText)
        setTimeout(() => {
          localStorage.removeItem('demo-token')
          window.location.href = '/'
        }, 1000)
      }
      throw error
    })
}

export default request
