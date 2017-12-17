import { decorator } from '@ember-decorators/utils/decorator-wrappers';
import extractValue from '@ember-decorators/utils/extract-value';
import { run } from '@ember/runloop';

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

/**
 * Decorator that makes the target function runloop aware and binds 
 * it to the existing context
 *
 * ```js
 * import Component from '@ember/component';
 * import { bind } from 'ember-decorators/runloop';
 *
 * export default class ActionDemoComponent extends Component {
 *   @bind
 *   foo() {
 *     // do something
 *   }
 * }
 * ```
 * @function
 */
export const bind = decorator(function(target, key, desc/*, params*/) {
  const value = extractValue(desc);
  // the value of `this` when the function runs is not the instance but rather the context 
  // of the initializer function (this === {enumerable: true, configurable: false, writable: true, initializer: ƒ})
  // see this issue: https://github.com/babel/babel/issues/6977
  // https://github.com/tc39/proposal-class-fields/issues/62
  return run.bind(target, value);
});