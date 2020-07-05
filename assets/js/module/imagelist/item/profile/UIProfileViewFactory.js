import UIProfileView from '../../../profile/view/UIProfileView';
import UIProfileSelectorsHolder from '../../../profile/view/UIProfileSelectorsHolder';

/**
 * @class UIProfileViewFactory
 */
export default class UIProfileViewFactory {
    /**
     *
     * @param {ParentNode} parentNode
     * @param {UIImageItemConfigProfile} config
     * @return {UIProfileView}
     */
    create(parentNode, config) {
        return new UIProfileView(
            parentNode,
            new UIProfileSelectorsHolder(
                config.getNameSelector(),
                config.getAvatarSelector()
            )
        );
    }
}
