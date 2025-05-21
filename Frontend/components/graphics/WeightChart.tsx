import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Metrica } from '../../app/types/metricas'; 

const screenWidth = Dimensions.get('window').width;

interface WeightChart {
    metrics: Metrica[];
}

const WeightChart: React.FC<WeightChart> = ({ metrics }) => {

    const filteredMetrics = metrics.filter(
        m => m.peso !== undefined && m.peso !== null && !isNaN(m.peso)
    );

    if (filteredMetrics.length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No hay datos de porcentaje de grasa corporal válidos para graficar.</Text>
                <Text style={styles.noDataTextSmall}>Asegúrate de registrar este valor en tus métricas.</Text>
            </View>
        );
    }

    // Preparar los datos para el gráfico
    const labels = filteredMetrics.map(m => {
        const date = new Date(m.fecha);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    });

    const data = filteredMetrics.map(m => m.peso as number);

    // Configuración del gráfico
    // Calcular el rango del eje Y para un mejor escalado
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const padding = (maxValue - minValue) * 0.1; // 10% de padding
    const minY = Math.floor(minValue - padding);
    const maxY = Math.ceil(maxValue + padding);

    const chartConfig = {
        backgroundGradientFrom: '#1f2937', 
        backgroundGradientTo: '#111827',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
        labelColor: (opacity = 1) => `rgba(209, 213, 219, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 1, 
        propsForDots: {
            r: '5', 
            strokeWidth: '2',
            stroke: '#86efac' 
        },
        propsForLabels: {
            fontSize: 10,
        },
        propsForVerticalLabels: {
            fontSize: 9, 
            rotation: 45,
            xOffset: -10,
            yOffset: 10, 
        },
        propsForHorizontalLabels: {
            fontSize: 10,
        },
        yAxisSuffix: ' %',
        minY, 
        maxY 
    };

  
    const maxLabels = 10; // Máximo de etiquetas a mostrar
    let displayLabels: string[] = [];

    if (labels.length > maxLabels) {
        const interval = Math.ceil(labels.length / maxLabels);
        for (let i = 0; i < labels.length; i++) {
            if (i % interval === 0 || i === labels.length - 1) { 
                displayLabels.push(labels[i]);
            } else {
                displayLabels.push(''); 
            }
        }
    } else {
        displayLabels = labels;
    }


    return (
        <View style={styles.chartCard}>
            <Text style={styles.chartTitle}> Peso Corporal</Text>
            <LineChart
                data={{
                    labels: displayLabels, 
                    datasets: [{
                        data: data,
                        color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`, // Color naranja para grasa
                        strokeWidth: 2,
                    }]
                }}
                width={screenWidth - 40} // Ancho del gráfico (restar padding del contenedor)
                height={220}
                chartConfig={chartConfig} // Pasa el objeto chartConfig completo aquí
                bezier // Curva suave en el gráfico
                style={styles.chart}
                yLabelsOffset={5} // Desplazamiento de las etiquetas del eje Y
                verticalLabelRotation={45} // Rotación de las etiquetas del eje X
                fromZero={false} // Permite que el eje Y no empiece en 0 si los datos son altos
                segments={5} // Número de segmentos en el eje Y
                yAxisInterval={1} // Intervalo mínimo para las etiquetas del eje Y
                formatYLabel={(yValue) => `${parseFloat(yValue).toFixed(1)}`} // Formatear a un decimal, asegurando que yValue sea un número antes de toFixed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chartCard: {
        backgroundColor: '#1f2937',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e2e8f0',
        marginBottom: 15,
        textAlign: 'center',
    },
    chart: {
        borderRadius: 16,
    },
    noDataContainer: {
        backgroundColor: '#1f2937',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        width: screenWidth - 40,
    },
    noDataText: {
        color: '#9ca3af',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    noDataTextSmall: {
        color: '#9ca3af',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default WeightChart;