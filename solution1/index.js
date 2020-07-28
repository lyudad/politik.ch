const qs = require('qs')
const _ = require('lodash')

const request = require('superagent')
const rxjs = require('rxjs')

/* eslint-disable */
const sendMethod = HTTPMethod =>
  HTTPMethod === 'post' ||
  HTTPMethod === 'put' ||
  HTTPMethod === 'patch' ||
  HTTPMethod === 'delete'
    ? 'send'
    : 'query'

const sendArguments = (HTTPMethod, query) =>
  HTTPMethod === 'post' ||
  HTTPMethod === 'put' ||
  HTTPMethod === 'patch' ||
  HTTPMethod === 'delete'
    ? JSON.stringify(query)
    : qs.stringify(query, {
        arrayFormat: 'brackets'
      })

/*eslint-enable*/

const apiCall = (
  url = 'http://google.com',
  endpoint = '',
  method = 'GET',
  query = {},
  headers = {},

) => {
  const subject = new rxjs.Subject()
  const HTTPMethod = method.toLowerCase()

  request[HTTPMethod](url + endpoint)
    [sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
    .set(headers)
    .end((error, data) => {
      if (_.isEmpty(data) || data.body === null) {
        _.merge(data, {
          body: {
            data: []
          }
        })
      }

      if (error) {
        subject.error({
          data,
          error
        })
      } else {
        subject.next({
          rawData: data,
          method: HTTPMethod
        })
        subject.complete()
      }
    })

  return subject
}

//could not find filter parameters for name and id in API
const prepareRequest = (name=null, id=null) => {
    const onError = errorData => {
        console.log('errorData>>>', errorData)
    }
    const onSuccess = successData => {
        let result = successData.rawData.body
        if(name){
            result = result.filter(el => el.firstName === name)
        } else if(id){
            result = result.filter(el => el.id === id)
        }

        console.log('result>>>', result)
    }


    apiRequest = apiCall('http://ws-old.parlament.ch/', `/councillors/?format=json`, 'get', '',  {
        'Content-Type': 'application/json'
      },)
    apiRequest.subscribe(onSuccess, onError)
}


prepareRequest()

 