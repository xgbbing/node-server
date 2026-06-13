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
exports.throttle = exports.debounce = exports.uniqueArray = exports.pick = exports.deepClone = exports.paginate = exports.generateId = exports.formatDate = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
/**
 * 公共工具函数
 */
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
/**
 * 密码加密工具函数
 */
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
/**
 * 密码验证工具函数
 */
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
exports.comparePassword = comparePassword;
/**
 * JWT token 生成工具函数
 */
const generateToken = (payload, secret, expiresIn = '24h') => {
    return jwt.sign(payload, secret, { expiresIn });
};
exports.generateToken = generateToken;
/**
 * JWT token 验证工具函数
 */
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
/**
 * 日期格式化工具函数
 */
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    return (0, moment_1.default)(date).format(format);
};
exports.formatDate = formatDate;
/**
 * 生成唯一ID工具函数
 */
const generateId = () => {
    return (0, uuid_1.v4)();
};
exports.generateId = generateId;
/**
 * 分页数据处理工具函数
 */
const paginate = (data, page, size) => {
    const offset = (page - 1) * size;
    return {
        total: data.length,
        page,
        size,
        totalPages: Math.ceil(data.length / size),
        data: data.slice(offset, offset + size),
    };
};
exports.paginate = paginate;
/**
 * 深度克隆对象工具函数
 */
const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
exports.deepClone = deepClone;
/**
 * 对象属性过滤工具函数
 */
const pick = (obj, keys) => {
    const result = {};
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
};
exports.pick = pick;
/**
 * 数组去重工具函数
 */
const uniqueArray = (arr) => {
    return Array.from(new Set(arr));
};
exports.uniqueArray = uniqueArray;
/**
 * 防抖工具函数
 */
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};
exports.debounce = debounce;
/**
 * 节流工具函数
 */
const throttle = (func, delay) => {
    let lastExecTime = 0;
    return (...args) => {
        const currentTime = Date.now();
        if (currentTime - lastExecTime >= delay) {
            func(...args);
            lastExecTime = currentTime;
        }
    };
};
exports.throttle = throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsaWNlL0Rlc2t0b3Avb3RoZXJjb2RlL25vZGUtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbInV0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCxpREFBbUM7QUFDbkMsa0RBQW9DO0FBQ3BDLG9EQUE0QjtBQUM1QiwrQkFBb0M7QUFFcEM7O0dBRUc7QUFDSSxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsUUFBZ0IsRUFBbUIsRUFBRTtJQUN0RSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdEIsT0FBTyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQztBQUhXLFFBQUEsWUFBWSxnQkFHdkI7QUFFRjs7R0FFRztBQUNJLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxRQUFnQixFQUFFLElBQVksRUFBb0IsRUFBRTtJQUN4RixPQUFPLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxlQUFlLG1CQUUxQjtBQUVGOztHQUVHO0FBQ0ksTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUFZLEVBQUUsTUFBYyxFQUFFLFlBQW9CLEtBQUssRUFBVSxFQUFFO0lBQy9GLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUM7QUFGVyxRQUFBLGFBQWEsaUJBRXhCO0FBRUY7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQU8sRUFBRTtJQUNoRSxJQUFJO1FBQ0YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFN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