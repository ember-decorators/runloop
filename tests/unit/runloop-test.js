import { next, debounce, throttle, schedule } from '@ember-decorators/runloop';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';

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
      assert.equal(arg, 'wat');
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
      assert.ok(true, 'debounced function only called once');
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
      assert.equal(arg, 'wat', 'debounced function call with arguments');
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
      assert.equal(arg, 'wat', 'immediate flag works and debounces second function call');
    }
  }

  let obj = new Foo();
  obj.nextMe('wat');
  obj.nextMe('wat');
});

test('"run.throttle" works with es6 class', function(assert) {
  let done = assert.async();
  assert.expect(1);

  class Foo {
    @throttle(100)
    nextMe() {
      assert.ok(true, 'throttled function only called once');
      done();
    }
  }

  let obj = new Foo();
  obj.nextMe();
  obj.nextMe();
});

test('"run.throttle" works with arguments', function(assert) {
  let done = assert.async();
  assert.expect(1);

  class Foo {
    @throttle(100)
    nextMe(arg) {
      assert.equal(arg, 'wat', 'throttled function works with arguments');
      done();
    }
  }

  let obj = new Foo();
  obj.nextMe('wat');
  obj.nextMe('wat');
});

test('"run.throttle" works with immediate flag', function(assert) {
  assert.expect(1);

  class Foo {
    @throttle(100, true)
    nextMe(arg) {
      assert.equal(arg, 'wat', 'immediate flag works and throttles second function call');
    }
  }

  let obj = new Foo();
  obj.nextMe('wat');
  obj.nextMe('wat');
});

test('"run.schedule" works with es6 class', function(assert) {
  assert.expect(2);
  let count = 0;

  class Foo {
    @schedule('actions')
    nextMe() {
      count++;
    }
  }

  let obj = new Foo();

  // put function call in run loop and then assert after
  run(() => {
    obj.nextMe();
    assert.equal(count, 0);
  });

  assert.equal(count, 1, 'scheduled function was flushed after current runloop');
});

test('"run.schedule" works with arguments', function(assert) {
  assert.expect(3);
  let count = 0;

  class Foo {
    @schedule('actions')
    nextMe(arg) {
      count++;
      assert.equal(arg, 'wat');
    }
  }

  let obj = new Foo();

  // put function call in run loop and then assert after
  run(() => {
    obj.nextMe('wat');
    assert.equal(count, 0);
  });

  assert.equal(count, 1, 'scheduled function was flushed after current runloop');
});