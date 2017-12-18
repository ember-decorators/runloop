import { decorator, decoratorWithParams } from '@ember-decorators/utils/decorator-wrappers';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';


function decoratorWithReturnValue(fn) {
  return decorator(function(target, key, desc/*, params*/) {
    // set as value on descriptor - a function that when called will 
    // return run.next(myFunc)
    return function(...args)  {
      const { value } = desc;
      return fn(this, value, ...args);
    }
  });
}

/**
 * Decorator that makes the target function runloop aware
 *
 * ```js
 * import Component from '@ember/component';
 * import { next } from 'ember-decorators/runloop';
 *
 * export default class ActionDemoComponent extends Component {
 *   @next
 *   foo() {
 *     // do something
 *   }
 * }
 * ```
 * @function
 */
export const next = decoratorWithReturnValue(run.next);


function decoratorWithTimer(fn) {
  return decoratorWithParams(function(target, key, desc, params) {
    assert(`The decorator takes one (timer) or two (timer && immediate flag) arguments. Received: ${params.length}`, params.length === 1 || params.length === 2);

    return function(...args)  {
      const { value } = desc;
      const [ param, immediate = false ] = params;
      return fn(this, value, ...args, param, immediate);
    }
  });
}

/**
 * Decorator that makes the target function runloop aware and debounce for specified
 * timeout
 *
 * ```js
 * import Component from '@ember/component';
 * import { debounce } from 'ember-decorators/runloop';
 *
 * export default class ActionDemoComponent extends Component {
 *   @debounce(50)
 *   foo() {
 *     // do something
 *   }
 * }
 * ```
 * @function
 */
export const debounce = decoratorWithTimer(run.debounce);

/**
 * Decorator that makes the target function runloop aware and debounce for specified
 * timeout
 *
 * ```js
 * import Component from '@ember/component';
 * import { throttle } from 'ember-decorators/runloop';
 *
 * export default class ActionDemoComponent extends Component {
 *   @throttle(50)
 *   foo() {
 *     // do something
 *   }
 * }
 * ```
 * @function
 */
export const throttle = decoratorWithTimer(run.throttle);