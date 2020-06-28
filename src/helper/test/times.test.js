import { describe } from 'riteway';
import { timestampToHumans } from 'helper/times';
import dayjs from 'dayjs';

describe('timestampToHumans', async (assert) => {
  const inSameDay = dayjs().subtract(2, 'hour').unix();
  const inSameYear = dayjs().subtract(1, 'month').unix();
  const inPastYear = dayjs().subtract(1, 'year').unix();
  const inYesterday = dayjs().subtract(1, 'day').unix();

  assert({
    given: undefined,
    should: 'return error message Need timestamp',
    actual: timestampToHumans(),
    expected: 'Need timestamp',
  });

  assert({
    given: `${inSameDay}`,
    should: 'return 2 hours ago',
    actual: timestampToHumans(inSameDay),
    expected: '2 hours ago',
  });

  const expextedYesterday = dayjs().subtract(1, 'day').format('HH:mm');
  assert({
    given: `${inYesterday}`,
    should: `return Yesterday at ${expextedYesterday}`,
    actual: timestampToHumans(inYesterday),
    expected: `Yesterday at ${expextedYesterday}`,
  });

  const expectedSameYear = dayjs().subtract(1, 'month').format('DD MMM HH:mm');
  assert({
    given: `${inSameYear}`,
    should: `return ${expectedSameYear}`,
    actual: timestampToHumans(inSameYear),
    expected: expectedSameYear,
  });

  const expectedPastYear = dayjs().subtract(1, 'year').format('DD MMMM YYYY');
  assert({
    given: `${inPastYear}`,
    should: `return ${expectedPastYear}`,
    actual: timestampToHumans(inPastYear),
    expected: expectedPastYear,
  });
});
