import ImageUrl from '../../../src/data/images/ImageUrl';
import UserFilesEntity from '../../../src/data/entity/UserFilesEntity';
import {test} from '@jest/globals';

test('ImageUrl:getUrl', () => {
    _dataProvider()
        .map(data => {
            expect(data
                .model
                .getUrl(new UserFilesEntity().setFilePath(data.expect)))
                .toBe(data.toBe);
        });

    /**
     *
     * @return {{expect: string, toBe: string, model:ImageUrl}[]}
     * @private
     */
    function _dataProvider() {
        return [
            {
                // eslint-disable-next-line max-len
                'expect': '/home/wert2all/work/js-node-electro-api/data/files//images/2020/06/image.jpg',
                // eslint-disable-next-line max-len
                'toBe': 'http://localhost:3000/images/2020/06/image.jpg',
                'model': new ImageUrl(
                    {
                        fetch: () => 'http://localhost:3000/images/'
                    },
                    {
                        getStoragePath: () =>
                            '/home/wert2all/work/js-node-electro-api/data/files/'
                    })
            }
        ];
    }
});
