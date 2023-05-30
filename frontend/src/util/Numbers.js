export function getSuffix(number) {
    const n = number % 100;
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

export function asTimeString(hours, minutes, seconds) {
    let timeString = hours + ':';
    if (minutes < 10) timeString += '0';
    timeString += minutes;
    if (seconds !== undefined) {
        timeString += ':';
        if (seconds < 10) timeString += '0';
        timeString += seconds;
    }
    return timeString;
}
