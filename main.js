var APPID = "a4b1f8065d832c0a33e4d0d02fea7284";

//All the variable used in current weather. 
var city;
var weatherCity;
var temp;
var tmax;
var tmin;
var humid;
var desc;


// Ajax Request For Fetching Data from Open Weather API of 5 Days.
$('#submit').click(function(event) { //Here we click on the button id submit to activate the fucntion event.
    event.preventDefault(); // we prevent all the default events. 
    city = $('#cityName').val(); // By using id cityName we get the city name
    // console.log(city); // for testing console logging the data. 
    // console.log(url);
    //finally ajax request using the jquery ajax request. 
    clearData(); //To Clear data that already exist.
    $.ajax({
        url: updateByCity(city), // using the updateByCity function we update the url.
        data: {
            format: 'json' // requesting for json data.
        }
    }).done(function(data) {
        updatingHTML(data);
    });

});

function clearData() {
    $('#date').empty();
    $('#city').empty();
    $('#temp').empty();
    $('#humid').empty();
    $('#desc').empty();
    $('#tmax').empty();
    $('#tmin').empty();
    $('.tbody').empty();
}

//for updating the URL for the user requested city Name.
function updateByCity(cityname) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&mode=json&appid=" + APPID;
    // console.log(url);
    return url;
}

//updating the html with data of open weather.
function updatingHTML(weather) {
    // console.log(weather);
    var weatherCity; //for displaying the name of the city.
    if (weatherCity = '') {
        weatherCity = weather.city.name + ', ' + weather.city.country;
    } else {
        $('#city').empty();
        weatherCity = weather.city.name + ', ' + weather.city.country;
    }
    $('#city').append(weatherCity);






    var trHTML = '';
    var dateTime = '';
    var temperature = 0;
    var temperature_max = 0;
    var temperature_min = 0;
    var humidityData = 0;
    var windSpeed = 0;
    var descp = '';

    for (var i = 0; i < 38; i++) {
        dateTime = timeConverter(weather.list[i].dt);
        temperature = kelvin2Celsius(weather.list[i].main.temp);
        temperature_max = kelvin2Celsius(weather.list[i].main.temp_max);
        temperature_min = kelvin2Celsius(weather.list[i].main.temp_min);
        humidityData = weather.list[i].main.humidity;
        windSpeed = weather.list[i].wind.speed;
        descp = weather.list[i].weather[0].description;
        trHTML += '<tr><td>' + dateTime + '</td><td>' + temperature + '</td><td>' + temperature_max + '</td><td>' + temperature_min + '</td><td>' + humidityData + '</td><td>' + windSpeed + '</td><td>' + descp + '</td></tr>';
        $('.dataTable tbody').append(trHTML);
    }

} //end of function updatingHTML()


// ajax call for current weather. [same as the forecast as above]
$('#submit').click(function(event) { //Here we click on the button id submit to activate the fucntion event.
    event.preventDefault(); // we prevent all the default events. 
    city = $('#cityName').val(); // By using id cityName we get the city name
    // console.log(city); // for testing console logging the data. 
    // console.log(url);
    //finally ajax request using the jquery ajax request. 
    $.ajax({
        url: updateURLForCurrent(city),
        data: {
            format: 'json' // requesting for json data.
        }
    }).done(function(data) {
        updatingCurrentData(data);
    });

});

//function for updating current weather url
function updateURLForCurrent(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&mode=json&appid=" + APPID;
    // console.log(url);
    return url;
}

//Updating the current weather data 
function updatingCurrentData(Cdata) {
    date = timeConverter(Cdata.dt);
    $("#date").append(date);
    temp = Cdata.main.temp;
    $('#temp').append(kelvin2Celsius(temp) + " &#8451;");
    humid = Cdata.main.humidity;
    $('#humid').append(humid);
    tmax = Cdata.main.temp_max;
    $('#tmax').append(kelvin2Celsius(tmax) + " &#8451;");
    tmin = Cdata.main.temp_min;
    $('#tmin').append(kelvin2Celsius(tmin) + "  &#8451;");
    desc = Cdata.weather[0].description;
    $('#desc').append(desc);
}

//converting UNIX_timestamp to normal form.
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function kelvin2Celsius(k) {
    return Math.round(k - 273.15).toFixed(2);
}
// function updateByGeo(lat, lon) {
//     var url = "http://api.openweathermap.org/data/2.5/forecast?" +
//         "lat=" + lat +
//         "&lon=" + lon +
//         "&APPID=" + APPID;
//     return url;
// }


// function updateByZip(zip) {
//     var url = "http://api.openweathermap.org/data/2.5/forecast?" +
//         "zip=" + zip +
//         "&APPID=" + APPID;
//     return url;
// }