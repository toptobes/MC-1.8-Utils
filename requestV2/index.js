import { Promise } from '../PromiseV2';
import RequestObj from './RequestObj';
/**
 * @typedef {Object} Options 
 * @property {string} url
 * @property {string=} method defaults to 'GET'
 * @property {number=} timeout in ms, defaults to infinity
 * @property {number=} connectTimeout in ms, defaults to infinity
 * @property {number=} readTimeout in ms, defaults to infinity
 * @property {Record<string, string>=} headers
 * @property {Record<string, string>=} qs escaped and appended to url
 * @property {any=} body Represents JSON POST data. Automatically sets 'Content-Type' header to 'application/json; charset=UTF-8' Body takes presedence over 'form'
 * @property {Record<string, string>=} form Represents form data. Automatically sets 'Content-Type' header to 'x-www-form-urlencoded'
 * @property {boolean=} followRedirect default to true
 * @property {boolean=} json automatically parse the output
 */
/**
 * @param {Options | string} o 
 * @returns {Promise<any>}
 */
export function request(o) {
  var options = {}

  if (typeof o === 'string') {
    options.url = o;
  } else {
    options = o;
  }

  options.method = options.method?.toUpperCase()?.trim() ?? 'GET';
  options.timeout = options.timeout ?? 0;
  options.connectTimeout = options.connectTimeout ?? options.timeout;
  options.readTimeout = options.readTimeout ?? options.timeout;
  options.headers = options.headers ?? {};
  options.qs = options.qs ?? {};
  options.followRedirect = options.followRedirect ?? true;
  options.json = options.json ?? false;

  return new Promise((resolve, reject) => RequestObj(options, resolve, reject));
}

export default request;