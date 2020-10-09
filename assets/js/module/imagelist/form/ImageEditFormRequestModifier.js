import ProfileFormRequestModifier from "../../profile/form/ProfileFormRequestModifier";

/**
 * @class ImageEditFormRequestModifier
 * @extends DomFormRequestModifierInterface
 * @type DomFormRequestModifierInterface
 */
export default class ImageEditFormRequestModifier extends ProfileFormRequestModifier {
    /**
     *
     * @param {Object<string,Object<string,string>|string>} map
     */
    constructor(map) {
        super(map);
    }
}
