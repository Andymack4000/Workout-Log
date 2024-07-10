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
const workoutLog = document.getElementById("workout-log")
const messageText = document.getElementById("message")


// Class for each instance of exercise

class workoutLogObj  {

    constructor(name = "", date = "", exercise = "", sets = 0, reps = [], weight = []){

        this.name = this.name;
        this.date = date;
        this.exercise = exercise;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight

    }

}

const getUserInput = () => {
    messageText.innerHTML=""
    exerciseInfo.addEventListener("submit", (e) => {
    e.preventDefault();

    let bodyPartTrained = bodyPart.value

    bodyPartTrained = new workoutLogObj
    bodyPartTrained.exercise = exercise.value
    bodyPartTrained.date = date.value 
    bodyPartTrained.sets = parseInt(sets.value)

    const setNum = parseInt(sets.value)
        console.log(bodyPartTrained, date.value, workoutDate.innerHTML, "is this working")
    //logWorkout(exercise.value, sets.value)
    logRepsAndWeight(setNum, bodyPartTrained);
    })
}

// create popup for function https://www.geeksforgeeks.org/how-to-create-popup-box-using-html-and-css/

//create user input form for reps and weight and pass to logWorkOut() function
const logRepsAndWeight = (setNum, bodyPartTrained) => {
    console.log(bodyPartTrained)

    const repsAndWeight = document.querySelector("#log-reps-and-weight")

    repsAndWeight.textContent=""

    const form = document.createElement("form")
    form.setAttribute("id", "form")

    const reps = document.createElement("input")
    reps.setAttribute("placeholder", "Reps")
    reps.setAttribute("type", "number")
    reps.setAttribute("required", "")

    const weight = document.createElement("input")
    weight.setAttribute("placeholder", "Weight")
    weight.setAttribute("type", "number")
    weight.setAttribute("required", "")

    const s = document.createElement("input")
    s.setAttribute("type", "submit")
    s.setAttribute("value", "Submit");

    form.appendChild(reps)
    form.appendChild(weight)
    form.appendChild(s);

    repsAndWeight.appendChild(form)

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        //console.log(bodyPartTrained.reps.length, setNum)
        bodyPartTrained.reps.push(parseInt(reps.value))
        bodyPartTrained.weight.push(parseInt(weight.value))
        console.log("working?", bodyPartTrained.reps[0],bodyPartTrained.reps[1], bodyPartTrained.reps[2])
        form.reset()
            if (bodyPartTrained.reps.length === setNum) {
                console.log("DONE")
                //removeEventListener();
                repsAndWeight.textContent=""
                logWorkout(bodyPartTrained)
            }
        console.log(bodyPartTrained.reps, bodyPartTrained.weight)
    })  
}


const logWorkout = (bodyPartTrained) => {if (workoutDate.innerHTML == "") {
    workoutDate.innerHTML = `${date.value} ${bodyPart.value}`
}
let exerciseNumber = "sort out later";
    workoutTable.innerHTML += `
        <tr>
            <td>${exerciseNumber}</td>
            <td>${bodyPartTrained.exercise}</td>
            <td>${bodyPartTrained.sets}</td>
            <td>${bodyPartTrained.reps.join(", ")}</td>
            <td>${bodyPartTrained.weight.join(", ")}</td>
            <td><input type="button" value="Amend" id="amend" onclick="amendRow('${encodeURIComponent(JSON.stringify(bodyPartTrained))}', this)"></td>
            <td><input type="button" value="Delete" id="delete" onclick="deleteRow(this)"/></td>
        </tr>
        `

workoutLog.addEventListener("submit", (e) => {
    e.preventDefault()

    //this code unpacks table, maps the td and tr elements and then uses map to get data using innerText
    let data = [...workoutTable.rows].map(t => [...t.children].map(u => u.innerText))

    //Cleans data - gets rid of buttons so are not stored in array
    let cleanedDataObject = {}

    let cleanedDataArray = []

    let cleanedData = []

    for (let i = 1; i < data.length; i++) {   
        cleanedDataObject = {}
        const cleanedDataElement = (data[i].filter(item => item !== ""))
        console.log(cleanedDataElement)
        cleanedData.push([data[0]] , [cleanedDataElement])
        //console.log(data[0][2], cleanedDataElement[2])
        for (let j = 0; j < cleanedDataElement.length; j++) {
            cleanedDataObject[data[0][j]] = cleanedDataElement[j]
        }
    cleanedDataArray.push(cleanedDataObject)
    } 
    
    //console.log(cleanedDataObject, cleanedDataArray)

    //console.log(date.value, bodyPart.value, cleanedData)
    let bodyPartWorkout = {
        dateOfWorkout: date.value,
        bodyPartWorkoutName: bodyPart.value,
        workoutData: cleanedDataArray
    }

    console.log(bodyPartWorkout)
    

    //send to storage

    //Check if object empty : if not, save object, if not saved, carry on
    if (Object.keys(bodyPartWorkout).length !== 0) {
        console.log("objec not empty")
        if (workoutTable.rows.length > bodyPartTrained.sets){
            for (let i = bodyPartTrained.sets; i > 0; i--) {
            console.log(i, bodyPartTrained.sets)
            workoutTable.deleteRow(i)
            }
        }

        //PUT A TIMER ON MESSAGE
        
        messageText.innerHTML += "Thanks for your input"
        exerciseInfo.reset()


    }
})

    //set time out before leaving?

    getUserInput()
}

//delete row of user input
const deleteRow = (row) => {
    const i = row.parentNode.parentNode.rowIndex
    document.getElementById("workout-table").deleteRow(i)
}

//amend row of user input
const amendRow = (obj, row) => {
    const i = row.parentNode.parentNode.rowIndex
    document.getElementById("workout-table").deleteRow(i)
    const bodyPartTrained = JSON.parse(decodeURIComponent(obj))
    const {sets} = bodyPartTrained
    console.log(bodyPartTrained, sets)
    bodyPartTrained.reps = []
    bodyPartTrained.weight = []
    logRepsAndWeight(sets, bodyPartTrained)

    //logRepsAndWeight(setNum, bodyPartTrained)
    
}

getUserInput()