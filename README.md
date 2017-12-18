# runloop

## Usage

### Installation

`ember install @ember-decorators/runloop`

### debounce

In your application where you use ES6 classes:

```javascript
import Component from '@ember/component';
import { debounce } from "@ember/runloop";
import { action } from "@ember-decorators/object";

export default class TypeAhead extends Component {
  fetchResults(searchValue) {
    ...
  },

  @action
  handleTyping() {
    debounce(this, get(this, 'fetchResults'), get(this, 'searchValue'), 250);
  }
}

```

You replace it with this:

```javascript
import Component from '@ember/component';
import { debounce } from "@ember-decorators/runloop";
import { action } from "@ember-decorators/object";

export default class TypeAhead extends Component {
  @debounce(250)
  fetchResults(searchValue) {
    ...
  },

  @action
  handleTyping() {
    get(this, 'fetchResults')(get('searchValue'));
  }
}

```

### throttle

In your application where you use ES6 classes:

```javascript
import Component from '@ember/component';
import { throttle } from "@ember/runloop";
import { action } from "@ember-decorators/object";

export default class TypeAhead extends Component {
  fetchResults(searchValue) {
    ...
  },

  @action
  moveMouse() {
    throttle(this, get(this, 'fetchResults'), get(this, 'searchValue'), 250);
  }
}

```

You replace it with this:

```javascript
import Component from '@ember/component';
import { throttle } from "@ember-decorators/runloop";
import { action } from "@ember-decorators/object";

export default class TypeAhead extends Component {
  @throttle(250)
  fetchResults(searchValue) {
    ...
  },

  @action
  moveMouse() {
    get(this, 'fetchResults')(get('searchValue'));
  }
}

```

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd runloop`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
