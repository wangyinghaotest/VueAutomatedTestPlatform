# domhelpers

DOMhelpers is a (very) small collection of some handy utility functions which
help you query the DOM.


## getClosest(element, selector)

Get the closest element from `element` which matches `selector`. This includes
the `element` itself.

```html
<div class="el1">
  <div class="el2"></div>
</div>
```

```js
var el2 = document.querySelector('.el2');
console.log(getClosest(el2, '.el1')); // div.el1
console.log(getClosest(el2, '.el2')); // div.el2
```


## getParent(element, selector)

Get the closest element from `element` which matches `selector`. This does NOT
include the `element` itself, instead it searches from the `element`'s parentNode.

```html
<div class="el1">
  <div class="el2"></div>
</div>
```

```js
var el2 = document.querySelector('.el2');
console.log(getClosest(el2, '.el1')); // div.el1
console.log(getClosest(el2, '.el2')); // undefined
```


## getParents(element, selector)

Get all parents from `element` which match `selector`. This function always
returns an array.

```html
<div class="el1">
  <div class="el1">
    <div class="el2"></div>
  </div>
</div>
```

```js
var el2 = document.querySelector('.el2');
console.log(getClosest(el2, '.el1')); // [div.el1, div.el1]
console.log(getClosest(el2, '.el2')); // []
```
