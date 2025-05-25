// ../utils/chartImageSave.ts
import * as FileSystem from 'expo-file-system';
import { generateQuickChartUrl } from './chartUtils'; // Asumo que esta función está bien

// Directorio base para guardar las gráficas de reportes de forma persistente
const CHART_BASE_DIR = `${FileSystem.documentDirectory}report_charts/`;

// Asegura que el directorio exista al iniciar la aplicación o antes de guardar
export const ensureChartDirectoryExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(CHART_BASE_DIR);
  if (!dirInfo.exists) {
    console.log('Creando directorio de gráficas:', CHART_BASE_DIR);
    await FileSystem.makeDirectoryAsync(CHART_BASE_DIR, { intermediates: true });
  }
};

// Función para guardar la imagen de la gráfica
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
  // Ahora filename es el nombre completo del archivo (ej: 'reporte_5_2025_peso.png')
  filename: string
): Promise<string | null> => {
  try {
    await ensureChartDirectoryExists(); // Asegura el directorio

    const quickChartUrl = generateQuickChartUrl(labels, datasets, title);
    const localUri = `${CHART_BASE_DIR}${filename}`; // Guarda en el directorio persistente

    const { uri } = await FileSystem.downloadAsync(quickChartUrl, localUri);
    console.log(`Gráfica guardada localmente en: ${uri}`);
    return uri;

  } catch (error) {
    console.error('Error al guardar la imagen de la gráfica localmente:', error);
    return null;
  }
};

// Función para obtener el URI local de una gráfica existente
export const getChartImageLocalUri = (filename: string): string => {
  return `${CHART_BASE_DIR}${filename}`;
};

// Opcional: Función para limpiar gráficas antiguas o específicas si es necesario
export const clearChartImageLocally = async (filename: string): Promise<boolean> => {
  try {
    const uri = getChartImageLocalUri(filename);
    await FileSystem.deleteAsync(uri, { idempotent: true });
    console.log(`Gráfica ${filename} eliminada.`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar la gráfica ${filename}:`, error);
    return false;
  }
};

// Opcional: Función para limpiar todas las gráficas de reportes
export const clearAllReportCharts = async (): Promise<boolean> => {
  try {
    await FileSystem.deleteAsync(CHART_BASE_DIR, { idempotent: true });
    console.log('Directorio de gráficas de reportes limpiado.');
    return true;
  } catch (error) {
    console.error('Error al limpiar el directorio de gráficas de reportes:', error);
    return false;
  }
};