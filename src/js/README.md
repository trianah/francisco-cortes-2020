## @spon/core

## Getting started

Add the following code to your main javascript entry point (app.js)

```javascript
import { loadApp, loadModule } from '@spon/core'
import logger from './behaviours/logger'

// load from data-behaviours
loadApp(name => import(`./behaviours/${name}`), document.body)

// load from file
loadModule({
	module: logger, // required
	id: 'hello', // required
	node: document.getElementById('logger') // default undefined,
	keepAlive: true // default undefined
})
```

Create a html file with the following snippet

```html
<div data-behaviour="example" id="required-id">...</div>
```

`js/behaviours/example`

```javascript
/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @return {Function} a function to unmount
 */
function example({ node }) {
	return () => {
		console.log('i am called when the module is destroyed')
	}
}

export default example
```

You can also set the module to only load at certain breakpoints:

```html
<div data-behaviour="example" id="required-id" data-query="(max-width: 1024px)">
	...
</div>
```

`example()` will only be called when the viewport is smaller than 1024px. Once the module is mounted and the viewport increases to greater than 1024 the returned function will be called. Use this to remove any event listeners or destroy any custom modules

```javascript
/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @return {Function} a function to unmount
 */
function example({ node }) {
	const slide = new SomeSlideLibrary(node)

	return () => {
		slide.destroy()
	}
}

export default example
```

Behaviours with the 'data-keep-alive' attribute will not be destroyed when navigating betweeen pages. This is only valid if you are using ajax pagaination.

## Usage with @spon/plugins and/or @spon/connect

Example:

`./store/indx.js`

```javascript
import { init } from '@rematch/core'
import connectStore from '@spon/connect'

const store = init({
	models: {
		count: {
			state: 0,
			reducers: {
				increment(state, payload) {
					return state + payload
				}
			}
		}
	}
})

// this creates a function that is used to bind modules to the store
export const connect = connectStore(store)

export default store
```

```javascript
import { connect } from './store'
import { domEvents, withPlugins } from '@spon/plugins'

/* eslint-disable no-console */
function counter({ node, name, plugins: { addEvents }, store, render }) {
	addEvents({
		'click button': () => {
			store.increment(1)
		}
	})

	render(
		({ current }) => {
			node.textContent = current.count
		},
		['count']
	)

	return () => {
		console.log(`destroy: ${name}`)
	}
}

const mapState = store => {
	return {
		count: store.count
	}
}
const mapDispatch = ({ count }) => ({ ...count })

export default withPlugins(domEvents)(
	connect({ mapState, mapDispatch })(counter)
)
```

### Just plugins

```javascript
export default withPlugins(domEvents)(counter)
```

### Just connect

```javascript
export default connect(domEvents)(counter)
```

## Barba Integration

Page transitions can be setup in the `@/view/index` file by adding views to the array exported from this file.

An example view:

```javascript
const view = {
	// apply only if clicked link contains `.cta`
	// custom: ({ current, next, trigger }) => trigger.classList && trigger.classList.contains('cta'),

	// do leave and enter concurrently
	sync: false,

	// available hooks…
	beforeAppear(props) {
		log('Before Appear:', props)
	},
	appear(props) {
		log('Appear:', props)
	},
	afterAppear(props) {
		log('After Appear:', props)
	},
	beforeLeave(props) {
		log('Before Leave:', props)
	},
	leave(props) {
		log('Leave:', props)
	},
	afterLeave(props) {
		log('After Leave:', props)
	},
	beforeEnter(props) {
		log('Before Enter:', props)
	},
	enter(props) {
		log('Enter:', props)
	},
	afterEnter(props) {
		log('After Enter:', props)
	}
}
```

and corresponding SCSS file

```css
.barba-leave-active,
.barba-enter-active {
	transition: opacity 450ms ease;
}

/* initial state */
.barba-leave {
	opacity: 1;
}

.barba-enter {
	opacity: 0;
}

/* ending state */
.barba-leave-to {
	opacity: 0;
}

.barba-enter-to {
	opacity: 1;
}

/* appear: active state, define the transition */
.barba-appear-active {
	transition: opacity 450ms ease;
}

/* appear: initial state */
.barba-appear {
	opacity: 0;
}

/* appear: ending state */
.barba-appear-to {
	opacity: 1;
}
```
