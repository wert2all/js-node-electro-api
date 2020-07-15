import {test} from '@jest/globals';
import UIPagerDataProvider from '../../../../../assets/js/ui/pager/data/UIPagerDataProvider';

/**
 *
 * @return {UIPagerDataProvider}
 * @private
 */
function _createDefaultModel() {
    return new UIPagerDataProvider(11, 0, 10);
}

test('UIPagerDataProvider:setCount', () => {
    const provider = _createDefaultModel();
    const newProvider = provider.setCount(3);
    expect(newProvider.getCountValue())
        .toBe(3);
    expect(newProvider.getCountValue() === provider.getCountValue())
        .toBeFalsy();
});

test('UIPagerDataProvider:setFrom', () => {
    const provider = _createDefaultModel();
    const newProvider = provider.setFrom(1);
    expect(newProvider.getFromValue())
        .toBe(1);
    expect(newProvider.getFromValue() === provider.getFromValue())
        .toBeFalsy();
});

test('UIPagerDataProvider:setOffset', () => {
    const provider = _createDefaultModel();
    const newProvider = provider.setOffset(11);
    expect(newProvider.getOffsetValue())
        .toBe(11);
    expect(newProvider.getOffsetValue() === provider.getOffsetValue())
        .toBeFalsy();
});

test('UIPagerDataProvider:getPagesCount', () => {
    const model = _createDefaultModel();
    expect(model.getPagesCount())
        .toBe(2);
    expect(model.setCount(9).getPagesCount())
        .toBe(1);
});

test('UIPagerDataProvider:getFromByPage', () => {
    expect(_createDefaultModel().getFromByPage(2))
        .toBe(10);

    expect(_createDefaultModel().getFromByPage(1))
        .toBe(0);
});
