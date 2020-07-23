import {test} from '@jest/globals';
import MergeReader from '../../../src/lib/json/MergeReader';

test('MergeReader:read:ok:default', () => {
    const defaultMock = () => ({
        read: () => ({default: 'defaultValue'})
    });
    const extentMock = () => ({
        read: () => ({})
    });
    const model = new MergeReader(
        defaultMock(),
        extentMock()
    );

    expect(model.read())
        .toStrictEqual({default: 'defaultValue'});
});

test('MergeReader:read:ok:extended', () => {
    const defaultMock = () => ({
        read: () => ({default: 'defaultValue'})
    });
    const extentMock = () => ({
        read: () => ({default: 'extendedValue'})
    });
    const model = new MergeReader(
        defaultMock(),
        extentMock()
    );

    expect(model.read())
        .toStrictEqual({default: 'extendedValue'});
});

test('MergeReader:read:ok:extends_data', () => {
    const defaultMock = () => ({
        read: () => ({default: 'defaultValue'})
    });
    const extentMock = () => ({
        read: () => ({extended: 'extendedValue'})
    });
    const model = new MergeReader(
        defaultMock(),
        extentMock()
    );

    expect(model.read())
        .toStrictEqual({
            'default': 'defaultValue',
            'extended': 'extendedValue'
        });
});

test('MergeReader:read:ok:null_default', () => {
    const defaultMock = () => ({
        read: () => null
    });
    const extentMock = () => ({
        read: () => ({extended: 'extendedValue'})
    });
    const model = new MergeReader(
        defaultMock(),
        extentMock()
    );

    expect(model.read())
        .toStrictEqual({
            'extended': 'extendedValue'
        });
});
