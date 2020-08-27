const http = exports

const lambda = require('aws-lambda') // eslint-disable-line no-unused-vars
const querystring = require('querystring')
const statuses = require('statuses')
const Ajv = require('ajv')
const logger = require('./logger')

/** @typedef {{ method: string, request?: any, handler: (request: lambda.APIGatewayProxyEvent, context: any) => any }} Controller */
/** @typedef {lambda.APIGatewayProxyEvent & { body: any, method: lambda.APIGatewayProxyEvent['httpMethod'], query: lambda.APIGatewayProxyEvent['queryStringParameters'] }} Request */
/** @typedef {{}} Context */

http.function = (/** @type {Controller} */ controller) => {
  const middleware = [
    alias({ httpMethod: 'method', queryStringParameters: 'query' }),
    validateHttpMethod(controller.method),
    parseBody(),
    validateRequest(controller.request),
    controller.handler,
  ]

  return async (
    /** @type {Request} */ request,
    /** @type {Context} */ context
  ) => {
    for (const middlewareFunction of middleware) {
      try {
        const response = await middlewareFunction(request, context)
        if (response) return response
      } catch (error) {
        return http.error(500, error)
      }
    }
  }
}

http.json = (/** @type {any} */ body) => {
  const stringifiedBody = JSON.stringify(body)
  logger.log(stringifiedBody)
  return {
    statusCode: 200,
    body: stringifiedBody,
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

http.error = (
  statusCode = 500,
  /** @type {Error | string} */ error = statuses[statusCode]
) => {
  logger.error(error.toString())
  return {
    statusCode: statusCode,
    body: error.toString(),
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  }
}

// Middleware
const alias = (config = {}) => {
  return (/** @type {Request} */ request, /** @type {Context} */ context) => {
    Object.entries(config).forEach(([key, value]) => {
      request[value] = request[key]
    })
  }
}

const validateHttpMethod = (/** @type {string} */ method) => {
  return async (
    /** @type {Request} */ request,
    /** @type {Context} */ context
  ) => {
    if (request.method !== method) {
      return {
        ...http.error(405),
        headers: { Allow: method },
      }
    }
  }
}

const parseBody = () => {
  return async (
    /** @type {Request} */ request,
    /** @type {Context} */ context
  ) => {
    if (request.body) {
      try {
        request.body = querystring.parse(request.body)
      } catch (error) {
        return http.error(400, error)
      }
    }
  }
}

const validator = new Ajv({ allErrors: true, coerceTypes: true })
const validateRequest = (request) => {
  const validate = request
    ? validator.compile({ type: 'object', properties: request })
    : null

  return (/** @type {Request} */ request, /** @type {Context} */ context) => {
    const isValid = !validate || validate(request)
    if (!isValid) {
      return http.error(
        400,
        validate.errors
          .map((error) => `request${error.dataPath} ${error.message}`)
          .join('\n')
      )
    }
  }
}
