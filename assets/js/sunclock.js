var msInDay = 24*3600000,
	sunset1,
	sunset2,
	sunRise1,
	sunRise2,
	dayInterval;

function intPrefix(number){
	if( isNaN(number) ){
		return "-";
	}
	if(number<10){
		return "0"+number;
	}else{
		return number;
	}
}

function formatHour(date){
	var hour = intPrefix(date.getHours()),
		minute = intPrefix(date.getMinutes()),
		seconds = intPrefix(date.getSeconds());
	if( isNaN(hour) || isNaN(minute) || isNaN(seconds) ){
		return "-";
	}
	return hour+":"+minute+":"+seconds;
}

function formatDate(date){
	var day = intPrefix(date.getDate()),
		month = intPrefix(date.getMonth()+1),
		year = date.getFullYear(),
		hour = intPrefix(date.getHours()),
		minute = intPrefix(date.getMinutes()),
		seconds = intPrefix(date.getSeconds()),
		weekDay = date.getDay();
	if( isNaN(hour) || isNaN(minute) || isNaN(seconds) ){
		return "-";
	}
	return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds;
}

function formatDay(date){
	var day = intPrefix(date.getDate()),
		month = intPrefix(date.getMonth()+1),
		year = date.getFullYear(),
		weekDay = date.getDay();

	return year+"-"+month+"-"+day;
}

function onceASecond(){
	var now = new Date(),
		sunsetClock = now-sunset1,
		sunRiseClock = now-sunRise1;

	var	sunsetHour = (sunsetClock-(sunsetClock%3600000))/3600000,
		sunsetTmp = (sunsetClock-sunsetHour*3600000),
		sunsetMinute = (sunsetTmp-sunsetTmp%60000)/60000,
		sunsetSecTmp = sunsetClock-sunsetMinute*60000-sunsetHour*3600000,
		sunsetSecond = (sunsetSecTmp-(sunsetSecTmp%1000))/1000,
			sunRiseHour = (sunRiseClock-(sunRiseClock%3600000))/3600000,
		sunRiseTmp = (sunRiseClock-sunRiseHour*3600000),
		sunRiseMinute = (sunRiseTmp-sunRiseTmp%60000)/60000,
		sunRiseSecTmp = sunRiseClock-sunRiseMinute*60000-sunRiseHour*3600000,
		sunRiseSecond = (sunRiseSecTmp-(sunRiseSecTmp%1000))/1000,
		dayInterval;


	document.getElementById("time").textContent = formatDate(now);
	document.getElementById("sunsetClock").textContent = intPrefix(sunsetHour)+":"+intPrefix(sunsetMinute)+":"+intPrefix(sunsetSecond);
	document.getElementById("sunriseClock").textContent = intPrefix(sunRiseHour)+":"+intPrefix(sunRiseMinute)+":"+intPrefix(sunRiseSecond);
}

function getLast(dateYesterday, dateToday, now){
	if(dateToday.getTime()>now.getTime()){
		return dateYesterday;
	}
	return dateToday;
}

function getNext(dateToday, dateTomorrow, now){
	if(dateToday.getTime()>now.getTime()){
		return dateToday;
	}
	return dateTomorrow;
}

function onceAMinute(){
		var now = new Date(),
			yesterday = new Date(now - msInDay),
			tomorrow = new Date (now.getTime() + msInDay),
			lat = document.getElementById("lat").value,
			lng = document.getElementById("lng").value,
			timesToday = SunCalc.getTimes(now, lat, lng),
			timesYesterday = SunCalc.getTimes(yesterday, lat, lng),
			timesTomorrow = SunCalc.getTimes(tomorrow, lat, lng),
			secondInterval,
			sunsetToday = timesToday["sunset"],
			sunsetYesterday = timesYesterday["sunset"],
			sunsetTomorrow = timesTomorrow["sunset"],
			sunRiseToday = timesToday["sunrise"],
			sunRiseYesterday = timesYesterday["sunrise"],
			sunRiseTomorrow = timesTomorrow["sunrise"];

	sunset1 = getLast(sunsetYesterday,sunsetToday,now);
	sunset2 = getNext(sunsetToday,sunsetTomorrow,now);
	sunRise1 = getLast(sunRiseYesterday,sunRiseToday,now);
	sunRise2 = getNext(sunRiseToday,sunRiseTomorrow,now);
	var lastTime="night",
		nextTime="nadir",
		minTime=msInDay,
		maxTime=-msInDay;
	for (var i in timesToday) {
	var tmp = now-timesToday[i];
	document.querySelector("."+i).classList.remove("bold");
	if(tmp>maxTime&&tmp<0){
		maxTime = tmp;
		lastTime = i;
	}
	if(tmp<minTime&&tmp>0){
		minTime = tmp;
		nextTime = i;
	}
	}
	document.querySelector("."+nextTime).classList.add("bold");
	document.querySelector("."+lastTime).classList.add("bold");

	if(secondInterval!=null){
		clearInterval(secondInterval);
	}
	secondInterval = setInterval(onceASecond,1000);

	document.getElementById("sunset1").textContent = formatDate(sunset1);
	document.getElementById("sunset2").textContent = formatDate(sunset2);
	document.getElementById("sunrise1").textContent = formatDate(sunRise1);
	document.getElementById("sunrise2").textContent = formatDate(sunRise2);

	document.getElementById("today").textContent =formatDay(now);
	document.getElementById("solarNoon").textContent = formatHour(timesToday["solarNoon"]);
	document.getElementById("nadir").textContent = formatHour(timesToday["nadir"]);
	document.getElementById("sunriseEnd").textContent = formatHour(timesToday["sunriseEnd"]);
	document.getElementById("sunsetStart").textContent = formatHour(timesToday["sunsetStart"]);
	document.getElementById("sunrise").textContent = formatHour(timesToday["sunrise"]);
	document.getElementById("sunset").textContent = formatHour(timesToday["sunset"]);
	document.getElementById("dawn").textContent = formatHour(timesToday["dawn"]);
	document.getElementById("dusk").textContent = formatHour(timesToday["dusk"]);
	document.getElementById("nauticalDawn").textContent = formatHour(timesToday["nauticalDawn"]);
	document.getElementById("nauticalDusk").textContent = formatHour(timesToday["nauticalDusk"]);
	document.getElementById("nightEnd").textContent = formatHour(timesToday["nightEnd"]);
	document.getElementById("night").textContent = formatHour(timesToday["night"]);
	document.getElementById("goldenHourEnd").textContent = formatHour(timesToday["goldenHourEnd"]);
	document.getElementById("goldenHour").textContent = formatHour(timesToday["goldenHour"]);
}
function resetMinuteFunction(){
	clearInterval(dayInterval);
	dayInterval = setInterval(onceAMinute,60000);
	onceAMinute();
}

function setPosition(position) {
	document.getElementById("lat").value(position.coords.latitude);
	document.getElementById("lng").value(position.coords.longitude);
	resetMinuteFunction();
}

(function() {
	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(setPosition);
}
	// document.querySelector("body").tooltip({ selector: '[data-toggle=tooltip]' });
	document.getElementById("lat").addEventListener( "change", resetMinuteFunction );
	document.getElementById("lng").addEventListener( "change", resetMinuteFunction );
	dayInterval = setInterval(onceAMinute,60000);
	onceAMinute();
})();
