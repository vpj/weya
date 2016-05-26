Weya.Base.weyaDebug()

class Student extends Weya.Base
 @initialize (name, age) ->
  @name = name
  @age = age
  @exams = []

 addExam: (name, score) ->
  @exams.push name: name, score: score

 getTotal: ->
  sum = 0
  sum += exam.score for exam in @exams
  return sum

 getAverage: -> @getTotal() / @exams.length

 @weyaAnalytics 'Student'

student = new Student "Varuna", 26
student.addExam 'asdf', 21
student.addExam 21, 23
console.log student.getTotal student
console.log student.getAverage()
console.log Weya.ANALYTICS
