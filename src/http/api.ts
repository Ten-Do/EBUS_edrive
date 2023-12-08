'use client'

import { baseHeaders } from './baseHeaders.js'
type servise_name = 'bus' | 'chats' | 'accident' | 'weather'
const API = (service: servise_name, endpoint: string) =>
  `https://${service}.e-bus.site/${endpoint}`

class HttpClient {
  private baseURL: string
  private baseHeaders?: HeadersInit
  private sendFormHeaders?: HeadersInit

  constructor(baseURL: string, baseHeaders: HeadersInit = {}) {
    ;(this.baseURL = baseURL), (this.baseHeaders = baseHeaders)
    this.sendFormHeaders = {}
    for (const key in baseHeaders) {
      if (key !== 'Content-Type') {
        this.sendFormHeaders[key] = baseHeaders[key]
      }
    }
  }

  private async _handleResponse(response: Response): Promise<any> {
    const data = await response.json()

    if (response.ok) {
      return {
        data,
        status: response.status,
      }
    } else {
      throw {
        message: { text: data.message || 'Something went wrong', status: response.status },
      }
    }
  }

  async get(service: servise_name, url: string, Authorization: string, headers?: HeadersInit) {
    const response = await fetch(API(service, url), {
      method: 'GET',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
    })

    return await this._handleResponse(response)
  }

  async post(
    service: servise_name,
    url: string,
    Authorization: string,
    data: any,
    headers?: HeadersInit,
  ) {
    const response = await fetch(API(service, url), {
      method: 'POST',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
      body: JSON.stringify(data),
      // body: data
    })

    return await this._handleResponse(response)
  }

  async put(
    service: servise_name,
    url: string,
    Authorization: string,
    data: any,
    headers?: HeadersInit,
  ) {
    const response = await fetch(API(service, url), {
      method: 'PUT',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
      body: JSON.stringify(data),
    })

    return await this._handleResponse(response)
  }

  async delete(
    service: servise_name,
    url: string,
    Authorization: string,
    data?: any,
    headers?: HeadersInit,
  ) {
    const response = await fetch(API(service, url), {
      method: 'DELETE',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: 'Bearer ' + Authorization,
      },
      body: data,
    })

    return await this._handleResponse(response)
  }

  async sendForm(url: string, Authorization: string, data: FormData, method: string = 'POST') {
    const response = await fetch(this.baseURL + url, {
      method,
      headers: {
        ...this.sendFormHeaders,
        Authorization: 'Bearer ' + Authorization,
      },
      body: data,
    })

    return await this._handleResponse(response)
  }
}

const $api = new HttpClient('API', baseHeaders)

export default $api
