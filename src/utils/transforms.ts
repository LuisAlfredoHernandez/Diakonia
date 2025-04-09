// Omit<T, K>
/**
 * Este es un helper usado para remover keys de un objeto donde estos keys
 * deben ser opcionales para que al remover lo no hayan errores.
 * @param obj Objeto a extraer los keys
 * @returns fn
 */
export const without = <T extends Object>(obj: T) => <K extends keyof T>(...parts: Array<K>): T => {
    return (Object.keys(obj) as Array<keyof T>).reduce((acc, key) => {
      if (!parts.includes(key as any)) {
          acc[key] = obj[key];
      }
      return acc;
  }, {} as T);
};