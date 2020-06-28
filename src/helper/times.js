import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
/**
 *
 * @param {number} timestamp
 * Accept timestamp
 * convert to Time ago if still in the same day
 * convert to DD MMM at HH:mm if still in the same year
 * convert to DD MMMM YYYY if not in the same year
 */
// eslint-disable-next-line import/prefer-default-export
export const timestampToHumans = (timestamp) => {
  if (!timestamp) {
    return 'Need timestamp';
  }
  const time = dayjs.unix(timestamp);
  const isSameDay = time.isToday();
  if (isSameDay) {
    return `${time.fromNow()}`;
  }

  const isTimeYesterday = time.isYesterday();
  if (isTimeYesterday) {
    return `Yesterday at ${time.format('HH:mm')}`;
  }

  const yearStart = dayjs().startOf('year');
  const yearEnd = dayjs().endOf('year');
  const isSameYear = time.isBetween(yearStart, yearEnd);
  if (isSameYear) {
    return `${time.format('DD MMM HH:mm')}`;
  }

  return `${time.format('DD MMMM YYYY')}`;
};
