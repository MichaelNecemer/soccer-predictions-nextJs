function parseDate(dateString: string) {
  const dateObject: Date = new Date(dateString);

  const year: number = dateObject.getFullYear();
  const month: number = dateObject.getMonth() + 1;
  const day: number = dateObject.getDate();
  const hours: number = dateObject.getHours();
  const minutes: number = dateObject.getMinutes();

  const optionsForDay: Intl.DateTimeFormatOptions = { weekday: "short" };
  const dayOfWeek: string = dateObject.toLocaleDateString("en-US", optionsForDay);

  const optionsForMonth: Intl.DateTimeFormatOptions = {month: "long"};
  const monthOfYear: string = dateObject.toLocaleDateString("en-US", optionsForMonth)

  return {
    year,
    month,
    monthOfYear,
    day,
    dayOfWeek,
    hours,
    minutes,
  };
}


export function getParsedDate(dateString: string){
  const {dayOfWeek, day, monthOfYear, hours, minutes} = parseDate(dateString);

  let min = minutes==0 ? '00' : minutes

  return `${dayOfWeek}, ${day} ${monthOfYear}, ${hours}:${min}`
}
