import { Weya as $ } from './weya'

let buttons = []

$('div.content', document.body, $ => {
    for (let i = 0; i < 10; ++i) {
        buttons.push($('div.btn-holder', $ => {
            $('p', 'Test')
            $('button', `Button: ${i}`)
        }))
    }
})

let users = ['Anakin', 'Luke', 'Ray']
let phones = ['111', '222', '333']

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

function editUser() {
    alert("edit")
}