import { next, bind } from '@ember-decorators/runloop';
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

test('"run.bind" works with es6 class', function(assert) {
  assert.expect(1);

  class Foo {
    constructor() {
      this.prop = 'foo';
    }

    @bind nextMe = () => {
      return this.prop;
    };
  }

  class Bar extends Foo {
    constructor() {
      super();
      this.prop = 'bar';
    }
  }

  let obj = new Bar();
  assert.equal(obj.nextMe(), 'foo');
});