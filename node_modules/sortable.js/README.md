# sortable.js

`sortable.js` is a small library that helps with sorting items in a list using
html5 drag and drop functionality.


## Installation & usage

`sortable.js` is available through [npm][npm]. You'll have to use a tool such as
[browserify][browserify] to include it in your build.

```bash
$ npm install --save sortable.js
```

Then you can use it in your project:

```html
<ul class="my-list">
  <li draggable="true">Item 1</li>
  <li draggable="true">Item 2</li>
</ul>
```

```js
var Sortable = require('sortable.js');
var myList = document.querySelector('.my-list');
new Sortable(myList);
```

If you want a stand-alone build of `sortable.js` you can:

```bash
$ git clone https://github.com/chielkunkels/sortable.js.git
$ cd sortable.js
$ npm install
$ npm run build
```

[npm]: https://www.npmjs.com/
[browserify]: http://browserify.org/


### Options

Sortable accepts a few options to tweak it's behaviour.

- `handle` - By default, the entire element will be draggable, but you can use
  this options to specify a selector which needs to be matched to allow
  dragging.
- `placeholderClass` (`sortable-placeholder`) - To ensure proper spacing,
  sortable.js uses a placeholder element, automatically setting its height to
  the height of the dragged element. If you want to modify the class this
  placeholder receives, you can specify this option.


## License

MIT © [Chiel Kunkels](http://kunkels.me/)
