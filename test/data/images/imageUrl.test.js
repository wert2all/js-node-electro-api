import ImageUrl from '../../../src/data/images/ImageUrl';
import UserFilesEntity from '../../../src/data/entity/UserFilesEntity';
import di from '../../testInit';

test('ImageUrl:getUrl', () => {
    /**
     *
     * @type {ImageUrl}
     */
    const imageUrl = di.get(ImageUrl);
    _dataProvider()
        .map(data => {
            expect(imageUrl.getUrl(new UserFilesEntity().setFilePath(data.expect)))
                .toBe(data.toBe);
        });

    /**
     *
     * @return {{expect: string, toBe: string}[]}
     * @private
     */
    function _dataProvider() {
        return [
            {
                // eslint-disable-next-line max-len
                'expect': '/home/wert2all/work/js-node-electro-api/data/files//images/2020/06/image.jpg',
                // eslint-disable-next-line max-len
                'toBe': 'http://localhost:3000/images/2020/06/image.jpg'
            }
        ];
    }
});
