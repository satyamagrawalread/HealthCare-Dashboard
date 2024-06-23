import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from "chart.js";
import dayjs from "dayjs";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(LineController);
Chart.register(PointElement);
Chart.register(LineElement);


async function fetchPatientProfile() {
  const token = process.env.TOKEN;
  return fetch("https://fedskillstest.coalitiontechnologies.workers.dev/", {
    method: "GET",
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("API Failed");
    })
    .then((data) => {
      return data;
    })
    .catch(() => {
      document.querySelectorAll(".error-state").forEach((element) => {
        element.style.height = "400px";
        element.style.display = "block";
        element.innerHTML = `
            <div style="width: 100%; margin-top: 100px; display: flex; align-items: center; justify-content: center;">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <img src="/warning.png" alt="Error-icon" style="width: 100px; height: 100px;">
        <h2 style="font-weight: bold;">Some error occured!</h2>
    </div>
</div>`;
      });
    });
}

function getLastNMonthsData(n, datasets) {
  const month_key = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const currentDate = new Date();
  const nMonthsAgo = new Date(currentDate).setMonth(
    currentDate.getMonth() - n - 1
  );
  return datasets.filter((dataset) => {
    const entryDate = new Date(dataset.year, month_key[dataset.month]);
    return entryDate >= nMonthsAgo && entryDate <= currentDate;
  });
}

async function populatePatientProfile() {
  const patientsInfo = await fetchPatientProfile();
  const patientName = "Jessica Taylor";
  const patientInfo = patientsInfo.find((person) => person.name === patientName);
  document.getElementById('patients-list').innerHTML = `${patientsInfo.map((patient) => {
    return `
    <div class="section">
            <div class="patient-data">
              <img src="${patient.profile_picture}" />
              <div class="details">
                <span class="name">${patient.name}</span>
                <span class="age">${patient.gender}, ${patient.age}</span>
              </div>
            </div>
            <img
              src="/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"
              alt="dots"
            />
          </div>`
  }).join('')}`
  document.getElementById("patient-profile-image").src =
    patientInfo.profile_picture;
  document.getElementById("patient-name").innerText = patientInfo.name;
  document.getElementById("date-of-birth").innerText = dayjs(
    patientInfo.date_of_birth
  ).format("MMMM DD, YYYY");
  if (patientInfo.gender === "Male") {
    document.getElementById("gender-image").src = "/MaleIcon.svg";
  } else {
    document.getElementById("gender-image").src = "/FemaleIcon.svg";
  }
  document.getElementById("gender-value").innerText = patientInfo.gender;
  document.getElementById("patient-contact").innerText =
    patientInfo.phone_number;
  document.getElementById("patient-emergency-contact").innerText =
    patientInfo.emergency_contact;
  document.getElementById("insurance-provider").innerText =
    patientInfo.insurance_type;

  document.getElementById("diagnostic-section-list").innerHTML = `
    ${patientInfo.diagnostic_list
      .map((data) => {
        return `<div class="section">
            <span>${data.name}</span>
            <span>${data.description}</span>
            <span>${data.status}</span>
        </div>`;
      })
      .join("")}`;

  document.getElementById("patient-lab-results-list").innerHTML = `
    ${patientInfo.lab_results
      .map((data) => {
        return `<div class="section">
        <span>${data}</span>
        <img src="/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="download">
    </div>`;
      })
      .join("")}`;
  document.getElementById("systolic-value").innerText =
    patientInfo.diagnosis_history[0].blood_pressure.systolic.value;
  document.getElementById("diastolic-value").innerText =
    patientInfo.diagnosis_history[0].blood_pressure.diastolic.value;
  document.getElementById("systolic-status").innerText =
    patientInfo.diagnosis_history[0].blood_pressure.systolic.levels;
  // Assign diagnostic status
  document.getElementById("diastolic-status").innerText =
    patientInfo.diagnosis_history[0].blood_pressure.diastolic.levels;
  // Changes status icon on the basis of status
  if (
    patientInfo.diagnosis_history[0].blood_pressure.systolic.levels ===
    "Higher than Average"
  ) {
    document.getElementById("systolic-status-icon").src =
      "/ArrowUp.svg";
  } else if (
    patientInfo.diagnosis_history[0].blood_pressure.systolic.levels ===
    "Lower than Average"
  ) {
    document.getElementById("systolic-status-icon").src =
      "/ArrowDown.svg";
  }

  if (
    patientInfo.diagnosis_history[0].blood_pressure.diastolic.levels ===
    "Higher than Average"
  ) {
    document.getElementById("diastolic-status-icon").src =
      "/ArrowUp.svg";
  } else if (
    patientInfo.diagnosis_history[0].blood_pressure.diastolic.levels ===
    "Lower than Average"
  ) {
    document.getElementById("diastolic-status-icon").src =
      "/ArrowDown.svg";
  }

  // Assigns value and status for respiratory rate
  document.getElementById("respiratory-rate-value").innerText =
    patientInfo.diagnosis_history[0].respiratory_rate.value + " bpm";
  document.getElementById("respiratory-rate-status").innerText =
    patientInfo.diagnosis_history[0].respiratory_rate.levels;
  if (
    patientInfo.diagnosis_history[0].respiratory_rate.levels ===
    "Higher than Average"
  ) {
    document.getElementById("respiratory-rate-status-icon").src =
      "/ArrowUp.svg";
  } else if (
    patientInfo.diagnosis_history[0].respiratory_rate.levels ===
    "Lower than Average"
  ) {
    document.getElementById("respiratory-rate-status-icon").src =
      "/ArrowDown.svg";
  }
  //
  // Assigns value and status for temperature
  document.getElementById("temperature-value").innerText =
    patientInfo.diagnosis_history[0].temperature.value + "°F";
  document.getElementById("temperature-status").innerText =
    patientInfo.diagnosis_history[0].temperature.levels;
  if (
    patientInfo.diagnosis_history[0].temperature.levels ===
    "Higher than Average"
  ) {
    document.getElementById("temperature-status-icon").src =
      "/ArrowUp.svg";
  } else if (
    patientInfo.diagnosis_history[0].temperature.levels === "Lower than Average"
  ) {
    document.getElementById("temperature-status-icon").src =
      "/ArrowDown.svg";
  }
  //
  // Assigns value and status for heart rate
  document.getElementById("heart-rate-value").innerText =
    patientInfo.diagnosis_history[0].heart_rate.value + " bpm";
  document.getElementById("heart-rate-status").innerText =
    patientInfo.diagnosis_history[0].heart_rate.levels;
  if (
    patientInfo.diagnosis_history[0].heart_rate.levels === "Higher than Average"
  ) {
    document.getElementById("heart-rate-status-icon").src =
      "/ArrowUp.svg";
  } else if (
    patientInfo.diagnosis_history[0].heart_rate.levels === "Lower than Average"
  ) {
    document.getElementById("heart-rate-status-icon").src =
      "/ArrowDown.svg";
  }
  //
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

  const filteredDiagnosisHistory = getLastNMonthsData(
    6,
    patientInfo.diagnosis_history
  );

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

  document.getElementById("date-range").onchange = function (event) {
    const numberOfMonths = event.target.value;
    const filteredDiagnosisHistory = getLastNMonthsData(
      Number(numberOfMonths),
      patientInfo.diagnosis_history
    );
    document.getElementById("diagnosis-history-chart").innerHTML = "";
    diagnosisChart.data.labels = [
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
    ];

    diagnosisChart.data.datasets = [
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
    ];

    diagnosisChart.update();
  };
}

export default populatePatientProfile;