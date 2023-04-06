const scheduleButton = document.getElementById("schedule-button");
    const scheduleInputs = document.getElementById("schedule-inputs");

    scheduleButton.addEventListener("click", () => {
      if (scheduleInputs.style.display === "none") {
        scheduleInputs.style.display = "block";
      } else {
        scheduleInputs.style.display = "none";
      }
    });