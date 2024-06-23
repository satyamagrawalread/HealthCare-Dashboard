async function main() {
    await loadHTML("#header", "src/html/homepage/header.html");
    await loadHTML("#navbar", "src/components/navbar.html");
    await loadHTML("#main", "src/html/homepage/main.html");
    await loadHTML("#patients", "src/components/patients.html");
    await loadHTML("#diagnosis-history", "src/components/diagnosis_history.html");
    await loadHTML("#patient-profile", "src/components/patient_profile.html");
    await loadHTML("#diagnostic-list", "src/components/diagnostic_list.html");
    await loadHTML("#lab-results", "src/components/lab_results.html");
    await populatePatientProfile();
}
main();

//# sourceMappingURL=index.de5c0784.js.map
