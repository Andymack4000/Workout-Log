//store info to local storage and then once workout completed, send to database

// AUTO COMPLETE CODE https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete


const exerciseInfo = document.getElementById("exercise-info")

const date = document.getElementById("date")
const bodyPart = document.getElementById("body-part")
const workoutType = document.getElementById("workout-type")

const exercise = document.getElementById("exercise")
const reps = document.getElementById("reps")
const sets = document.getElementById("sets")
const weight = document.getElementById("weight")

const currentWorkout = document.getElementById("current-workout")
const workoutTable = document.getElementById("workout-table")
const workoutDate = document.getElementById("workout-date-and-body_part")


exerciseInfo.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(date.value, workoutDate.innerHTML, "is this working")
    if (workoutDate.innerHTML == "") {
        workoutDate.innerHTML = `${date.value} ${bodyPart.value}`
    }
    let exerciseNumber = 0;
    exerciseNumber += 1
    workoutTable.innerHTML += `
    <tr>
    <td>${exerciseNumber}</td>
    <td>${exercise.value}</td>
    <td>${sets.value}</td>
    <td>${reps.value}</td>
    <td>${weight.value}</td>
    <td><input type="button" value="Amend" id="amend"></td>
    <td><input type="button" value="Delete" id="delete" onclick="deleteRow(this)"/></td>
    </tr>
    `
    exerciseNumber += 1
})

const deleteRow = (row) => {
    const i = row.parentNode.parentNode.rowIndex
    document.getElementById("workout-table").deleteRow(i)
}