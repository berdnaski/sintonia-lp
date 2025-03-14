import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInYears, format, intervalToDuration } from 'date-fns';

export const formatDate = (date: string | Date, dateFormat = 'dd/MM/yyyy') => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return
  }

  return format(parsedDate, dateFormat);
}

export const dateDiff = (startDate: string | Date, endDate: string | Date, unit = 'days') => {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return
    }

    return intervalToDuration({
      start: startDate,
      end: endDate
    });

};
