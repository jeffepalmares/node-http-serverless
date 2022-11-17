"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocController = void 0;
const node_smart_log_1 = require("node-smart-log");
const core_1 = require("../core");
const decorators_1 = require("../decorators");
let DocController = class DocController {
    getPaths() {
        const routes = core_1.RouteMetadata.getRoutes().map((r) => `${r.getMethod()} - ${r.getRoute()}`);
        const result = {
            routes,
        };
        return result;
    }
};
__decorate([
    (0, decorators_1.Get)(),
    (0, node_smart_log_1.log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], DocController.prototype, "getPaths", null);
DocController = __decorate([
    (0, decorators_1.Controller)('/docs')
], DocController);
exports.DocController = DocController;
