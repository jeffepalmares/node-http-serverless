"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const core_1 = require("../../core");
class ControllerDecorator {
}
ControllerDecorator.Controller = (path) => (constructor) => {
    core_1.RouteMetadata.registerController(constructor, path);
};
exports.Controller = ControllerDecorator.Controller;
