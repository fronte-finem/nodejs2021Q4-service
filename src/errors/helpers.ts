export function throwExpression(error: Error): never {
  throw error;
}

export function UseErrorMapper(mapError: (error: unknown) => unknown): MethodDecorator {
  return (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor | void => {
    const originalMethod = descriptor.value;
    descriptor.value = function wrapper(error: unknown, ...args: unknown[]) {
      const exception = mapError(error);
      return originalMethod.call(this, exception, ...args);
    };
  };
}
