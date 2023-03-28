const doc = document

export const uniq = (array) => [...new Set(array)]

export const toCamelCase = function (text) {
  return text.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2) {
    if (p2) return p2.toUpperCase()
    return p1.toLowerCase()
  })
}

export const querySelector = (element, selectors) =>
  typeof element === "object"
    ? element.querySelector(selectors)
    : doc.querySelector(element)
export const querySelectorAll = (element, selectors) =>
  typeof element === "object"
    ? [...element.querySelectorAll(selectors)]
    : [...doc.querySelectorAll(element)]
export const $ = querySelector
export const $$ = querySelectorAll

export const createElement = doc.createElement.bind(doc)

export const addEventListener = (element, type, listener) => {
  if (typeof type === "object") {
    for (const type1 in type) {
      if (Object.hasOwn(type, type1)) {
        element.addEventListener(type1, type[type1])
      }
    }
  } else if (typeof type === "string" && typeof listener === "function") {
    element.addEventListener(type, listener)
  }
  // TODO: return remover function
}

export const setAttribute = (element, attr, value) =>
  element.setAttribute(attr, value)

export const setStyle = (element, values) => {
  // setAttribute(element, "style", value)
  const style = element.style
  if (typeof values === "string") {
    values = toStyleKeyValues(values)
  }

  for (const key in values) {
    if (Object.hasOwn(values, key)) {
      style[key] = values[key]
    }
  }
}

// convert `font-size: 12px; color: red` to `{"fontSize": "12px"; "color": "red"}`
const toStyleKeyValues = (styleText) => {
  const result = {}
  const keyValues = styleText.split(/\s*;\s*/)
  for (const keyValue of keyValues) {
    const kv = keyValue.split(/\s*:\s*/)
    const key = toCamelCase(kv[0])
    if (key) {
      result[key] = kv[1]
    }
  }

  return result
}

export const toStyleMap = (styleText) => {
  styleText = noStyleSpace(styleText)
  const map = {}
  const keyValues = styleText.split("}")
  for (const keyValue of keyValues) {
    const kv = keyValue.split("{")
    if (kv[0] && kv[1]) {
      map[kv[0]] = toStyleKeyValues(kv[1])
    }
  }

  return map
}

export const noStyleSpace = (text) => text.replace(/\s*([^\w-])\s*/gm, "$1")

export const createSetStyle = (styleText) => {
  const styleMap = toStyleMap(styleText)
  return (element, key) => {
    if (typeof key === "object") {
      setStyle(element, key)
    } else if (typeof key === "string") {
      key = noStyleSpace(key)
      const value = styleMap[key]
      setStyle(element, value || key)
    }
  }
}

export const isUrl = (text) => /^https?:\/\//.test(text)

if (typeof Object.hasOwn !== "function") {
  Object.hasOwn = (instance, prop) =>
    Object.prototype.hasOwnProperty.call(instance, prop)
}