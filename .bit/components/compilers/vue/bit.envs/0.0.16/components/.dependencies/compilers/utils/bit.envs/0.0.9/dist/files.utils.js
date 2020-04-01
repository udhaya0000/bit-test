"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const vinyl_1 = __importDefault(require("vinyl"));
const path_1 = __importDefault(require("path"));
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
function mapExtensions(extensions) {
    return extensions.map((e) => `.${e}`);
}
function getSourceFiles(sources, extensions = []) {
    return sources.filter((s) => (extensions.length > 0 ? mapExtensions(extensions).includes(s.extname) : true) && !s.test);
}
exports.getSourceFiles = getSourceFiles;
function getTestFiles(sources, extensions = []) {
    return sources.filter((s) => (extensions.length > 0 ? mapExtensions(extensions).includes(s.extname) : true) && !!s.test);
}
exports.getTestFiles = getTestFiles;
function readFiles(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirFiles = yield recursive_readdir_1.default(dir);
        let files = dirFiles.map((f) => __awaiter(this, void 0, void 0, function* () {
            return new vinyl_1.default({
                path: path_1.default.relative(dir, f),
                contents: yield fs_extra_1.default.readFile(f),
            });
        }));
        return Promise.all(files);
    });
}
exports.readFiles = readFiles;
