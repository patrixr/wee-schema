
type PojoType = "undefined" | "boolean" | "number" | "string" | "symbol" | "object" | "array"

type PojoSchema<T> = { [key in keyof T]: PojoType[] }

type ArrayType<T extends any[]> = T extends (infer I)[] ? I : never

function isUndefined(thing: any) : thing is undefined {
  return thing === void 0;
}

function isNumber(thing: any) : thing is number {
  return !isNaN(thing)
}

function isBoolean(thing: any) : thing is boolean {
  return thing === true || thing === false;
}

function isString(thing: any) : thing is string {
  return typeof thing === 'string'
}

function isArray(thing: any) : thing is any[] {
  return Array.isArray(thing);
}

function isObject(thing: any) : thing is object {
  return !isArray(thing) && typeof thing === 'object'
}

function isSymbol(thing: any) : thing is symbol {
  return typeof thing === 'symbol'
}

function has<T extends {}>(obj: T, prop: string) : boolean {
  return isObject(obj) && obj.hasOwnProperty(prop);
}

function contains<T extends any[]>(arr: T, pred: (it: ArrayType<T>) => boolean) : boolean {
  for (const it of arr) {
    if (pred(it)) return true;
  }
  return false;
}

/**
 * Returns true if obj matches the type
 *
 * @export
 * @param {unknown} obj
 * @param {PojoType} type
 * @returns {boolean}
 */
export function isType(thing: unknown, type: PojoType) : boolean {
  switch (type) {
    case "undefined":   return isUndefined(thing)
    case "number":      return isNumber(thing)
    case "boolean":     return isBoolean(thing)
    case "string":      return isString(thing)
    case "object":      return isObject(thing)
    case "array":       return isArray(thing)
    case "symbol":      return isSymbol(thing)
    default:            return false
  }
}

export type WeeSchema<T extends {}> = {
  ok: (obj: any) => obj is T,
  assert: (obj: any) => asserts obj is T,
  inspect: (obj: any) => string[]
}

/**
 * Returns a mini schema validator :)
 *
 * @export
 * @param {PojoSchema} sch
 * @returns
 */
export function weeschema<T extends {}>(sch: PojoSchema<T>) : WeeSchema<T> {

  const inspect = (obj: any) : string[] => {
    const props   = Object.keys(sch);
    const errors  = [];

    for (const key in obj) {
      if (!contains(props, p => p === key)) {
        errors.push(`Invalid key '${key}'`);
      }
    }

    for (const prop in sch) {
      const types = sch[prop];

      if (!has(obj, prop)) {
        errors.push(`Missing key '${prop}'`)
        continue
      }

      if (!contains(types, (t) => isType(obj[prop], t))) {
        errors.push(`Invalid type for key '${prop}'`);
      }
    }

    return errors;
  }

  const ok = (obj: any) : obj is T => {
    return inspect(obj).length === 0
  }

  const assert = (obj: any) : asserts obj is T => {
    const errors = inspect(obj)

    if (errors.length) {
      throw new Error(errors.join(', '));
    }
  }

  return { ok, inspect, assert };
}

export default weeschema;
