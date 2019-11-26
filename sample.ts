import { Weya as $ } from './weya'

let buttons = []

$('div.content', document.body, $ => {
    for(let i = 0; i < 10; ++i) {
        buttons.push($('div.btn-holder', $ => {
            $('p', 'Test')
            $('button', `Button: ${i}`)
        }))
    }
})
