(function(){
    const names = {
        0: "twelve",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        15: "quarter",
        20: "twenty",
        25: "twenty five",
        30: "half",
        35: "twenty five",
        40: "twenty",
        45: "quarter",
        50: "ten",
        55: "five"
    };

    function getFuzzyTime(minute, hour) {
        const roundedMinutes = Math.round(minute/5)*5;
        const fuzzyHour = roundedMinutes>30 ? (hour+1)%12 : (hour)%12;
        switch(roundedMinutes) {
            case 5:
            case 10:
            case 15:
            case 20:
            case 25:
            case 30:
                return names[roundedMinutes] + " past " + names[fuzzyHour];
            case 35:
            case 40:
            case 45:
            case 50:
            case 55:
                return names[roundedMinutes] + " before " + names[fuzzyHour];
            default:
                return names[fuzzyHour] + " o'clock";   
        }
    }

    function getFuzzyTimeForNow(){
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        document.getElementById("fuzzy").textContent = "It's " + getFuzzyTime(minute, hour);
    }

    getFuzzyTimeForNow();
     setInterval(getFuzzyTimeForNow, 1000);
})();