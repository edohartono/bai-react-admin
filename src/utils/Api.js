import axios from 'axios'
const BASE_URL = 'https://awsprod-api-b2bmarketplace.appclone.xyz/bai/'
const UPLOAD_URL = 'https://awsprod-api-b2bmarketplace.appclone.xyz/bai/'
// const BASE_URL = 'http://localhost:9000/'

export const API = {

  async get(path = '', params = {}) {
    path = `${BASE_URL}${path}`
    // console.log(params)
    let headers = {}
    headers['Content-Type'] = 'application/json'
    let auth = null
    headers['Authorization'] = localStorage.getItem('token')
    return axios({
      url: path,
      headers: headers,
      params: params
    })
      .then(res => {
        // const dispatch = useDispatch()
        // return dispatch({
        //   type: 'IS_LOGGED_OUT'
        // })
        if (res.success) {
          return {
            success: true,
            result: res.data
          }
        }

        else {
          return res.data
        }

      })
      .catch(err => {
        // console.log('err', err)
        return {
          success: false,
          error: err.response.data,
          response: err.response
        }
      })
  },

  async post(path = '', body = {}) {
    path = `${BASE_URL}${path}`

    let headers = {}
    headers['Content-Type'] = 'application/json'
    let auth = ''
    headers['Authorization'] = localStorage.getItem('token')
    return axios.post(path, body, {
      headers: headers,
    })
      .then(res => {
        if (res.success) {
          return {
            success: true,
            result: res.data
          }
        }

        else {
          return res.data
        }
      })
      .catch(err => {
        return {
          success: false,
          error: err.response.data,
          response: err.response
        }
      })
  },

  async patch(path = '', body = {}) {
    path = `${BASE_URL}${path}`

    let headers = {}
    headers['Content-Type'] = 'application/json'
    let auth = ''
    headers['Authorization'] = localStorage.getItem('token')
    return axios.patch(path, body, {
      headers: headers,
    })
      .then(res => {
        if (res.success) {
          return {
            success: true,
            result: res.data
          }
        }

        else {
          return res.data
        }
      })
      .catch(err => {
        return {
          success: false,
          error: err.response.data,
          response: err.response
        }
      })
  },

  async delete(path = '', body = {}) {
    path = `${BASE_URL}${path}`

    let headers = {}
    headers['Content-Type'] = 'application/json'
    headers['Authorization'] = localStorage.getItem('token')
    // console.log('toket', localStorage.getItem('token'))
    return axios.delete(path, {
      headers: headers, data: body
    })
      .then(res => {
        if (res.success) {
          return {
            success: true,
            result: res.data
          }
        }

        else {
          return res.data
        }
      })
      .catch(err => {
        return {
          success: false,
          error: err.response.data,
          response: err.response
        }
      })
  },

  async upload(file) {
    let path = `${UPLOAD_URL}upload/image`

    let headers = {}
    headers['Authorization'] = localStorage.getItem('token')

    var body = new FormData()
    body.append('file', file)
    return axios.post(path, body, {
      headers: headers,
      body: body
    })
      .then(res => {
        if (res.success) {
          return {
            success: true,
            result: res.data
          }
        }

        else {
          return res.data
        }
      })
      .catch(err => {
        return {
          success: false,
          error: err.response.data,
          response: err.response
        }
      })
  },

}

// export default API

