"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const smart_log_1 = require("smart-log");
class ControllerDecorator {
}
ControllerDecorator.Controller = (name) => (constructor) => {
    smart_log_1.Logger.debug('Constructor ' + constructor);
};
exports.Controller = ControllerDecorator.Controller;
