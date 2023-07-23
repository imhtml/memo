export default function memo<T extends () => any>(
  callback: T,
  dependencies: any[],
) {
  let previousDependencies: any[] | null = null;
  let cache: ReturnType<T> | null = null;
  return function () {
    const dependenciesChanged = previousDependencies === null ||
      dependencies.some((dependency, index) => {
        return dependency !== previousDependencies![index];
      });
      if (dependenciesChanged) {
        cache = callback();
      }
      previousDependencies = dependencies;
      return cache;
  };
}
