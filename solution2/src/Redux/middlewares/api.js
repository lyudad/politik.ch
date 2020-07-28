import qs from 'qs'

import _ from 'lodash'
import { Subject } from 'rxjs'
import request from 'superagent'

import { api } from 'Config/App'
import { API_CALL } from 'Constants/ids'

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
  url = api.url,
  endpoint = '',
  method = 'GET',
  query = {},
  headers = {},

) => {
  const subject = new Subject()
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

const nextAction = (action, data) => {
  const next = _.merge({}, action, data)
  delete next[API_CALL]
  return next
}

export default store => next => action => {
  if (action.type !== API_CALL || !action.fields) return next(action)

  const { url, endpoint, headers, method, query, types, isRaw, callback = () => {} } = action.fields

  const signature = Date.now()

  const completeHeaders = _.assign(
    {
      'Content-Type': 'application/json'
    },
    headers
  )

  // console.log('completeHeaders: ', completeHeaders)

  const fsaFields = _.pick(action.fields, 'payload', 'error', 'meta')
  const isLoadRequest =
    !method ||
    method.toUpperCase() === 'GET' ||
    method.toUpperCase() === 'PATCH' ||
    method.toUpperCase() === 'POST'
  next(
    nextAction(fsaFields, {
      type: types.REQUEST,
      query: action.fields.query,
      meta: _.merge(
        {
          signature
        },
        isLoadRequest && {
          endpoint,
          isRequest: true
        }
      )
    })
  )

  const subject = new Subject()
  const apiRequest = apiCall(url, endpoint, method, query, completeHeaders)

  const onError = rawData => {
    console.error('api error', rawData)
    callback(false)
    const payload = _.get(rawData, 'data.body') || {}
    const data = {
      payload,
      type: types.FAILURE,
      meta: {
        signature,
        httpCode: rawData.error.status,
        isNetworkFailure: !rawData.error.status
      },
      error: true
    }

    next(nextAction(fsaFields, data))

    subject.error({
      httpCode: rawData.error.status,
      isNetworkFailure: !rawData.error.status,
      ...payload
    })
  }

  const onSuccess = successData => {
    const { rawData } = successData

    if (rawData.body.status && rawData.body.status === 'Failure') {
      onError(rawData)
      return
    }

    const normalized = rawData.body

    const meta = _.merge(
      {
        signature
      },
      {
        endpoint,
        isSuccess: true
      }
    )

    const deletedId =
      successData.method.toUpperCase() === 'DELETE'
        ? endpoint.substring(endpoint.lastIndexOf('/') + 1, endpoint.length)
        : null

    let payload = {
      data: normalized
    }
    payload =
      deletedId !== null
        ? {
            ...payload,
            deletedId
          }
        : payload

    const data = {
      meta,
      payload,
      type: types.SUCCESS,
      isRaw
    }

    callback(true)
    if (action.fields.meta) {
      sessionStorage.setItem('user_id', normalized['user_id'])
    }
    if (action.fields.meta && action.fields.meta.remember) {
      localStorage.setItem('user_id', normalized['user_id'])
    }
    next(nextAction(fsaFields, data))

    subject.next(payload)
    subject.complete()
  }

  apiRequest.subscribe(onSuccess, onError)

  return subject
}
