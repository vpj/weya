
const TAGS = {
  svg: "a altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform circle clipPath color-profile cursor defs desc ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph mpath path pattern polygon polyline radialGradient rect script set stop style svg symbol text textPath title tref tspan use view vkern switch foreignObject",
  html: "a abbr address article aside audio b bdi bdo blockquote body button canvas caption cite code colgroup datalist dd del details dfn div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd label legend li main map mark menu meter nav noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small span strong style sub summary sup table tbody td textarea tfoot th thead time title tr u ul video",
  htmlVoid: "area base br col command embed hr img input keygen link meta param source track wbr"
};

const API = {
  document: document
};

export type WeyaElementArg = (WeyaElementFunction | Object | string)
export type WeyaElementFunction = (...args: WeyaElementArg[]) => HTMLElement
export interface WeyaHelper {
  [param: string]: WeyaElementFunction;
}

function parseIdClass(str: string) {
  let res: {id: string | null, classes: string[]} = {
    id: null,
    classes: []
  };
  let parts = str.split(".");
  for (let c of parts) {
    if (c.indexOf("#") === 0) {
      res.id = c.substr(1);
    } else if (c !== "") {
      res.classes.push(c);
    }
  }
  return res;
};

function getParameters(args: WeyaElementArg[]) {
  let params: {
    idClass: stirng | null, 
    text: string | null, 
    attrs: Object | null,
    func: WeyaElementFunction | null
  } = {
    idClass: null,
    text: null,
    attrs: null,
    func: null
  };
  let first: boolean = true
  for (let arg of args) {
    switch (typeof arg) {
      case "function":
        params.func = arg as WeyaElementFunction;
        break;
      case "object":
        params.attrs = arg;
        break;
      case "string":
        let c = (arg as string).charAt(0);
        if (first && (c === "#" || c === ".")) {
          params.idClass = parseIdClass(arg as string);
        } else {
          params.text = arg as string;
        }
    }
    first = false
  }
  return params;
};

interface WeyaInterface {
  _elem: HTMLElement | null,
  context: Object | null,
  [param: string]: WeyaElementFunction | HTMLElement | Object | null
}

function domAPICreate() {
  let weya: WeyaInterface = {
    _elem: null,
    context: null
  };
  function setStyles(elem: HTMLElement, styles) {
    for (let k in styles) {
      let v = styles[k];
      if (v != null) {
        elem.style.setProperty(k, v)
      } else {
        elem.style.removeProperty(k)
      }
    }
  }
  function setEvents(elem: HTMLElement, events) {
    for (let k in events) {
      elem.addEventListener(k, events[k], false)
    }
  }
  function setData(elem, data) {
    for (let k in data) {
      elem[k] = data[k]
    }
  };
  function setAttributes(elem: HTMLElement, attrs) {
    for (let k in attrs) {
      let v = attrs[k];
      switch (k) {
        case "style":
          setStyles(elem, v)
          break;
        case "on":
          setEvents(elem, v)
          break;
        case "data":
          setData(elem, v)
          break;
        default:
          if (v != null) {
            elem.setAttribute(k, v)
          } else {
            elem.removeAttribute(k)
          }
      }
    }
  }
  let setIdClass;
  function setIdClassNew(elem: HTMLElement, idClass) {
    if (idClass.id != null) {
      elem.id = idClass.id;
    }
    for (let c of idClass.classes) {
      elem.classList.add(c)
    }
  }
  function setIdClassFallback(elem: HTMLElement, idClass) {
    if (idClass.id != null) {
      elem.id = idClass.id;
    }
    if (idClass.classes.length > 0) {
      let className = idClass.classes.join(" ")
      elem.setAttribute("class", className);
    }
  };
  function switchIdClass() {
    let elem;
    elem = API.document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (!elem.classList) {
      setIdClass = setIdClassFallback;
    } else {
      setIdClass = setIdClassNew
    }
  };
  switchIdClass();
  function append(this: WeyaInterface, ns, name, args): HTMLElement {
    let params = getParameters(args);
    let pElem = this._elem;
    let elem;
    if (ns != null) {
      elem = this._elem = API.document.createElementNS(ns, name);
    } else {
      elem = this._elem = API.document.createElement(name);
    }
    if (params.idClass != null) {
      setIdClass(elem, params.idClass);
    }
    if (params.attrs != null) {
      setAttributes(elem, params.attrs);
    }
    if (pElem != null) {
      pElem.appendChild(elem);
    }
    if (params.func != null) {
      params.func.call(weya.context, weya);
    } else if (params.text != null) {
      elem.textContent = params.text;
    }
    this._elem = pElem;
    return elem;
  };
  function wrapAppend(ns, name) {
    return function (this: WeyaInterface): HTMLElement {
      return append.call(this, ns, name, arguments);
    };
  };
  {
    let tags = TAGS.svg.split(" ")
    for (let name of tags) {
      weya[name] = wrapAppend("http://www.w3.org/2000/svg", name);
    }
  }
  {
    let tags = TAGS.html.split(" ")
    for (let name of tags) {
      weya[name] = wrapAppend("http://www.w3.org/1999/xhtml", name);
    }
  }
  {
    let tags = TAGS.htmlVoid.split(" ")
    for (let name of tags) {
      weya[name] = wrapAppend(null, name);
    }
  }

  return weya
}

let WEYA_DOM = domAPICreate()

export interface WeyaOptions {
  context: any,
  elem: HTMLElement
}

export let Weya = function (options: WeyaOptions, func: (WeyaHelper) => HTMLElement) {
  let weya = WEYA_DOM
  let pContext = weya.context;
  weya.context = options.context;
  let pElem = weya._elem;
  weya._elem = options.elem;
  let res = func.call(weya.context, weya)
  weya._elem = pElem;
  weya.context = pContext;
  return res
}

// Example call
// Weya({ context: {}, elem: document.body}, ($: WeyaHelper): HTMLElement => {
//   return $.test()
// })