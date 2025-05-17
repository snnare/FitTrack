import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 40;


interface Metrica {
  _id: string; // O ObjectId si estás seguro de su tipo
  userId: string;
  fecha: string; // O Date si prefieres trabajar con objetos Date directamente
  peso: number;
  altura?: number; // El signo de interrogación indica que es opcional
  cintura?: number;
  cadera?: number;
  pecho?: number;
  muslo?: number;
  pantorrilla?: number;
  brazoRelajado?: number;
  brazoFlexionado?: number;
  porcentajeGrasaCorporal?: number;
  notas?: string;
  __v?: number;
}



interface UserPesoAndPorcentajeGrasaProps {
  metricas: Metrica[];
  filtroMes: number | null;
  filtroAnio: number | null;
}

const UserPesoAndPorcentajeGrasa: React.FC<UserPesoAndPorcentajeGrasaProps> = ({ metricas, filtroMes, filtroAnio }) => {
  // Filtrar las métricas basadas en el mes y el año
  const metricasFiltradas = metricas.filter(m => {
    const fecha = new Date(m.fecha);
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const filtroMesValido = filtroMes === null || filtroMes === mes;
    const filtroAnioValido = filtroAnio === null || filtroAnio === anio;

    return filtroMesValido && filtroAnioValido;
  });

  const idABuscar = '6827decdfc2fbba53227c855';
  const metricaEspecifica = metricasFiltradas.find(metrica => metrica._id === idABuscar);
  console.log("metricaEspecifica: ", metricaEspecifica)
  console.log('Datos Filtrados en UserPesoAndPorcentajeGrasa:', metricasFiltradas);

  // Datos para la gráfica de peso (usando métricas filtradas)
  const pesoData = {
    labels: metricasFiltradas.map(m => new Date(m.fecha).toLocaleDateString()),
    datasets: [
      {
        data: metricasFiltradas.map(m => m.peso),
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Datos para la gráfica de porcentaje de grasa corporal (usando métricas filtradas)
  const grasaData = {
    labels: metricasFiltradas
      .filter(m => m.porcentajeGrasaCorporal !== undefined && m.porcentajeGrasaCorporal !== null)
      .map(m => new Date(m.fecha).toLocaleDateString()),
    datasets: [
      {
        data: metricasFiltradas.map(m => m.porcentajeGrasaCorporal).filter(value => value !== undefined && value !== null),
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d1d5db',
    marginBottom: 5,
  },
  chartStyle: {
    borderRadius: 16,
  },
  chartConfig: {
    backgroundColor: '#111827',
    backgroundGradientFrom: '#111827',
    backgroundGradientTo: '#111827',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#22c55e',
    },
  },
  noData: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default UserPesoAndPorcentajeGrasa;