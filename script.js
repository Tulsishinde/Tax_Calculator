$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $("#taxCalculatorForm").submit(function (event) {
    event.preventDefault();

    // Reset error icon visibility
    $(".error-icon").hide();

    // Retrieve form values
    let grossIncome = parseFloat($("#grossIncome").val());
    let extraIncome = parseFloat($("#extraIncome").val());
    let deductions = parseFloat($("#deductions").val());
    let age = $("#age").val();

    // Check for errors and display error icons
    if (isNaN(grossIncome)) {
      $("#grossIncomeError").show();
    }
    if (isNaN(extraIncome)) {
      $("#extraIncomeError").show();
    }
    if (isNaN(deductions)) {
      $("#deductionsError").show();
    }
    if (age === "") {
      $("#ageError").show();
    }

    // If no errors, perform tax calculation
    if (
      !isNaN(grossIncome) &&
      !isNaN(extraIncome) &&
      !isNaN(deductions) &&
      age !== ""
    ) {
      let taxableIncome = grossIncome + extraIncome - deductions;
      let taxRate = 0;
      if (taxableIncome > 800000) {
        if (age === "<40") {
          taxRate = 0.3;
        } else if (age === "≥ 40 &lt; 60") {
          taxRate = 0.4;
        } else if (age === "≥ 60") {
          taxRate = 0.1;
        }
      }
      let taxAmount = taxRate * (taxableIncome - 800000);

      // Display result in modal
      $("#resultBody").html(
        `Taxable Income: ${taxableIncome.toLocaleString()}<br>Tax Amount: ${taxAmount.toLocaleString()}`
      );
      $("#resultModal").modal("show");
    }
  });
});
