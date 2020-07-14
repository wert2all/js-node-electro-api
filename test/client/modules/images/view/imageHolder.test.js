import {test} from '@jest/globals';
import UIImagesViewHolder from '../../../../../assets/js/module/imagelist/UIImagesViewHolder';

test('UIImagesViewHolder:getParent', () => {
    expect(createModel().getParentElement())
        .toBe('parent');
});

test('UIImagesViewHolder:getGrip', () => {
    expect(createModel().getGrid())
        .toBe('grid');
});

test('UIImagesViewHolder:getLoader', () => {
    expect(createModel().getLoader())
        .toBe('loader');
});

test('UIImagesViewHolder:getNotify', () => {
    expect(createModel().getNotify())
        .toBe('notify');
});

test('UIImagesViewHolder:getImageItem', () => {
    expect(createModel().getImageItem())
        .toBe('imageItem');
});

test('UIImagesViewHolder:getPager', () => {
    expect(createModel().getPager())
        .toBe('pager');
});

/**
 *
 * @return {UIImagesViewHolder}
 */
function createModel() {
    // eslint-disable-next-line max-len
    return new UIImagesViewHolder('parent', 'grid', 'loader', 'notify', 'imageItem', 'pager');
}

