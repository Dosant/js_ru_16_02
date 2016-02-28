# SUMMORY 

## LESSON 2

### Transferring Props, spread attr
[https://facebook.github.io/react/docs/jsx-spread.html]
[https://facebook.github.io/react/docs/transferring-props.html]

```
var component = <Component foo={x} bar={y} />; 
```

The same as:
```
 var props = {};
  props.foo = x;
  props.bar = y;
  var component = <Component {...props} />;
```

It's a common pattern in React to wrap a component in an abstraction.
The outer component exposes a simple property to do something that might have more complex
implementation details.

*Used in HOC!*


