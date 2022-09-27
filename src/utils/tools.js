import { throttle, debounce } from 'lodash'
import { Message, MessageBox } from 'element-ui'
/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
export const _throttle = function (wait, options = {}) {
  return function (target, name, descriptor) {
    descriptor.value = throttle(descriptor.value, wait, options)
  }
}

/**
 * 函数防抖装饰器
 * @param {number} wait 需要延迟的毫秒数。
 * @param {Object} options 选项对象
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
export const _debounce = function (wait, options = {}) {
  return function (target, name, descriptor) {
    descriptor.value = debounce(descriptor.value, wait, options)
  }
}

/**
  * Loading提示
  * @param {String} message 提示信息
  * @param {String} type 提示类型
  * @param {function} errorFn 异常处理信息
  *
*/
export function loading (message = '默认加载中...', type = 'info', duration = 800, errorFn = function () {}) {
  return function (target, name, descriptor) {
    console.log(message, target, name, descriptor)
    const fn = descriptor.value
    descriptor.value = async function () {
      const loading = Message({
        message: message,
        type: type,
        duration: duration
      })
      try {
        return fn.call(this)
      } catch (error) {
        errorFn && errorFn.call(this, error)
        console.log(error, 'err')
      } finally {
        // loading.close()
      }
    }
  }
}

/**
 * @param {String} message 内容
 * @param {String} title 标题
 * @param {Function} applyFn 确定回调
 * @param {Function} cancelFn 取消回调
 */

export function confirm (message = '确认吗', title = '标题', applyFn = function () {}, cancelFn = function () {}) {
  console.log(333, this)
  return function (target, name, descriptor) {
    console.log(target, name, descriptor, 444, this)
    const originFn = descriptor.value
    descriptor.value = async function () {
      try {
        await MessageBox(message, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('ok')
          applyFn && applyFn.call(this)
        }).catch(() => {
          cancelFn && cancelFn.call(this)
          console.log('ok2')
        })
        originFn.apply(this)
      } catch (err) {
        console.log(err, '0202')
      }
    }
  }
}
