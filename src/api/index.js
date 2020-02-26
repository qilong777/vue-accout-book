import { request } from '../network/index.js'
const getBill = (params = {}) => {
  return request({
    url: '/api/bill',
    params
  })
}

const addBill = (data = {}) => {
  console.log(data)

  return request({
    method: 'post',
    url: '/api/bill',
    data
  })
}

const getCate = (query = {}) => {
  return request({
    url: '/api/category',
    query
  })
}
export { getBill, getCate, addBill }
