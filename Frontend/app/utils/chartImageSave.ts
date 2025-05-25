import * as FileSystem from 'expo-file-system';
import { generateQuickChartUrl } from './chartUtils'; 

export const saveChartImageLocally = async (
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    fill?: boolean;
    tension?: number;
  }[],
  title: string,
  filenamePrefix: string
): Promise<string | null> => {
  try {
    const quickChartUrl = generateQuickChartUrl(labels, datasets, title);

    const filename = `${filenamePrefix}-${Date.now()}.png`;
    const localUri = `${FileSystem.cacheDirectory}${filename}`;

    const { uri } = await FileSystem.downloadAsync(quickChartUrl, localUri);
    return uri;

  } catch (error) {
    return null;
  }
};