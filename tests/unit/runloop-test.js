import { next } from '@ember-decorators/runloop';
import { module, test } from 'qunit';

module('computed properties');

test('"run.next" works with es6 class', function(assert) {
  let done = assert.async();
  assert.expect(1);

  class Foo {
    @next
    nextMe() {
      assert.ok(true);
    }
  }

  let obj = new Foo();
  setTimeout(() => {
    obj.nextMe();
    done();
  }, 20);
});

test('"run.next" works with arguments', function(assert) {
  let done = assert.async();
  assert.expect(1);

  class Foo {
    @next
    nextMe(arg) {
      assert.equal(arg, 'wat')
    }
  }

  let obj = new Foo();
  setTimeout(() => {
    obj.nextMe('wat');
    done();
  }, 20);
});