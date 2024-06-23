async function fetchPatientsProfile() {
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

export default fetchPatientsProfile;
