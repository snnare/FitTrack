import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';

export async function getBase64ImageFromAsset(imageModule: any): Promise<string> {
  try {
    const asset = Asset.fromModule(imageModule);
    await asset.downloadAsync();

    const manipulatedImage = await manipulateAsync(
      asset.localUri || asset.uri,
      [],
      { base64: true }
    );

    return manipulatedImage.base64!;
  } catch (error) {
    console.error('Error al convertir imagen a base64:', error);
    throw error;
  }
}
