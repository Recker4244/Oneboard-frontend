/* eslint-disable quote-props */
const mapMonth = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
};

export default function transformRollOfDate(timestampWithTimezone) {
  const [year, month, date] = ((timestampWithTimezone.split('T'))[0]).split('-');
  return `${date} ${mapMonth[month]} ${year}`;
}
