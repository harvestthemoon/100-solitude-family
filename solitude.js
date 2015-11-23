// SVG dimensions.
var width = 500,
    height = 500;

// Other constants.
var generationMultiplier = 3;

// Force layout.
var force = d3.layout.force()
    		  .charge(-120)
	   		  .linkDistance(function(d) { 
           	  	return 80 - generationMultiplier * d.source.generation;
      		  })
              .size([width, height]);

var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

// Read JSON data. 
var mis = document.getElementById('json').innerHTML;
graph = JSON.parse(mis);

force.nodes(graph.nodes)
     .links(graph.links)
     .start();

// Create line SVGs.
var link = svg.selectAll(".link")
              .data(graph.links)
              .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function (d) {
    		  	return 2;
			  });

// Create circle SVGs.
var node = svg.selectAll(".node")
    		  .data(graph.nodes)
    		  .enter().append("g")
    		  .attr("class", "node")
    		  .call(force.drag);

node.append("circle")
    .attr("r", function(d) {
    	return 20 - generationMultiplier * d.generation;
	})
    .style("fill", function (d) {
    	// Red color.
    	var color = "#FF4136";
    	if (d.buendia) {
            // Blue color.
            color = "#0074D9";
        }   
    	return d3.rgb(color).brighter(d.generation / 3);
	})

node.append("text")
      .attr("dx", function(d) {
	  	return 25 - generationMultiplier * d.generation;
	  })
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

force.on("tick", function () {
    link.attr("x1", function (d) {
        	return d.source.x;
    	})
        .attr("y1", function (d) {
        	return d.source.y;
    	})
        .attr("x2", function (d) {
        	return d.target.x;
    	})
        .attr("y2", function (d) {
        	return d.target.y;
    	});

    d3.selectAll("circle").attr("cx", function (d) {
        	return d.x;
    	})
        .attr("cy", function (d) {
        	return d.y;
    	});

    d3.selectAll("text").attr("x", function (d) {
        	return d.x;
    	})
        .attr("y", function (d) {
        	return d.y;
    	});
});