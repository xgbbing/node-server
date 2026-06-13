"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConfiguration = void 0;
const core_1 = require("@midwayjs/core");
const koa = __importStar(require("@midwayjs/koa"));
const ws = __importStar(require("@midwayjs/ws"));
const view = __importStar(require("@midwayjs/view-nunjucks"));
const path_1 = __importDefault(require("path"));
const weather_filter_1 = require("./filter/weather.filter");
let MainConfiguration = class MainConfiguration {
    async onReady() {
        console.log('Application is ready!');
        // add filter
        this.app.useFilter([weather_filter_1.WeatherErrorFilter]);
        // this.app.useMiddleweare(...);
        // this.wsApp.useMiddleweare(...);
    }
    async didLoad() {
        console.log('Application is loaded!');
    }
    async onStop() {
        console.log('Application is stopping...');
    }
};
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "app", void 0);
__decorate([
    (0, core_1.App)('webSocket'),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "wsApp", void 0);
MainConfiguration = __decorate([
    (0, core_1.Configuration)({
        imports: [koa, view, ws],
        importConfigs: [path_1.default.join(__dirname, './config')],
    })
], MainConfiguration);
exports.MainConfiguration = MainConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxpY2UvRGVza3RvcC9vdGhlcmNvZGUvbm9kZS1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFnRTtBQUNoRSxtREFBcUM7QUFDckMsaURBQW1DO0FBQ25DLDhEQUFnRDtBQUNoRCxnREFBd0I7QUFDeEIsNERBQTZEO0FBTzdELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBTzVCLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JDLGFBQWE7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLG1DQUFrQixDQUFDLENBQUMsQ0FBQztRQUN6QyxnQ0FBZ0M7UUFDaEMsa0NBQWtDO0lBQ3BDLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGLENBQUE7QUFwQkM7SUFEQyxJQUFBLFVBQUcsR0FBRTs7OENBQ2dCO0FBR3RCO0lBREMsSUFBQSxVQUFHLEVBQUMsV0FBVyxDQUFDOztnREFDTTtBQUxaLGlCQUFpQjtJQUw3QixJQUFBLG9CQUFhLEVBQUM7UUFDYixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUN4QixhQUFhLEVBQUUsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNsRCxDQUFDO0dBRVcsaUJBQWlCLENBc0I3QjtBQXRCWSw4Q0FBaUIifQ==