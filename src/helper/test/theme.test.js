import { describe } from 'riteway';
import { selectColor } from 'helper/theme';

describe('selectColor', async (assert) => {
  assert({
    given: 'placeholder',
    should: 'return #98A4AE',
    actual: selectColor('placeholder'),
    expected: '#98A4AE',
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
