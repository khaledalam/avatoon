// Jest stub for three's ESM SkeletonUtils (ts-jest can't transform the addon).
// The real bundler build uses the actual SkeletonUtils.clone.
export const clone = <T>(object: T): T => object;
