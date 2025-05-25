
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const imageBase64Cache: Map<string, string> = new Map();

export const loadImageAsBase64 = async (
  imageSource: number | string,
  mimeType: string
): Promise<string | null> => {
  let uriToLoad: string;

  if (typeof imageSource === 'number') {
    const asset = Asset.fromModule(imageSource);
    await asset.downloadAsync();
    uriToLoad = asset.localUri || asset.uri;
  } else if (typeof imageSource === 'string') {
    uriToLoad = imageSource; 
  } else {
    console.warn('Tipo de imageSource no soportado:', imageSource);
    return null;
  }

  if (!uriToLoad) {
      console.error('URI de imagen no disponible para cargar.');
      return null;
  }

  if (imageBase64Cache.has(uriToLoad)) {
    return imageBase64Cache.get(uriToLoad)!;
  }

  try {
    const base64 = await FileSystem.readAsStringAsync(uriToLoad, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const dataUri = `data:${mimeType};base64,${base64}`;
    imageBase64Cache.set(uriToLoad, dataUri);
    return dataUri;

  } catch (error) {
    console.error(`ERROR: Falló la carga de imagen a Base64 desde URI (${uriToLoad}, ${mimeType}):`, error);
    return null;
  }
};