// utils/chartUtils.ts

/**
 * Genera una URL de QuickChart para una gráfica de línea, adaptada al tema oscuro.
 * Esta función construye el objeto de configuración de Chart.js y lo codifica para QuickChart.
 *
 * @param labels Etiquetas para el eje X (ej. fechas formateadas).
 * @param datasets Array de objetos de dataset para la gráfica (ej. [{ label: 'Peso', data: [...], ... }]).
 * @param title Título de la gráfica.
 * @returns La URL completa de QuickChart que devuelve una imagen de la gráfica.
 */
export const generateQuickChartUrl = (
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    fill?: boolean;
    tension?: number; // Para suavizar las líneas (0.4 es un buen valor)
  }[],
  title: string
): string => {
  const chartConfig = {
    type: 'line', // Tipo de gráfica: línea
    data: {
      labels: labels, // Etiquetas del eje X (ej. "2025-05-01")
      datasets: datasets, // Datos de las líneas de la gráfica
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Permite que la gráfica se ajuste al tamaño definido por width/height
      title: {
        display: true,
        text: title, // Título de la gráfica
        fontColor: '#d1d5db', // Color del texto del título (armoniza con tu CSS)
        fontSize: 18,
      },
      legend: {
        labels: {
          fontColor: '#9ca3af', // Color del texto de las leyendas (armoniza con tu CSS)
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#9ca3af', // Color del texto de las etiquetas del eje X
          },
          gridLines: {
            color: '#374151', // Color de las líneas de la cuadrícula del eje X
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#9ca3af', // Color del texto de las etiquetas del eje Y
          },
          gridLines: {
            color: '#374151', // Color de las líneas de la cuadrícula del eje Y
          }
        }]
      },
      // Plugins específicos de QuickChart, como el color de fondo del área de la gráfica
      plugins: {
        backgroundColor: '#1f2937', // Color de fondo del área de la gráfica (igual al del .container)
      }
    }
  };

  // Codifica la configuración de la gráfica a una cadena URL-safe
  const encodedConfig = encodeURIComponent(JSON.stringify(chartConfig));

  // Construye la URL final de QuickChart, incluyendo dimensiones y devicePixelRatio para mejor calidad
  return `https://quickchart.io/chart?c=${encodedConfig}&width=600&height=300&devicePixelRatio=2`;
};