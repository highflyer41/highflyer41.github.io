$('#inputbtn').click(() => {
    $('#datebox').empty();

    let zipcode = $('#input').val();
    let lat = 0;
    let long = 0;
    let city = '';

    function getCoord () {
        return new Promise((resolve, reject) => {
            $.get("https://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",us&APPID=36de89dd9ba1aaa422fa4d99ab092bef", (response) => {
                //console.log(response);
                lat = response.coord.lat;
                long = response.coord.lon;
                city = response.name;
                resolve();
            }).fail(() => {
                reject("Invalid Zip Code. Try Again!");
            });
        });
    };
    
    function getData () {
        $.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&units=imperial&appid=36de89dd9ba1aaa422fa4d99ab092bef", (response) => {
            //console.log(response);
            $('#datebox').append("Local date is: <span>" + moment().tz(response.timezone).format('dddd, MMMM Do YYYY') + "</span><br>");
            $('#datebox').append("Time at " + city + " is: <span>" + moment().tz(response.timezone).format('hh:mm:ss a') + "</span><br>");
            $('#datebox').append("Weather at " + city + " is: <span>" + response.current.weather[0].main + "</span><br>With a temperature of: <span>"+ response.current.temp + " degrees Fahrenheit</span><br>");

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
    
    getCoord().then(getData).catch((err) => {
       $('#datebox').append(err)});

    $('#input').focus();
});

$('#input').keyup((e) => {
    if(e.keyCode == 13){
        $('#inputbtn').click()
    };
});