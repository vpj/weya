# 🐜 Weya

Weya is a lightweight library for DOM manipulation.

Here's a small example to show the usage.

```typescript
let userElems = []
$('div.users', document.body, $ => {
    for (let i = 0; i < users.length; ++i) {
        let userDiv = $('div.user', { on: { click: editUser } }, $ => {
            let name = $('span.name', users[i])
            let phone = $("span.phone", phones[i])
        });
        (<any>userDiv).userId = i
        userElems.push({ user: users[i], div: userDiv })
    }
})
```

The above code creates a list of users. It binds the data to the dom element `userDiv.userId = i` and also keeps track of all the DOM elements in `userElems`. This is important if you want to manipulate the DOM without reloading the entire user list, for example if a name of a user changes you could change it with `userElems[changedUserId].name.textContent = changedUserName`.
