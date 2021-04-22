// 驼峰转短横线 
export const kebabcase = (v) => v.replace(/([A-Z])/g, "-$1").toLowerCase();

// 短横线转驼峰 
export const humpcase = (v) => v.replace(/-(\w)/g, (a, b) => b.toUpperCase());

// 获取 prop 值 支持两种写法
export function getProp(obj, key) {
  let kebabKey = kebabcase(key);
  if (obj[kebabKey]) return obj[kebabKey];
  let humpkey = humpcase(key);
  if (obj[humpkey]) return obj[humpkey];
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
