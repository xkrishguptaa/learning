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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const yaml = __importStar(require("yaml"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const z = __importStar(require("zod"));
const schema_1 = require("./schema");
const lodash_1 = __importDefault(require("lodash"));
const entries = z.object(schema_1.schema).parse(Object.fromEntries(Object.entries(schema_1.schema).map(([name, schema]) => {
    return [
        name,
        schema.parse(yaml.parse(fs.readFileSync(path.join(__dirname, `../../../data/${name}.yaml`), 'utf8')).data).sort((a, b) => a.name < b.name ? -1 : 1),
    ];
})));
const technologies = lodash_1.default.uniq(entries.projects.flatMap(project => project.technologies)).sort((a, b) => a > b ? -1 : 1).map(technology => {
    return {
        name: technology,
        projects: entries.projects.filter(project => project.technologies.includes(technology))
    };
});
exports.data = Object.assign(Object.assign({}, entries), { technologies });