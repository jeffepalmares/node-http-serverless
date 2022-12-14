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
const decorators_1 = require("../decorators");
const route_metadata_1 = require("./route-metadata");
let RouteInternalController = RouteInternalController_1 = class RouteInternalController {
    getUris(req) {
        const host = req.headers && req.headers['host'] ? req.headers['host'] : undefined;
        return {
            host,
            routes: route_metadata_1.RouteMetadata.getRoutes().map((r) => {
                httpMethod: `${r.getMethod()}`;
                route: `${host}${r.getRoute()}`;
            }),
        };
    }
};
RouteInternalController.instance = new RouteInternalController_1();
__decorate([
    (0, decorators_1.Get)(),
    __param(0, (0, decorators_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], RouteInternalController.prototype, "getUris", null);
RouteInternalController = RouteInternalController_1 = __decorate([
    (0, decorators_1.Controller)('/sd')
], RouteInternalController);
exports.RouteInternalController = RouteInternalController;
