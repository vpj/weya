#Weya

Weya is a lightweight library we use to replace [Coffeecup](https://github.com/gradus/coffeecup) and DOM manipulation of [d3.js](http://d3js.org/). Weya is very close to [Vanilla javascript](http://vanilla-js.com/), but with more readable code. Usage of Weya is similar to coffeecup, [but as fast as d3.js](http://jsperf.com/weya-jquery-d3-coffeecup).

###Links

* JsPerf - [http://jsperf.com/weya-jquery-d3-coffeecup](http://jsperf.com/weya-jquery-d3-coffeecup)
* Blog post - [http://vpj.svbtle.com/weyacoffee](http://vpj.svbtle.com/weyacoffee)
* Example bar chart - [http://bl.ocks.org/vpj/9636655](http://bl.ocks.org/vpj/9636655)

Here's a small example to show the usage.

    userElems = []
    Weya container, ->
     @div ".users", ->
      for user, i in users
       userDiv = @div '.user', on: {click: editUser}, ->
        name = @span ".name", user.name
        @span ".phone", user.phone
        if v.image?
         @img src: user.image

       userDiv.userId = i
       userElems.push user: user, name: name

The above code creates a list of users. It binds the data to the dom element `userDiv.userId = i` and also keeps track of all the DOM elements in `userElems`. This is important if you want to manipulate the DOM without reloading the entire user list, for example if a name of a user changes you could change it with `userElems[changedUserId].name.textContent = changedUserName`.

##As a template engine

Weya is quite similar to Coffeecup in terms of the syntax. But it's much [faster](http://jsperf.com/weya-jquery-d3-coffeecup), so it won't fail if you have lots of elements.

Also, Weya lets you register event handlers. This is much cleaner than registering events later with CSS selectors, and it's easier to maintain the code since events are register within the DOM creation code.

#As a replacement for d3.js DOM manipulation

We use weya to replace most all the d3.js DOM manipulation.

Code with Weya is simpler, shorter and nicely intended. Here's the code that draws bar chart in	[this example](http://bl.ocks.org/vpj/9636655).

    Weya svg, ->
     for d in data
      @g ".g", transform: "translate(#{x0 d.State},0)", ->
       for age in d.ages
        @rect
         width: x1.rangeBand()
         x: x1 age.name
         y: y age.value
         height: height - y age.value
         fill: color age.name

     for d, i in ageNames.slice().reverse()
      @g ".legend", transform: "translate(0,#{i * 20})", ->
       @rect x: width - 18, width: 18, height: 18, fill: color d
       @text
        x: width - 24, y: 9, dy: ".35em"
        style: {'text-anchor': "end"}, text: d

Here's the code that does the [same with d3.js](http://bl.ocks.org/mbostock/3887051).

    var state = svg.selectAll(".state")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

    state.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

Another problem solved by Weya is that d3.js draws all the elements that are represented by the data at once. And with Weya you can draw progressively - this is quite useful when you have a lot of data and you don't won't the interface to go unresponsive until everything is drawn. Here's a small example to show the point.

    i = 0
    data = ...

    draw = ->
     return if i is data.length

     d = data[i]
     Weya container, ->
      @div '.user', ->
       ...

     i++
     requestAnimationFrame draw

    draw()

The disadvantage of Weya over d3.js is that it doesn't bind data to DOM elements like d3.js does. So you can't use `enter()`, `exit()` and updates when data changes. But most users rarely need these features.

