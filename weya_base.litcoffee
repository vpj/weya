#Weya.Base.js

    @Weya = {} unless @Weya?
    Weya = @Weya

##Weya.Base
Introduces class level function initialize and include.

    class Base
     _initialize: []
     on: {}

     @extend: ->
      @::_initialize = @::_initialize.slice()
      events = @::on
      @::on = {}
      @::on[k] = v for k, v of events

     constructor: ->
      @_init.apply @, arguments

     on: {}

####Register initialize functions.
All initializer funcitons in subclasses will be called with the constructor
arguments.

     @initialize: (func) ->
      inits = @::_initialize
      @::_initialize = []
      for v in inits
       @::_initialize.push v
      @::_initialize.push func

     _init: ->
      for init in @_initialize
       init.apply @, arguments

      return

####Include objects.
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
         @::[k] = v

     @initialize ->
      events = @on
      @on = {}
      for k, v of events
       @on[k] = v.bind this

    Weya.Base = Base

    if module?
     module.exports = Weya.Base

