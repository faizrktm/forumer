import { describe } from 'riteway';
import { selectColor } from 'helper/theme';

describe('selectColor', async (assert) => {
  assert({
    given: 'brand',
    should: 'return #1278CE',
    actual: selectColor('brand'),
    expected: '#1278CE',
  });

  assert({
    given: 'no arguments',
    should: 'return undefined',
    actual: selectColor(),
    expected: undefined,
  });

  assert({
    given: 'not exist color',
    should: 'return undefined',
    actual: selectColor('not exist color'),
    expected: undefined,
  });
});
