# Weya.Base.js

    @Weya = {} unless @Weya?
    Weya = @Weya

    Weya.ANALYTICS = {}

    WRAP = (className, methodName, func) ->
     wrap = ->
      args = (typeof arg for arg in arguments)
      args = args.join ','
      c = Weya.ANALYTICS[className] ?= {}
      c = c[methodName] ?= {}
      ret = func.apply this, arguments
      signature = "(#{args}) -> #{typeof ret}"
      c[signature] ?= 0
      c[signature]++
      return ret



## Weya.Base
Introduces class level function initialize and include.

    class Base
     _initialize: []
     on: {}

     _extended: true

     _debug: false
     _analytics: true

     @weyaDebug: ->
      @::_debug = true

     @weyaAnalytics: (name) ->
      @::_analytics = true

      return if not @::_debug

      for k, v of this.prototype
       continue if ((typeof v) isnt 'function')
       this.prototype[k] = WRAP name, k, v

Extend Events

     @extend: ->
      events = @::on
      @::on = {}
      @::on[k] = v for k, v of events
      @::_extended = true
      @::_analytics = false

Add event listeners

     @listen: (name, func) ->
      @::on[name] = func

Getter

     @get: (name, func) ->
      @::__defineGetter__ name, func

Setter

     @set: (name, func) ->
      @::__defineSetter__ name, func

     constructor: ->
      @_init.apply this, arguments

#### Register initialize functions.
All initializer funcitons in subclasses will be called with the constructor
arguments.

     @initialize: (func) ->
      #if not @::_extended
      # throw new Error 'Class not extended'

      @::_extended = false

      @::_initialize = @::_initialize.slice()
      @::_initialize.push func

     _init: ->
      if not @_analytics
       throw new Error 'Class analytics not called'

      for init in @_initialize
       init.apply this, arguments

      return

#### Include objects.
You can include objects by registering them with @include. This tries to
solve the problem of single inheritence.

     @include: (obj) ->
      for k, v of obj
       switch k
        when 'initialize'
         @::_initialize.push v
        when 'on'
         for event, listener of v
          @::on[event] = listener
        else
         @prototype[k] = v

     @initialize ->
      events = @on
      @on = {}
      for k, v of events
       @on[k] = v.bind this

    Weya.Base = Base

    if module?
     module.exports = Weya.Base

