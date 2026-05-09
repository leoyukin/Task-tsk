//          -- Variables --
const mainBoard = document.querySelector(".board")
const addBtn = document.querySelector(".addBtn");
const pcont1 = document.getElementById("container1");
const pcont2 = document.getElementById("container2");
const inputBtn = document.querySelector(".inpBtns");
const cardtitlee = document.querySelector(".card-title");
const edit = document.querySelectorAll(".edit");
const dele = document.querySelectorAll(".delete");
const inputt = document.querySelector(".inptext");
const darkMode = document.getElementById("darkMode");
const savedTheme = localStorage.getItem('theme');
const addBtn2 = document.querySelector("#newBtn2");
let tasks = {
    td: [],
    prog: [],
    done: []
};

let isactive = false;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');

    if (saved) {
        tasks = JSON.parse(saved);
    }
}



function renderTsks() {
    const containers = {
        td: document.getElementById("container1"),
        prog: document.getElementById("container2"),
    };

    Object.keys(tasks).forEach(cont => {
        tasks[cont].forEach(task => {
            const card = document.createElement('div');
            const priorr = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
            card.classList.add(`card`, `${task.container}`)
            card.dataset.id = task.id;
            card.innerHTML = `
                    <div class="toptitle">
                        <p class="card-title">${task.name}</p>
                        <input type="text" class="inptext" />
                        <button class="prop edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                    <div class="divi"></div>
                    <div class="bottitle">
                        <span class="priority ${task.priority}">${priorr}</span>
                        <button class="prop delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
    `;
            if (containers[cont]) {
                containers[cont].appendChild(card);
            } else {
                console.error('Target container "td" was not found in the DOM.');
            }

        });
    });
}

loadTasks();
renderTsks();

//     -- Dark Mode --
darkMode.addEventListener("click", () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        darkMode.textContent = 'Light Mode';
    }
    else {
        localStorage.setItem('theme', 'light');
        darkMode.textContent = 'Dark Mode';
    }
});

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    darkMode.textContent = 'Light Mode';
}

//          -- Board Events --

mainBoard.addEventListener("click", (event) => {
    const todo = event.target.closest('.card');
    const currenttd = event.currentTarget;
    const input = todo.querySelector('.inptext');
    switch (todo) {
        case todo:
            if (!todo.classList.contains('active') && !event.target.closest('.added') && isactive === false && currenttd) {
                todo.classList.add('active');
                return isactive = true;
            }

            if (todo.classList.contains('active') && isactive === true && !event.target.closest('.added') && input.style.display !== 'block' && !event.target.closest(".edit")) {
                todo.classList.remove('active');
                return isactive = false;

            }
            if (!todo.classList.contains('active') && isactive === true && currenttd && !event.target.closest('.added')) {
                showToast("There's an active card!");
                return;
            }
            break;
    }
})
mainBoard.addEventListener("click", (event) => {
    const edit = event.target.closest('.edit');
    const current = event.currentTarget;
    if (edit && !event.target.closest('.added')) {
        return editt(current);
    }
})

mainBoard.addEventListener("click", (event) => {
    const dele = event.target.closest('.delete');
    const card = event.target.closest('.card');
    const id = Number(card.dataset.id);
    if (dele) {
        setTimeout(() => {
            Object.keys(tasks).forEach(cont => {
                tasks[cont] = tasks[cont].filter(task => task.id !== id);
            });

            saveTasks();
            card.remove();
        }, 500);
        return event.target.classList.remove('active');
    }
})

function editt() {
    const card = document.querySelector(".active");
    const text = card.querySelector(".card-title");
    const input = card.querySelector(".inptext");
    const emptyinput = " ";

    input.value = text.textContent;
    text.style.display = 'none';
    input.style.display = 'block';
    input.focus();

    if (input.value.trim() !== "" && input.value.trim() !== " ") {
        input.addEventListener("keydown", (e) => {
            if (e.key === 'Enter' && input.value.trim() !== "") {

                text.textContent = input.value;

                input.style.display = 'none';
                text.style.display = 'block';
            }


        });
    }
    else if (input.value.trim() !== "" && input.value.trim() !== emptyinput) {
        input.addEventListener("blur", () => {

            text.textContent = input.value;

            input.style.display = 'none';
            text.style.display = 'block';
        });
    }
    else {
        showToast('Please enter a task!');
        input.focus;
    }
}

addBtn.addEventListener("click", function () {
    if (addBtn2.style.display === 'none') {
        showToast("New task already open!");
        return;
    }
    else {
        addBtn.style.display = 'none';
        return showinput();
    }
});

addBtn2.addEventListener("click", function () {
    if (addBtn.style.display === 'none') {
        showToast("New task already open!");
        return;
    }
    else {
        addBtn2.style.display = 'none';
        return showinput();
    }
});


//          -- Functions --


function showinput() {
    const inputBox = document.createElement('div');
    const adBtn1 = addBtn.style.display === 'none';
    const adBtn2 = addBtn2.style.display === 'none';
    let container = "";
    inputBox.classList.add('added');
    inputBox.innerHTML = `
                <div class="added">
                    <input type="text" placeholder="New Task..." class="card-title newTsk" id="ntask" />
                    <div class="inpBtns">
                        <button class="confirmBtn nbtn">Confirm</button>
                        <button class="cancelBtn nbtn">Cancel</button>
                    </div>
                    <div class="divi"></div>
                    <button class="priority unknown" id="unkBtn">Priority</button>
                    <div class="priorBtn">
                        <button class="priority low pbtn">Low</button>
                        <button class="priority medium pbtn">Medium</button>
                        <button class="priority high pbtn">High</button>
                    </div>
                </div>
        `;


    if (adBtn1) {
        pcont1.appendChild(inputBox);
        container = "td";
    }

    if (adBtn2) {
        pcont2.appendChild(inputBox);
        container = "prog";
    }

    inputBox.querySelectorAll(".pbtn").forEach(btn => {
        btn.style.display = 'none';
    });

    document.getElementById("ntask").focus();

    const getprior = showBtn(inputBox);

    inputBox.querySelector('.confirmBtn').addEventListener("click", function () {
        const prior = getprior();
        createCard(inputBox, prior, container);
    });

    inputBox.querySelector('.cancelBtn').addEventListener("click", function () {
        cancelCard(inputBox);
    });

    document.getElementById("ntask").addEventListener("keydown", function (e) {
        const prior = getprior();
        if (e.key === 'Enter') {
            createCard(inputBox, prior, container)
        };
        if (e.key === 'Escape') {
            cancelCard(inputBox);
        };
    })
}


function createCard(inputBox, prior, container) {
    const taskName = document.querySelector("#ntask");
    const task = taskName.value.charAt(0).toUpperCase() + taskName.value.slice(1);
    const pri = prior.toLowerCase();

    if (task.trim() === "") {
        showToast('Please enter a task');
        return;
    }
    if (prior === "None") {
        showToast('Please select a priority')
        return;
    }

    const newTask = {
        id: Date.now(),
        container: container,
        name: task,
        priority: pri,
        completed: false
    };


    tasks[container].push(newTask);
    saveTasks();


    const card = document.createElement('div');
    card.classList.add(`card`, `${container}`);
    card.dataset.id = newTask.id;
    card.innerHTML = `
                    <div class="toptitle">
                        <p class="card-title">${task}</p>
                        <input type="text" class="inptext" />
                        <button class="prop edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                    <div class="divi"></div>
                    <div class="bottitle">
                        <span class="priority ${pri}">${prior}</span>
                        <button class="prop delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
    `;

    if (container === "td") {
        pcont1.appendChild(card);
        pcont1.insertBefore(card, inputBox);

    }

    else if (container === "prog") {
        pcont2.appendChild(card);
        pcont2.insertBefore(card, inputBox);
    }

    inputBox.remove();
    addBtn.style.display = 'block';
    addBtn2.style.display = 'block';



}

function cancelCard(inputBox) {
    inputBox.remove();
    addBtn.style.display = 'block';
    addBtn2.style.display = 'block';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(function () {
        toast.classList.remove('show');
    }, 3000);
}

function showBtn(inputBox) {
    const unknown = inputBox.querySelector(".unknown");
    const low = inputBox.querySelector(".pbtn.low");
    const med = inputBox.querySelector(".pbtn.medium");
    const high = inputBox.querySelector(".pbtn.high");
    const alls = inputBox.querySelectorAll(".pbtn");
    let prior = "None";

    unknown.style.display = '';

    alls.forEach(all => {
        all.style.display = 'inline-block';

    });

    low.addEventListener("click", () => {
        if (med.style.display === 'inline-block' && high.style.display === 'inline-block') {
            med.style.display = 'none';
            high.style.display = 'none';
            prior = "Low";
        }
        else {
            med.style.display = 'inline-block';
            high.style.display = 'inline-block';
            prior = "None";
        };
    });

    med.addEventListener("click", () => {
        if (low.style.display === 'inline-block' && high.style.display === 'inline-block') {
            low.style.display = 'none';
            high.style.display = 'none';
            prior = "Medium";
        }
        else {
            low.style.display = 'inline-block';
            high.style.display = 'inline-block';
            prior = "None";
        };
    });

    high.addEventListener("click", () => {
        if (low.style.display === 'inline-block' && med.style.display === 'inline-block') {
            low.style.display = 'none';
            med.style.display = 'none';
            prior = "High";
        }
        else {
            med.style.display = 'inline-block';
            low.style.display = 'inline-block';
            prior = "None";
        };
    });

    return function getprior() {
        return prior;
    };
}