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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RouteInternalController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteInternalController = void 0;
const http_param_decorators_1 = require("../http-param-decorators");
const route_metadata_1 = require("../../core/route-metadata");
const controller_decorator_1 = require("./controller-decorator");
const method_decorators_1 = require("../method-decorators");
const node_smart_log_1 = require("node-smart-log");
let RouteInternalController = RouteInternalController_1 = class RouteInternalController {
    constructor() { }
    getUris(req) {
        return {
            routes: route_metadata_1.RouteMetadata.getRoutes().map((r) => {
                return {
                    httpMethod: r.getMethod(),
                    route: r.getRoute(),
                };
            }),
        };
    }
};
RouteInternalController.instance = new RouteInternalController_1();
__decorate([
    (0, method_decorators_1.Get)(),
    (0, node_smart_log_1.log)(),
    __param(0, (0, http_param_decorators_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], RouteInternalController.prototype, "getUris", null);
RouteInternalController = RouteInternalController_1 = __decorate([
    (0, controller_decorator_1.Controller)('/sd'),
    __metadata("design:paramtypes", [])
], RouteInternalController);
exports.RouteInternalController = RouteInternalController;
