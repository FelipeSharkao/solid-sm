# Solid SM

No non-sense global state management for SolidJS, inspired by Zustand.

```typescript
import { state } from "solid-sm"

type TaskState = {
    name: string
    done: boolean
    complete(): void
}

type RootState = {
    tasks: TaskState[]
    addTask(name: string): void
}

const createTask = (name: string) => {
    state<TaskState>((set) => ({
        name,
        done: false,
        complete() {
            set("done", true)
        },
    }))
}

const rootState = state<RootState>((set) => ({
    tasks: [],
    addTask(name) {
        set("tasks", (t) => [...t, createTask(name)])
    },
}))
```

## Features

-   Only one function, for creating a state. That's it.
-   Compatible with SolidJS functions and design patterns.
-   Nestable. Create and update nested states easily.

## Motivation

Although Solid provides global state out of the box, dealing with nested states is complex and
requires a lot of boilerplate. This module aims to simplify that, reducing the necessary effort to
create idiomatic and performat designs.

## Usage

### Creating a new state

A state is a reactive object with data and actions that can mutate that data. Having actions mixed
with data is important because it allows consumers to handle the data without knowing how the data
was created. To create a new state, use the `state` function. It takes a function as argument that
returns the initial value.

```typescript
type CounterState = {
    value: number
}

const counter = state<Counter>(() => ({
    value: 0,
}))
```

### Consuming a state inside a component

Inside components, states behaves as any other reactive object.Tou can access its properties inside
a reactive scope to subscribe that scope to changes in that property.

```typescript
function Counter() {
    return <div>Counter: {counter.value}</div>
}
```

### Creating actions to update a state

The state initial function takes as parameter a `set` function that can update the state value after
its initialized. With it you can create actions that will allow the state to be updated by
consumers.

```typescript
type CounterState = {
    value: number
    inc(): void
}

const counter = state<Counter>((set) => ({
    value: 0,
    inc(): {
        // The passed object will be shallowly merged with the current value
        set((s) => ({ value: s.value + 1 }))
        // You can also pass the property that will be updated instead
        set("value", (v) => v + 1)
    }
}))
```

### Creating nested states

Nested states are a way of updating part of a object inside a state without updating the parent
state. This simplifies the handling of complex data involving array of objects.

```typescript
type BookState = {
    title: string
    score: number | null
    setScore(score: number): void
}

type AuthorState = {
    books: BookState[]
    addBook(title: string): void
}

const author = state<AuthorState>((set) => ({
    books: [],
    addBook(title) {
        set("books", (b) => [
            ...b,
            state<BookState>((setBook) => ({
                title,
                score: null,
                setScore(score) {
                    setBook("score", score)
                },
            })),
        ])
    },
}))
```
