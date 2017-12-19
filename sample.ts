import {Weya} from './main'

Weya({ elem: this.elems.parent, context: this }, $ => {
    $.div(".signin-base", $ => {
        $.a(".google-sign", {
            href: "#",
            on: { click: this.onGoogleClick.bind(this) }
        }, $ => {
            $.img(".normal", {
                src: "/assets/btn_google_signin_light_normal_web.png",
                alt: "Signin with Google"
            })
            $.img(".focused", {
                src: "/assets/btn_google_signin_light_focus_web.png",
                alt: "Signin with Google"
            })
            $.img(".pressed", {
                src: "/assets/btn_google_signin_light_pressed_web.png",
                alt: "Signin with Google"
            })
        })
        return $.div(".get-link", $ => {
            $.p("Or get a signin link")
            $.label("Email", { for: "email" })
            this.elems.email = $.input("#email", {
                type: "text",
                placeholder: "Email"
            })
            $.button(".btn", "Get Signin Link", {
                on: { click: this.getLinkClicked.bind(this) }
            })
        })
    })
})
