import {test} from '@jest/globals';
import ApiLimits from '../../../../assets/js/module/api/ApiLimits';

test('ApiLimits:setFrom', () => {
    const model = new ApiLimits(10, 13);
    const newModel = model.setFrom(15);
    expect(newModel.getFrom())
        .toBe(15);
    expect(newModel.getOffset())
        .toBe(13);
    expect(model.getFrom())
        .toBe(10);
    expect(newModel.getFrom() === model.getFrom())
        .toBeFalsy();
});

test('ApiLimits:setOffset', () => {
    const model = new ApiLimits(10, 13);
    const newModel = model.setOffset(15);
    expect(newModel.getOffset())
        .toBe(15);
    expect(newModel.getFrom())
        .toBe(10);
    expect(model.getOffset())
        .toBe(13);
    expect(newModel.getOffset() === model.getOffset())
        .toBeFalsy();
});
