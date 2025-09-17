document.addEventListener('DOMContentLoaded', () =>{
    const nameExpense = document.getElementById('expense-name');
    const amountExpense = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const addButton = document.getElementById('add-button');
    const displayAmount = document.getElementById('total-amount');

    let expenseNameList = JSON.parse(localStorage.getItem('expenses')) || []
    let totalAmount = 0;
    expenseNameList.forEach(expense => renderExpense(expense));

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        const getExpense = nameExpense.value.trim();
        const getAmount = parseFloat(amountExpense.value);
        if (getExpense === "" || isNaN(getAmount)) return;
        const newExpense = {
            id: Date.now(),
            text: getExpense,
            amount: getAmount,
            completed: false
        }
        expenseNameList.push(newExpense);
        saveTasks();
        // console.log(newExpense);
        renderExpense(newExpense);
        nameExpense.value = "";
        amountExpense.value = "";
    })

    function renderExpense(expns) {
        const li = document.createElement('li');
        li.innerHTML = `${expns.text} - $${expns.amount} <button>Delete</button>`
        expenseList.appendChild(li);

        totalAmount += parseFloat(expns.amount);
        displayAmount.textContent = totalAmount.toFixed(2);

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation;
            expenseNameList = expenseNameList.filter((t) => t.id !== expns.id);
            li.remove();
            saveTasks();

            totalAmount -= parseFloat(expns.amount);
            displayAmount.textContent = parseFloat(totalAmount).toFixed(2);
        })
    }

    function saveTasks(){
        localStorage.setItem('expenses', JSON.stringify(expenseNameList));
    }
})