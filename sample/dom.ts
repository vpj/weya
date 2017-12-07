import { Weya, WeyaHelper } from './../weya'

var student;
class Student {
    constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }

    public template($: WeyaHelper) {
        $.div("#name.col-md-6", $ => {
            $.span("Name");
            return $.span(this.name);
        });
        $.div("#age.col-md-6", {
            style: {
                background: "blue"
            }
        }, $ => {
            $.span("Age");
            $.span(`${this.age}`);
            $.input("#ageInput", {
                type: "text"
            });
        });
    }

    public render() {
        // console.log(Weya.markup({
        //     context: this
        // }, this.template));
        return Weya({
            elem: document.body,
            context: this
        }, this.template);
    }
}

student = new Student("Varuna", 26);
student.render();

// Append more to document.body
Weya({
    elem: document.body,
    context: {}
}, $ => {
    $.br();
    $.br();
    $.br();
    $.svg({
        width: "50", // These should be string as Element.setAttribute requires string
        height: "50"
    }, $ => {
        $.rect("#my.red", {
            width: "50",
            height: "50"
        });
    });
});
