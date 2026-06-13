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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILGlEQUFtQztBQUNuQyxrREFBb0M7QUFDcEMsb0RBQTRCO0FBQzVCLCtCQUFvQztBQUVwQzs7R0FFRztBQUNJLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxRQUFnQixFQUFtQixFQUFFO0lBQ3RFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN0QixPQUFPLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDO0FBSFcsUUFBQSxZQUFZLGdCQUd2QjtBQUVGOztHQUVHO0FBQ0ksTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUFFLFFBQWdCLEVBQUUsSUFBWSxFQUFvQixFQUFFO0lBQ3hGLE9BQU8sTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUM7QUFGVyxRQUFBLGVBQWUsbUJBRTFCO0FBRUY7O0dBRUc7QUFDSSxNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQVksRUFBRSxNQUFjLEVBQUUsWUFBb0IsS0FBSyxFQUFVLEVBQUU7SUFDL0YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUZXLFFBQUEsYUFBYSxpQkFFeEI7QUFFRjs7R0FFRztBQUNJLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBTyxFQUFFO0lBQ2hFLElBQUk7UUFDRixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDO0lBQUMsT0FBTyxLQUFVLEVBQUU7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