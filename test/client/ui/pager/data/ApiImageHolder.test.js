import {test} from '@jest/globals';
import ApiImagesHolder from '../../../../../assets/js/module/imagelist/data/ApiImagesHolder';

/**
 *
 * @return {ApiImagesHolder}
 * @private
 */
function _getModel() {
    return new ApiImagesHolder('images', 'limit');
}

test('ApiImagesHolder:getImages', () => {
    expect(_getModel().getImages())
        .toBe('images');
});

test('ApiImagesHolder:getLimit', () => {
    expect(_getModel().getLimit())
        .toBe('limit');
});


test('ApiImagesHolder:getLimit:null', () => {
    expect(new ApiImagesHolder('images').getLimit())
        .toBe(null);
});
