//click event for submit button
$('#inputbtn').click(() => {
    $('#datebox').empty(); //clears the div before appending

    //declare and initilize variables for use
    let zipcode = $('#input').val();
    let lat = 0;
    let long = 0;
    let city = '';
    let iconUrl = '';

    //function to get the latlong coords using the weather api call
    //return a Promise for use in sequential processing
    function getCoord () {
        return new Promise((resolve, reject) => {
            $.get("https://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",us&APPID=36de89dd9ba1aaa422fa4d99ab092bef", (response) => {
                //console.log(response);
                lat = response.coord.lat; //store coords in variable
                long = response.coord.lon;
                city = response.name;
                resolve(); //resolve promise
            }).fail(() => {
                reject("Invalid Zip Code. Try Again!"); //failed to retrieve info, reject
            });
        });
    };
    
    //function to get timezone information for use with moment package
    //using the one call weather api
    //uses latlong coords from getCoord()
    function getData () {
        $.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&units=imperial&appid=36de89dd9ba1aaa422fa4d99ab092bef", (response) => {
            //console.log(response);
            iconUrl = "http://openweathermap.org/img/wn/"+response.current.weather[0].icon+"@2x.png"; //stores url for weather icons

            //appends relevent weather and time data for zipcode entered by user
            $('#datebox').append("Local date is: <span>" + moment().tz(response.timezone).format('dddd, MMMM Do YYYY') + "</span><br>");
            $('#datebox').append("Time at " + city + " is: <span>" + moment().tz(response.timezone).format('hh:mm:ss a') + "</span><br>");
            $('#datebox').append("Weather at " + city + " is: <span>" + response.current.weather[0].main + "<img style='width: 30px;' src="+iconUrl+">" + "</span><br>With a temperature of: <span>"+ response.current.temp + " degrees Fahrenheit</span><br>");

            //switch statment to load weather images based on main weather conditions
            switch(response.current.weather[0].main) {
                case "Clear": 
                    $('#datebox').append("<img src='https://media.giphy.com/media/QZz9r30N2RM7DFIXqE/source.gif'>")
                    break;
                case "Thunderstorm": 
                    $('#datebox').append("<img src='https://media.giphy.com/media/xUOwGoNa2uX6M170d2/source.gif'>")
                    break;
                case "Drizzle":
                case "Rain":
                    $('#datebox').append("<img src='https://media.giphy.com/media/U7yxnzr21Xhnnb7Zxz/source.gif'>")
                    break;
                case "Snow":
                    $('#datebox').append("<img src='https://media.giphy.com/media/6YNgoTEPs6vZe/source.gif'>")
                    break;
                case "Clouds":
                    $('#datebox').append("<img src='https://media.giphy.com/media/Ke7i5t6QDmDSO82Uga/source.gif'>")
                    break;
                default:
                    $('#datebox').append("<img src='https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/source.gif'>")
                    break;
            };
        }); 
    };
    
    //execute functions in sequence
    getCoord().then(getData).catch((err) => {
       $('#datebox').append(err)});

    $('#input').focus(); //keeps cursor in input box upon submit
});

//allows enter key to submit user input
$('#input').keyup((e) => {
    if(e.keyCode == 13){
        $('#inputbtn').click()
    };
});