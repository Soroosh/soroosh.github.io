(function(){
    function getMomentNow(){
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const moment = hour*10+minute/6+second/360;
        document.getElementById("moment").textContent = "The time right now is " + moment.toFixed(3) + " moments.";
    }

    getMomentNow();
    setInterval(getMomentNow, 1000);
})();