// /utils/imageBase64.ts
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

// Usamos un mapa para cachear las imágenes cargadas, para no leerlas varias veces
const imageCache: Map<string, string> = new Map();

/**
 * Carga un asset (imagen) de Expo y lo convierte a una cadena Base64
 * con el prefijo Data URI (e.g., 'data:image/png;base64,...').
 *
 * @param imageModule El resultado de `require('./path/to/image.png')`.
 * @param mimeType El tipo MIME de la imagen (e.g., 'image/png', 'image/jpeg').
 * @returns Una promesa que resuelve con la cadena Base64 o null si hay un error.
 */
export const loadImageAsBase64 = async (imageModule: any, mimeType: string): Promise<string | null> => {
  // Genera una clave única para el caché basada en el módulo de la imagen
  const cacheKey = JSON.stringify(imageModule);

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!; // Retorna del caché si ya existe
  }

  try {
    const imageAsset = Asset.fromModule(imageModule);
    await imageAsset.downloadAsync(); // Asegura que el asset esté descargado localmente

    if (!imageAsset.localUri) {
      console.error("Error: localUri no disponible para el asset:", imageAsset.name);
      return null;
    }

    const base64 = await FileSystem.readAsStringAsync(imageAsset.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const dataUri = `data:${mimeType};base64,${base64}`;
    imageCache.set(cacheKey, dataUri); // Guarda en caché
    return dataUri;

  } catch (error) {
    console.error(`Failed to load image as Base64 (${mimeType}):`, error);
    return null;
  }
};