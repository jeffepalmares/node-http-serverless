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
exports.TestControllerAnother = void 0;
const node_smart_log_1 = require("node-smart-log");
const _1 = require(".");
const http_method_decorator_1 = require("./decorators/http-method-decorator");
let TestControllerAnother = class TestControllerAnother {
    doSome() {
        node_smart_log_1.Logger.debug('Done');
    }
    doSomeById() {
        node_smart_log_1.Logger.debug('Done');
    }
    doSomeProds() {
        node_smart_log_1.Logger.debug('Done');
    }
    doSomeProdss() {
        node_smart_log_1.Logger.debug('Done');
    }
};
__decorate([
    (0, http_method_decorator_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestControllerAnother.prototype, "doSome", null);
__decorate([
    (0, http_method_decorator_1.Get)('/{id}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestControllerAnother.prototype, "doSomeById", null);
__decorate([
    (0, http_method_decorator_1.Get)('/{id}/products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestControllerAnother.prototype, "doSomeProds", null);
__decorate([
    (0, http_method_decorator_1.Put)('/{id}/products/{idProd}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestControllerAnother.prototype, "doSomeProdss", null);
TestControllerAnother = __decorate([
    (0, _1.Controller)('/products')
], TestControllerAnother);
exports.TestControllerAnother = TestControllerAnother;
