//declare and initilize variables for use
let lat = 0;
let long = 0;
let city = '';
let iconUrl = '';
let countryCode = '';

//function to get the latlong coords using the weather api call
//return a Promise for use in sequential processing
function getCoord () {
    let zipcode = $('#input').val();
    let country = $('#inputCountry').val();

    return new Promise((resolve, reject) => {
        $.get("https://api.openweathermap.org/data/2.5/weather?zip="+zipcode+","+country+"&APPID=36de89dd9ba1aaa422fa4d99ab092bef", (response) => {
            //console.log(response);
            lat = response.coord.lat; //store coords in variable
            long = response.coord.lon;
            city = response.name;
            countryCode = country;
            //show page 2
            $('#page2').show();
            $('#threeDayForcast').show(); //show button to jump to page 2
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

            //appends current relevent weather and time data for zipcode entered by user
            $('#datebox').append("Local date is: <span>" + moment().tz(response.timezone).format('dddd, MMMM Do YYYY') + "</span><br>");
            $('#datebox').append("Time at " + city + ", "+countryCode.toUpperCase()+" is: <span>" + moment().tz(response.timezone).format('hh:mm:ss a') + "</span><br>");
            $('#datebox').append("Weather at " + city + ", "+countryCode.toUpperCase()+" is: <span>" + response.current.weather[0].main + "<img style='width: 30px;' src="+iconUrl+">" + "</span><br>With a temperature of: <span>"+ response.current.temp + " °F</span><br>");
            $('#citybox').append("<h2>Three day forecast for "+ city +", "+countryCode.toUpperCase()+":</h2>");

            //switch statment to load current weather images based on main weather conditions
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

            //day 1 weather info card
            switch(response.daily[1].weather[0].main) {
                case "Clear": 
                    $('#day1').append("<img class='img-fluid' src='https://media.giphy.com/media/QZz9r30N2RM7DFIXqE/source.gif'>");
                    $('#day1date').append(moment().tz(response.timezone).add(1, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day1weather').append("Weather: "+response.daily[1].weather[0].main+"<br>Temperature: "+response.daily[1].temp.day+"°F");
                    break;
                case "Thunderstorm": 
                    $('#day1').append("<img class='img-fluid' src='https://media.giphy.com/media/QZz9r30N2RM7DFIXqE/source.gif'>");
                    $('#day1date').append(moment().tz(response.timezone).add(1, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day1weather').append("Weather: "+response.daily[1].weather[0].main+"<br>Temperature: "+response.daily[1].temp.day+"°F");
                    break;
                case "Drizzle":
                case "Rain":
                    $('#day1').append("<img class='img-fluid' src='https://media.giphy.com/media/U7yxnzr21Xhnnb7Zxz/source.gif'>");
                    $('#day1date').append(moment().tz(response.timezone).add(1, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day1weather').append("Weather: "+response.daily[1].weather[0].main+"<br>Temperature: "+response.daily[1].temp.day+"°F");
                    break;
                case "Snow":
                    $('#day1').append("<img class='img-fluid' src='https://media.giphy.com/media/6YNgoTEPs6vZe/source.gif'>");
                    $('#day1date').append(moment().tz(response.timezone).add(1, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day1weather').append("Weather: "+response.daily[1].weather[0].main+"<br>Temperature: "+response.daily[1].temp.day+"°F");
                    break;
                case "Clouds":
                    $('#day1').append("<img class='img-fluid' src='https://media.giphy.com/media/Ke7i5t6QDmDSO82Uga/source.gif'>");
                    $('#day1date').append(moment().tz(response.timezone).add(1, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day1weather').append("Weather: "+response.daily[1].weather[0].main+"<br>Temperature: "+response.daily[1].temp.day+"°F");
                    break;
                default:
                    $('#day1').append("<img class='img-fluid' src='https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/source.gif'>");
                    $('#day1date').append(moment().tz(response.timezone).add(1, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day1weather').append("Weather: "+response.daily[1].weather[0].main+"<br>Temperature: "+response.daily[1].temp.day+"°F");
                    break;
            };

            //day 2 weather info card
            switch(response.daily[2].weather[0].main) {
                case "Clear": 
                    $('#day2').append("<img class='img-fluid' src='https://media.giphy.com/media/QZz9r30N2RM7DFIXqE/source.gif'>");
                    $('#day2date').append(moment().tz(response.timezone).add(2, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day2weather').append("Weather: "+response.daily[2].weather[0].main+"<br>Temperature: "+response.daily[2].temp.day+"°F");
                    break;
                case "Thunderstorm": 
                    $('#day2').append("<img class='img-fluid' src='https://media.giphy.com/media/xUOwGoNa2uX6M170d2/source.gif'>");
                    $('#day2date').append(moment().tz(response.timezone).add(2, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day2weather').append("Weather: "+response.daily[2].weather[0].main+"<br>Temperature: "+response.daily[2].temp.day+"°F");
                    break;
                case "Drizzle":
                case "Rain":
                    $('#day2').append("<img class='img-fluid' src='https://media.giphy.com/media/U7yxnzr21Xhnnb7Zxz/source.gif'>");
                    $('#day2date').append(moment().tz(response.timezone).add(2, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day2weather').append("Weather: "+response.daily[2].weather[0].main+"<br>Temperature: "+response.daily[2].temp.day+"°F");
                    break;
                case "Snow":
                    $('#day2').append("<img class='img-fluid' src='https://media.giphy.com/media/6YNgoTEPs6vZe/source.gif'>");
                    $('#day2date').append(moment().tz(response.timezone).add(2, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day2weather').append("Weather: "+response.daily[2].weather[0].main+"<br>Temperature: "+response.daily[2].temp.day+"°F");
                    break;
                case "Clouds":
                    $('#day2').append("<img class='img-fluid' src='https://media.giphy.com/media/Ke7i5t6QDmDSO82Uga/source.gif'>");
                    $('#day2date').append(moment().tz(response.timezone).add(2, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day2weather').append("Weather: "+response.daily[2].weather[0].main+"<br>Temperature: "+response.daily[2].temp.day+"°F");
                    break;
                default:
                    $('#day2').append("<img class='img-fluid' src='https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/source.gif'>");
                    $('#day2date').append(moment().tz(response.timezone).add(2, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day2weather').append("Weather: "+response.daily[2].weather[0].main+"<br>Temperature: "+response.daily[2].temp.day+"°F");
                    break;
            };

            //day 3 weather info card
            switch(response.daily[3].weather[0].main) {
                case "Clear": 
                    $('#day3').append("<img class='img-fluid' src='https://media.giphy.com/media/QZz9r30N2RM7DFIXqE/source.gif'>");
                    $('#day3date').append(moment().tz(response.timezone).add(3, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day3weather').append("Weather: "+response.daily[3].weather[0].main+"<br>Temperature: "+response.daily[3].temp.day+"°F");
                    break;
                case "Thunderstorm": 
                    $('#day3').append("<img class='img-fluid' src='https://media.giphy.com/media/xUOwGoNa2uX6M170d2/source.gif'>");
                    $('#day3date').append(moment().tz(response.timezone).add(3, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day3weather').append("Weather: "+response.daily[3].weather[0].main+"<br>Temperature: "+response.daily[3].temp.day+"°F");
                    break;
                case "Drizzle":
                case "Rain":
                    $('#day3').append("<img class='img-fluid' src='https://media.giphy.com/media/U7yxnzr21Xhnnb7Zxz/source.gif'>");
                    $('#day3date').append(moment().tz(response.timezone).add(3, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day3weather').append("Weather: "+response.daily[3].weather[0].main+"<br>Temperature: "+response.daily[3].temp.day+"°F");
                    break;
                case "Snow":
                    $('#day3').append("<img class='img-fluid' src='https://media.giphy.com/media/6YNgoTEPs6vZe/source.gif'>");
                    $('#day3date').append(moment().tz(response.timezone).add(3, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day3weather').append("Weather: "+response.daily[3].weather[0].main+"<br>Temperature: "+response.daily[3].temp.day+"°F");
                    break;
                case "Clouds":
                    $('#day3').append("<img class='img-fluid' src='https://media.giphy.com/media/Ke7i5t6QDmDSO82Uga/source.gif'>");
                    $('#day3date').append(moment().tz(response.timezone).add(3, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day3weather').append("Weather: "+response.daily[3].weather[0].main+"<br>Temperature: "+response.daily[3].temp.day+"°F");
                    break;
                default:
                    $('#day3').append("<img class='img-fluid' src='https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/source.gif'>");
                    $('#day3date').append(moment().tz(response.timezone).add(3, 'd').format('dddd, MMMM Do YYYY'));
                    $('#day3weather').append("Weather: "+response.daily[3].weather[0].main+"<br>Temperature: "+response.daily[3].temp.day+"°F");
                    break;
            };

            updateFooter(); //call to update footer
        }); 
    };

//click event for submit button
$('#inputbtn').click(() => {
    //clears the divs before appending
    $('#datebox').empty();
    $('#day1date,#day1weather,#day2date,#day2weather,#day3date,#day3weather,#citybox').empty();
    $('#day1 img,#day2 img,#day3 img').remove();

    //execute functions in sequence
    getCoord().then(getData).catch((err) => {
       $('#datebox').append(err)});

    $('#inputbtn').focus(); //moves cursor out of input field
});

//allows enter key to submit user input
$('#input,#inputCountry').keyup((e) => {
    if(e.keyCode == 13){
        $('#inputbtn').click()
    };
});

//moves footer to bottom of content
function updateFooter() {
    $('footer').css("position","static");
};