import ApiImagesLimitData from "../../../../../assets/js/module/imagelist/data/ApiImagesLimitData";
import { test } from "@jest/globals";

function _getModel() {
    return new ApiImagesLimitData(10, 12, 15);
}

test("ApiImagesLimitData:getCount", () => {
    expect(_getModel().getCount()).toBe(10);
});

test("ApiImagesLimitData:getFrom", () => {
    expect(_getModel().getFrom()).toBe(12);
});

test("ApiImagesLimitData:getOffset", () => {
    expect(_getModel().getOffset()).toBe(15);
});
