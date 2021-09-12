"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers = __importStar(require("../../../routes/api/helpers"));
describe('helper functions for image api', function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectedThumbnailPath;
    return __generator(this, function (_a) {
        beforeEach(function () {
            spyOn(console, 'log');
        });
        expectedThumbnailPath = '/home/workspace/images/thumb/fjord-200-200.jpg';
        it('returns the name for the thumbnail image', function () {
            expect(helpers.getThumbnailName('fjord', 200, 200)).toBe('fjord-200-200');
        });
        it('returns the resolved expected path to the thumbnail image', function () {
            expect(helpers.getThumbnailPath('fjord', 200, 200)).toBe(expectedThumbnailPath);
        });
        it('returns the resolved expected path to the full image', function () {
            expect(helpers.getFullPath('fjord')).toBe('/home/workspace/images/full/fjord.jpg');
        });
        it('throws an error if if the cached file does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var getThumbnailPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getThumbnailPath = spyOn(helpers, 'getThumbnailPath').and.returnValue(expectedThumbnailPath);
                        return [4, expectAsync(helpers.existingCachedFile('fjorda', 799, 2001)).toBeRejected()];
                    case 1:
                        _a.sent();
                        getThumbnailPath.calls.reset();
                        return [2];
                }
            });
        }); });
        it('returns the available images in the full directory', function () {
            expect(helpers.getAvailableImages()).toEqual([
                'encenadaport',
                'fjord',
                'icelandwaterfall',
                'palmtunnel',
                'santamonica'
            ]);
        });
        return [2];
    });
}); });
