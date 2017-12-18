import { next, debounce } from '@ember-decorators/runloop';
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

test('"run.debounce" works with es6 class', function(assert) {
  let done = assert.async();
  assert.expect(1);

  class Foo {
    @debounce(50)
    nextMe() {
      assert.ok(true, 'debounce function only called once');
      done();
    }
  }

  let obj = new Foo();
  obj.nextMe();
  obj.nextMe();
});

test('"run.debounce" works with arguments', function(assert) {
  let done = assert.async();
  assert.expect(1);

  class Foo {
    @debounce(50)
    nextMe(arg) {
      assert.equal(arg, 'wat', 'debounce function only called once');
      done();
    }
  }

  let obj = new Foo();
  obj.nextMe('wat');
  obj.nextMe('wat');
});

test('"run.debounce" works with immediate flag', function(assert) {
  assert.expect(1);

  class Foo {
    @debounce(50, true)
    nextMe(arg) {
      assert.equal(arg, 'wat', 'immediate decorator works and debounces second function call');
    }
  }

  let obj = new Foo();
  obj.nextMe('wat');
  obj.nextMe('wat');
});