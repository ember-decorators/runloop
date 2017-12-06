import { decorator } from '@ember-decorators/utils/decorator-wrappers';
import { run } from '@ember/runloop';

function decoratorWithReturnValue(fn) {
  return decorator(function(target, key, desc/*, params*/) {
    // set as value on descriptor - a function that when called will 
    // return instead a run.next(myFunc)
    return function()  {
      const { value } = desc;
      return fn(value);
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