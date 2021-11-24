
import Vue from 'vue';
import { agComponentsKeys } from "./props";

// 驼峰转短横线 
export function kebabcase(v) {
  return v.replace(/([A-Z])/g, "-$1").toLowerCase()
};

// 短横线转驼峰 
export function humpcase(v) {
  return v.replace(/-(\w)/g, (a, b) => b.toUpperCase())
}

// 获取 prop 值 ，以支持短横线，驼峰，两种写法
export function getProp(obj, key) {
  let key1 = kebabcase(key);
  if (obj.hasOwnProperty(key1)) return obj[key1]
  let key2 = humpcase(key);
  if (obj.hasOwnProperty(key2)) return obj[key2];
}

// 数组是否存在 key
export function includesKey(keys, key) {
  return keys.includes(kebabcase(key)) || keys.includes(humpcase(key));
}

// 从目标对象获取指定属性
export function getIncludeAttrs(keys, target) {
  let obj = {};
  keys.forEach((key) => {
    let value = getProp(target, key);
    if (value !== undefined) obj[key] = value;
  });
  return obj;
}

// 从目标对象排除指定属性
export function getExcludeAttrs(keys, target) {
  let obj = {};
  for (const key in target) {
    if (!includesKey(keys, key)) obj[key] = target[key];
  }
  return obj;
}

// 生成一个 id 
export function guid() {
  return "xxxxxxxx".replace(/[x]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 继承属性 关联响应式
export const extend = function (obj, target = {}, cover = false) {
  for (const key in target) {
    let a = getProp(obj, key) !== undefined && !cover;
    let b = getProp(target, key) === undefined;
    if (a || b) continue;
    Vue.set(obj, key, target[key]);
  }
}

// 是否是包装组件
export const equalAgName = function (name, agName) {
  if (agComponentsKeys.includes(agName)) {
    return name === agName || 'ag' + name === agName
  }
  return false;
}

// 循环 arr obj
export const each = function (obj, call, each = "forEach") {
  if (Array.isArray(obj)) {
    return obj[each]((item, index) => call(item, index));
  } else {
    return Object.keys(obj)[each]((key, index) => call(obj[key], index, key));
  }
}