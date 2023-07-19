typeAccount = document.getElementById('typeOutlay');
costSubaccount = document.getElementById('costAccount');
expenseSubaccount = document.getElementById('expensesAccount');

costSubaccount.style.display = "none";
expenseSubaccount.style.display = "none";

typeAccount.addEventListener("change", function() {
    if (typeAccount.value == "5") {
        expenseSubaccount.style.display = "block";
    }
    if (typeAccount.value == "7") {
        costSubaccount.style.display = "block";
    }
});