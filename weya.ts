const API = {
    document: document
}
const TAGS = {
    svg: "a altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform circle clipPath color-profile cursor defs desc ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph mpath path pattern polygon polyline radialGradient rect script set stop style svg symbol text textPath title tref tspan use view vkern switch foreignObject",
    html: "a abbr address article aside audio b bdi bdo blockquote body button canvas caption cite code colgroup datalist dd del details dfn div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd label legend li main map mark menu meter nav noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small span strong style sub summary sup table tbody td textarea tfoot th thead time title tr u ul video",
    htmlVoid: "area base br col command embed hr img input keygen link meta param source track wbr"
}

let TAGS_DICT = {}
for (let ns in TAGS) {
    let tags = TAGS[ns].split(" ")
    for (let tag of tags) {
        TAGS_DICT[tag] = ns
    }
}

const NAMESPACES = {
    svg: "http://www.w3.org/2000/svg",
    html: "http://www.w3.org/1999/xhtml",
    htmlVoid: null
}

export type WeyaElement = HTMLElement | SVGElement

export interface WeyaTemplateFunction {
    ($: WeyaElementFunction): void
}

type WeyaElementArg = (string | AttributesInterface | WeyaTemplateFunction | WeyaElement)

export interface WeyaElementFunction {
    // With tag
    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, text: string): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, text: string, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, attrs: AttributesInterface, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, text: string): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, text: string, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, attrs: AttributesInterface, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    // With tag and selector
    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, text: string): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, text: string, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, attrs: AttributesInterface, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, text: string): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, text: string, attrs: AttributesInterface): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    <K extends keyof HTMLElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, attrs: AttributesInterface, func: WeyaTemplateFunction): HTMLElementTagNameMap[K]

    //Repeat for SVG
        // With tag
    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, text: string): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, text: string, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, attrs: AttributesInterface, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, text: string): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, text: string, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, parent: WeyaElement, attrs: AttributesInterface, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    // With tag and selector
    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, text: string): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, text: string, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, attrs: AttributesInterface, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, text: string): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, text: string, attrs: AttributesInterface): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    <K extends keyof SVGElementTagNameMap>(this: WeyaContext | void, tag: K, selector: string, parent: WeyaElement, attrs: AttributesInterface, func: WeyaTemplateFunction): SVGElementTagNameMap[K]

    // css selector
    (this: WeyaContext | void, selector: string): WeyaElement

    (this: WeyaContext | void, selector: string, parent: WeyaElement): WeyaElement

    (this: WeyaContext | void, selector: string, attrs: AttributesInterface): WeyaElement

    (this: WeyaContext | void, selector: string, text: string): WeyaElement

    (this: WeyaContext | void, selector: string, text: string, attrs: AttributesInterface): WeyaElement

    (this: WeyaContext | void, selector: string, func: WeyaTemplateFunction): WeyaElement

    (this: WeyaContext | void, selector: string, attrs: AttributesInterface, func: WeyaTemplateFunction): WeyaElement

    (this: WeyaContext | void, selector: string, parent: WeyaElement, attrs: AttributesInterface): WeyaElement

    (this: WeyaContext | void, selector: string, parent: WeyaElement, text: string): WeyaElement

    (this: WeyaContext | void, selector: string, parent: WeyaElement, text: string, attrs: AttributesInterface): WeyaElement

    (this: WeyaContext | void, selector: string, parent: WeyaElement, func: WeyaTemplateFunction): WeyaElement

    (this: WeyaContext | void, selector: string, parent: WeyaElement, attrs: AttributesInterface, func: WeyaTemplateFunction): WeyaElement

    // Default tag = div
    (this: WeyaContext | void): HTMLDivElement

    (this: WeyaContext | void, parent: WeyaElement): HTMLDivElement

    (this: WeyaContext | void, attrs: AttributesInterface): HTMLDivElement

    (this: WeyaContext | void, text: string): HTMLDivElement

    (this: WeyaContext | void, text: string, attrs: AttributesInterface): HTMLDivElement

    (this: WeyaContext | void, func: WeyaTemplateFunction): HTMLDivElement

    (this: WeyaContext | void, parent: WeyaElement, attrs: AttributesInterface): HTMLDivElement

    (this: WeyaContext | void, parent: WeyaElement, text: string): HTMLDivElement

    (this: WeyaContext | void, parent: WeyaElement, text: string, attrs: AttributesInterface): HTMLDivElement

    (this: WeyaContext | void, parent: WeyaElement, func: WeyaTemplateFunction): HTMLDivElement
}

interface WeyaContext {
    _elem?: WeyaElement,
}

interface Parameters {
    def: ElemDef | null,
    text: string | null,
    attrs: AttributesInterface | null,
    func: WeyaTemplateFunction | null,
    parent: WeyaElement
}

interface StylesInterface {
    [prop: string]: string | null
}

interface EventsInterface {
    [prop: string]: EventListenerOrEventListenerObject
}

interface DataInterface {
    [prop: string]: any
}

interface AttributesInterface {
    style?: StylesInterface
    on?: EventsInterface
    data?: DataInterface

    // Other Attributes can be string or null
    [prop: string]: string | number | null | StylesInterface | EventsInterface
}

interface ElemDef {
    tag: string,
    id: string | null,
    classes: string[]
}

function parseDefinition(str: string): ElemDef {
    let res: ElemDef = {
        tag: '',
        id: null,
        classes: []
    }

    let parts = str.split(".")
    let first = parts[0]
    let firstParts = first.split('#')
    res.tag = firstParts[0]
    if (firstParts.length == 2) {
        res.id = firstParts[1]
    } else if (firstParts.length > 2) {
        throw Error("Invalid Definition: " + str)
    }

    if (parts.length > 1) {
        res.classes = parts.slice(1)
    }

    return res
}

function isValidTag(str: string): boolean {
    for(let c of str) {
        if(c.toLowerCase() !== c && c.toUpperCase() === c)
            return false
    }

    return true
}
function getParameters(args: WeyaElementArg[]) {
    let params: Parameters = {
        def: null,
        text: null,
        attrs: null,
        func: null,
        parent: null
    }
    if (args.length == 0) {
        params.def = parseDefinition('div')
    } else if (typeof args[0] == 'string') {
        let arg0 = <string>args[0]
        if (isValidTag(arg0) && args.length > 1 && (typeof args[1] == 'string')) {
            const arg1 = <string>args[1]
            if(arg1.length > 1 && (arg1[0] === '.' || arg1[0] === '#')) {
                arg0 += arg1
                args = args.slice(1)
            }
        }
        params.def = parseDefinition(arg0)
        args = args.slice(1)
    }

    for (let arg of args) {
        switch (typeof arg) {
            case "function":
                params.func = arg as WeyaTemplateFunction
                break
            case "object":
                if (arg instanceof HTMLElement || arg instanceof SVGElement) {
                    params.parent = arg as WeyaElement
                } else {
                    params.attrs = arg as AttributesInterface
                }
                break
            case "string":
                params.text = arg as string
        }
    }
    return params
}

function domAPICreate(): WeyaElementFunction {
    function setStyles(elem: WeyaElement, styles: StylesInterface) {
        for (let k in styles) {
            let v = styles[k]
            if (v != null) {
                elem.style.setProperty(k, v)
            } else {
                elem.style.removeProperty(k)
            }
        }
    }

    function setEvents(elem: WeyaElement, events: EventsInterface) {
        for (let k in events) {
            let names = k.split('|')
            for (let name of names) {
                elem.addEventListener(name, events[k], false)
            }
        }
    }

    function setData(elem: WeyaElement, data: DataInterface) {
        for (let k in data) {
            elem[k] = data[k]
        }
    }

    function setAttributes(elem: WeyaElement, attrs: AttributesInterface) {
        for (let k in attrs) {
            let v = attrs[k]
            switch (k) {
                case "style":
                    setStyles(elem, v as StylesInterface)
                    break
                case "on":
                    setEvents(elem, v as EventsInterface)
                    break
                case "data":
                    setData(elem, v as DataInterface)
                    break
                default:
                    if (v != null) {
                        elem.setAttribute(k, v as string)
                    } else {
                        elem.removeAttribute(k)
                    }
            }
        }
    }

    let setIdClass: typeof setIdClassNew

    function setIdClassNew(elem: WeyaElement, idClass: ElemDef) {
        if (idClass.id != null) {
            elem.id = idClass.id
        }
        for (let c of idClass.classes) {
            elem.classList.add(c)
        }
    }

    function setIdClassFallback(elem: WeyaElement, idClass: ElemDef) {
        if (idClass.id != null) {
            elem.id = idClass.id
        }
        if (idClass.classes.length > 0) {
            let className = idClass.classes.join(" ")
            elem.setAttribute("class", className)
        }
    }

    function switchIdClass() {
        let elem = API.document.createElementNS("http://www.w3.org/2000/svg", "g")
        if (!elem.classList) {
            setIdClass = setIdClassFallback
        } else {
            setIdClass = setIdClassNew
        }
    }

    switchIdClass()

    function append(this: WeyaContext, ...args: WeyaElementArg[]): WeyaElement {
        let params = getParameters(args)

        let parent = params.parent
        if (this != null && this._elem != null) {
            if (parent != null) {
                throw Error("Cannot set a parent within a context")
            }
            parent = this._elem
        }

        let elem: WeyaElement

        if (params.def == null) {
            elem = parent
        } else {

            let tag = params.def.tag
            let ns = NAMESPACES[TAGS_DICT[tag]]

            if (ns != null) {
                elem = API.document.createElementNS(ns, tag) as WeyaElement
            } else {
                elem = API.document.createElement(tag)
            }

            if (params.def != null) {
                setIdClass(elem, params.def)
            }
            if (params.attrs != null) {
                setAttributes(elem, params.attrs)
            }
            if (parent != null) {
                parent.appendChild(elem)
            }
        }

        if (params.func != null) {
            let state: WeyaContext = {
                _elem: elem
            }
            params.func(append.bind(state))
        } else if (params.text != null) {
            elem.textContent = params.text
        }
        return elem
    }

    return <WeyaElementFunction>append
}

export let Weya = domAPICreate()
