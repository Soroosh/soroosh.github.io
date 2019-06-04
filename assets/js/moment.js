(function(){
    function getMomentNow(){
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const moment = hour*10 + minute/6 + second/360;
        document.getElementById("moment").textContent = "The time right now is " + moment.toFixed(3) + " moments.";
    }

    getMomentNow();
    setInterval(getMomentNow, 1000);
})();

(function(){
    function getUnixTimeNow(){
        const now = new Date();
        const unixTime = Math.round(now.getTime() / 1000);
        document.getElementById("unixTime").textContent = "The date and time right now is " + unixTime;
    }

    getUnixTimeNow();
    setInterval(getUnixTimeNow, 1000);
})();

(function(){
    const now = new Date();
    document.getElementById("hourNow").textContent = now.getHours();
    document.getElementById("minuteNow").textContent = now.getMinutes();
    document.getElementById("secondNow").textContent =  now.getSeconds();
})();