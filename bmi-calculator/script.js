document.getElementById("calculate").addEventListener("click", function () {
  const age = parseInt(document.getElementById("age").value, 10);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100; // convert cm to m
  const resultDiv = document.getElementById("result");

  if (isNaN(age) || age <= 0) {
    resultDiv.innerHTML = "Please enter a valid age.";
    return;
  }

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    resultDiv.innerHTML = "Please enter valid weight and height.";
    return;
  }

  const bmi = weight / (height * height);
  let category = "";
  let suggestion = "";

  if (bmi < 18.5) {
    category = "Underweight";
    suggestion =
      "Try a balanced diet with healthy calories to gain weight safely.";
  } else if (bmi < 25) {
    category = "Normal";
    suggestion = "Great job! Keep maintaining your current routine.";
  } else if (bmi < 30) {
    category = "Overweight";
    suggestion =
      "Aim for regular physical activity and a lighter plate to move toward normal BMI.";
  } else {
    category = "Obese";
    suggestion =
      "Consider a doctor-approved plan with diet changes and exercise.";
  }

  resultDiv.innerHTML =
    `<div class="result-value">BMI = ${bmi.toFixed(1)} kg/m²</div>` +
    `<div class="result-category">${category}</div>` +
    `<div class="result-info">Age: ${age} years</div>` +
    `<div class="result-suggestion">${suggestion}</div>`;
});
