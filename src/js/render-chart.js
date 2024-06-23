
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from "chart.js";
import dayjs from "dayjs";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(LineController);
Chart.register(PointElement);
Chart.register(LineElement);


function renderChart(filteredDiagnosisHistory) {
    const month_key = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };
    const diagnosisChart = new Chart(
        document.getElementById("diagnosis-history-chart"),
        {
          type: "line",
          options: {
            animation: true,
            scales: {
              x: {
                // display: true, // This will remove the x-axis labels
                grid: {
                    display: false
                }
              },
              y: {
                // display: true, // This will remove the y-axis labels
                // grid: false // Remove vertical lines
              },
            },
            plugins: {
              legend: {
                display: false, // This will remove the legend
              },
            },
          },
          data: {
            labels: [
              ...filteredDiagnosisHistory
                .map((row) => {
                  const date = dayjs()
                    .set("year", row.year)
                    .set("month", month_key[row.month] - 1)
                    .set("date", 1);
                  return date.valueOf();
                })
                .sort()
                .map((item) => dayjs(item).format("MMM YYYY")),
            ],
            datasets: [
              {
                // label: "Systolic",
                data: [
                  ...filteredDiagnosisHistory
                    .sort((a, b) => {
                      const previousDate = dayjs()
                        .set("year", a.year)
                        .set("month", month_key[a.month] - 1)
                        .set("date", 1);
                      const currentDate = dayjs()
                        .set("year", b.year)
                        .set("month", month_key[b.month] - 1)
                        .set("date", 1);
                      return previousDate.diff(currentDate);
                    })
                    .map((row) => row.blood_pressure.systolic.value),
                ],
                borderColor: "#c26eb4",
                lineTension: 0.5,
                borderWidth: 2,
                pointBackgroundColor: "#c26eb4",
              },
              {
                // label: "Diastolic",
                data: [
                  ...filteredDiagnosisHistory
                    .sort((a, b) => {
                      const previousDate = dayjs()
                        .set("year", a.year)
                        .set("month", month_key[a.month] - 1)
                        .set("date", 1);
                      const currentDate = dayjs()
                        .set("year", b.year)
                        .set("month", month_key[b.month] - 1)
                        .set("date", 1);
                      return previousDate.diff(currentDate);
                    })
                    .map((row) => row.blood_pressure.diastolic.value),
                ],
                borderColor: "#8c6fe6",
                lineTension: 0.5,
                borderWidth: 2,
                pointBackgroundColor: "#8c6fe6",
              },
            ],
          },
        }
      );
    return diagnosisChart;
}

export default renderChart;