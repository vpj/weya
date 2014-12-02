Create a sample div

    class Student
     constructor: (name, age) ->
      @name = name
      @age = age

     template: ->
      @div "#name.col-md-6", ->
       @span "Name"
       @span @$.name
      @div "#age.col-md-6", style: {background: "red"}, ->
       @span "Age"
       @span "#{@$.age}"
       @input "#ageInput", type: "text", null

     render: ->
      console.log Weya.markup context: this, @template
      Weya elem: document.body, context: this, @template


    student = new Student "Varuna", 26
    student.render()
