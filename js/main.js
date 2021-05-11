//Declared variable and set to false to ensure user is not logged yet
var logged = false;

//Condition to verify if user has already been authenticated
if(localStorage.getItem("access") == "true"){
    logged = true;
    console.log('logged');
    
    //Function to show username in the main page by DOM
    function greeting(){
        var s = document.getElementById("greeting").innerHTML = "Hello, " + localStorage.getItem("nameUser");
        
    }
    
    //function to log user out
    function logout(){
        localStorage.setItem("access", false);
        window.location.href = "../html/login.html";
        alert("You are logged out now")
    }
    
    function drawChart(){    

        //Totals Data
        var data_set = document.getElementById("data_origin").value;
        d3.csv(data_set).then(function(data){
            console.log(data);
    
        //Values for bar chart
        var height = document.getElementById("charHeight").value;
        var width = 700;
        var dataCount = data.length;
        var gap = 5;
        var chartColor = document.getElementById("colorPicker").value;
        
        alert(data_set);
    
        
    
        //Convert to numbers
        data.forEach(function(d){
            d.totals = Number(d.totals);
        })
    
    
        //create a scale for y
        var yScale = d3.scaleLinear()
            .domain([0,d3.max(data,function(d){
                return d.totals
            })])
            .range([height,0]);
    
        //Create a scale for x
        var xScale = d3.scaleBand()
            .domain(data.map(function(d){
                return d.month;
            }))
            .range([0,width]);
    
    
        //Create y Axis
        var yAxis = d3.axisLeft()
            .scale(yScale)
    
        //Create X Axis
        var xAxis = d3.axisBottom()
            .scale(xScale);
    
        d3.select("#myDiv").selectAll("*").remove();
    
        //Create an SVG Container
        var svgContainer = d3.select("#myDiv").append("svg")
            .attr("width", 1000)
            .attr("height", 1000);
    
        //Creatye a rectangle
        var myRectangle = svgContainer.selectAll("rect")
            .data(data);
    
        //Add Attributes to rectangle
        myRectangle.enter()
            .append("rect")
                .attr("x", function(d,i){
                    return (100 + (i*(width/dataCount)));
    
                })
                .attr("y",function(d){
                    return yScale(d.totals);
                })
                .attr("width",(width/dataCount - gap))
                .attr("height", function(d){ 
                    return (height) - yScale(d.totals);
                })
                .attr("fill",chartColor);
    
    
        //Position of Y label
        svgContainer.append("g")
                .attr("transform", "translate(95,0)")
                .call(yAxis);
    
        //Position of X label
        svgContainer.append("g")
            .attr("transform", "translate(100," + height + ")")    
            .call(xAxis)
            .selectAll("text")
                .attr("transform", "rotate(60)")
                .attr("text-anchor", "start")
                .attr("x", "9")
                .attr("y","3");
                
    
        });
    }
    

    
}



//Condition to verify if user is not authenticated - if not, it will open login page
if(logged != true){
    alert("User has not been authenticated!");
    window.location.href="../html/login.html";

}



