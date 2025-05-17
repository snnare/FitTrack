// quickchartApi.ts (o .js)

const QUICKCHART_BASE_URL = 'https://quickchart.io/chart?c=';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    tension?: number;
    // ... otras propiedades del dataset
  }[];
}

interface ChartOptions {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'scatter' | 'radar' | 'polarArea';
  data: ChartData;
  options?: {
    scales?: {
      x?: any;
      y?: any;
      r?: any;
      // ... otras escalas
    };
    plugins?: {
      tooltip?: any;
      legend?: any;
      // ... otros plugins
    };
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    // ... otras opciones
  };
  format?: 'png' | 'svg' | 'jpeg';
  width?: number;
  height?: number;
  devicePixelRatio?: number;
  backgroundColor?: string;
}

const generateQuickChartUrl = (chartConfig: ChartOptions): string => {
  const encodedConfig = encodeURIComponent(JSON.stringify(chartConfig));
  let url = `${QUICKCHART_BASE_URL}${encodedConfig}`;

  if (chartConfig.format) {
    url += `&format=${chartConfig.format}`;
  }
  if (chartConfig.width) {
    url += `&width=${chartConfig.width}`;
  }
  if (chartConfig.height) {
    url += `&height=${chartConfig.height}`;
  }
  if (chartConfig.devicePixelRatio) {
    url += `&devicePixelRatio=${chartConfig.devicePixelRatio}`;
  }
  if (chartConfig.backgroundColor) {
    url += `&backgroundColor=${chartConfig.backgroundColor}`;
  }

  return url;
};

// Función específica para generar la URL del gráfico de línea
const generateLineChartUrl = (labels: string[], data: number[], label: string, yAxisLabel?: string, xAxisLabel?: string, options?: any): string => {
  const chartConfig: ChartOptions = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)', // Puedes personalizar el color
          tension: 0.1,
          // ... más opciones del dataset
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: !!xAxisLabel,
            text: xAxisLabel,
          },
        },
        y: {
          title: {
            display: !!yAxisLabel,
            text: yAxisLabel,
          },
        },
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      ...options, // Permite pasar opciones adicionales
    },
  };
  return generateQuickChartUrl(chartConfig);
};

// Función para generar la URL del gráfico de peso
const generatePesoChartUrl = (metricas: any[]) => {
  if (metricas && metricas.length > 0) {
    const fechas = metricas.map(m => new Date(m.fecha).toLocaleDateString());
    const pesos = metricas.map(m => m.peso);

    return generateLineChartUrl(fechas, pesos, 'Peso (kg)', 'Peso (kg)', 'Fecha', {
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
    });
  }
  return null;
};

// Función para generar la URL del gráfico de porcentaje de grasa corporal
const generatePorcentajeGrasaChartUrl = (metricas: any[]) => {
  if (metricas && metricas.length > 0 && metricas.some(m => m.porcentajeGrasaCorporal !== undefined)) {
    const fechas = metricas.map(m => new Date(m.fecha).toLocaleDateString());
    const porcentajesGrasa = metricas.map(m => m.porcentajeGrasaCorporal);

    return generateLineChartUrl(fechas, porcentajesGrasa, 'Porcentaje de Grasa Corporal (%)', 'Porcentaje (%)', 'Fecha', {
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
    });
  }
  return null;
};

export { generateQuickChartUrl, generateLineChartUrl, generatePesoChartUrl, generatePorcentajeGrasaChartUrl, ChartOptions };