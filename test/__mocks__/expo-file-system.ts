// Manual mock of `expo-file-system` for jest (optional native peer).

export const cacheDirectory = 'file:///cache/';

export enum EncodingType {
  UTF8 = 'utf8',
  Base64 = 'base64',
}

export const writeAsStringAsync = jest.fn(async () => {});
