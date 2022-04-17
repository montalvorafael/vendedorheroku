import { Bar, Line, Pie } from "react-chartjs-2";

export const BarChart = (props) => {
  //Los labels tambien se deberian pedir de la pagina de dashboard

  let data = {
    labels: ["Comida 1", "Comida 2", "Comida 3", "Comida 4", "Comida 5"],
    datasets: [
      {
        label: props.label,
        data: props.data,
        backgroundColor: "rgba(79,208,83,.3)",
        borderColor: "rgba(79,208,83,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={{ maintainAspectRatio: false }} data={data} />;
};

export const PieChart = (props) => {
  //Top 5?
  let colors = [];
  for (let i = 1; i < 7; i++) {
    colors.push(`rgba(79,208,83,.${i})`);
  }

  let data = {
    labels: ["Comida 1", "Comida 2", "Comida 3", "Comida 4", "Comida 5"],
    datasets: [
      {
        label: props.label,
        data: props.data,
        backgroundColor: colors,
        borderColor: "rgba(79,208,83,1)",
        borderWidth: 1,
      },
    ],
  };
  return <Pie options={{ maintainAspectRatio: false }} data={data} />;
};

export const LineChart = (props) => {
  let data = {
    labels: ["Comida 1", "Comida 2", "Comida 3", "Comida 4", "Comida 5"],
    datasets: [
      {
        label: props.label,
        data: props.data,
        fill: true,
        backgroundColor: "rgba(79,208,83,.3)",
        borderColor: "rgba(79,208,83,1)",
      },
    ],
  };

  return <Line options={{ maintainAspectRatio: false }} data={data} />;
};
