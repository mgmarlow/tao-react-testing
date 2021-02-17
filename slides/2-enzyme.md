## Enzyme

- The defacto way to test React
- Tap directly into the component lifecycle
- Shallow rendering

```js
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('should call #handleClick', () => {
    const handleClick = jest.fn()
    const wrapper = shallow(<MyComponent onClick={handleClick} />)

    wrapper.find('button').simulate('click)

    expect(handleClick).toHaveBeenCalled()
  })
})
```

---

## Shallow rendering

> Shallow rendering is useful to constrain yourself to testing a component as a unit, and to ensure that your tests aren't indirectly asserting on behavior of child components.
>
> -- Enzyme docs

---

## Why shallow render?

- Faster test suites
- Test components as self-contained units
- Avoid re-testing behavior down the component tree
- Can call component lifecycle functions directly from the tests

---

## The reality

> With shallow rendering, I can refactor my component's implementation and my tests break. With shallow rendering, I can break my application and my tests say everything's still working.
>
> -- Kent C. Dodds

---

## Problems with shallow

- `shallow` tests are brittle
- Most complex components need to use `mount` anyway
- Tests are concerned with implementation details

---

# How can we do better?
