const addBtn = document.querySelector(".addBtn");
let cardscont = document.querySelector(".container-cards");
const pcont1 = document.getElementById("container1")
let todo = document.querySelectorAll(".td");
const inputBtn = document.querySelector(".inpBtns");
const cardtitlee = document.querySelector(".card-title")
const edit = document.querySelectorAll(".edit");
const dele = document.querySelectorAll(".delete");
const inputt = document.querySelector(".inptext");
const darkMode = document.getElementById("darkMode");
const savedTheme = localStorage.getItem('theme');
let isactive = false;


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

pcont1.addEventListener("click", (event) => {
    if (event.target.closest('.delete')) {
        event.target.closest('.td').remove();
        event.target.closest('card').remove();
        return event.target.classList.remove('active');
    }
})

pcont1.addEventListener("click", (event) => {
    if (event.target.closest('.edit')) {
        const card = event.target.closest('.td')
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
})

pcont1.addEventListener("click", (event) => {
    const todo = event.target.closest('.td');
    const currenttd = event.currentTarget;
    if (!todo.classList.contains('active') && isactive === false && currenttd) {
        todo.classList.add('active');
        return isactive = true;
    }
    else if (todo.classList.contains('active') && isactive === true && cardtitlee.style.display !== 'none' && inputt.style.display !== 'block') {
        todo.classList.remove('active');
        return isactive = false;

    }
    else if (!todo.classList.contains('active') && isactive === true && currenttd) {
        showToast("There's an active card!");
        return;
    }

})




addBtn.addEventListener("click", function () {
    showinput();
});


function showinput() {
    addBtn.style.display = 'none';
    const inputBox = document.createElement('div');
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


    pcont1.appendChild(inputBox);

    inputBox.querySelectorAll(".pbtn").forEach(btn => {
        btn.style.display = 'none';
    });

    document.getElementById("ntask").focus();

    const getprior = showBtn(inputBox);

    inputBox.querySelector('.confirmBtn').addEventListener("click", function () {
        const prior = getprior();
        createCard(inputBox, prior);
    });

    inputBox.querySelector('.cancelBtn').addEventListener("click", function () {
        cancelCard(inputBox);
    });

    document.getElementById("ntask").addEventListener("keydown", function (e) {
        const prior = getprior();
        if (e.key === 'Enter') {
            createCard(inputBox, prior)
        };
        if (e.key === 'Escape') {
            cancelCard(inputBox);
        };
    })
}

function createCard(inputBox, prior) {
    const taskName = document.querySelector("#ntask");
    const task = taskName.value
    const pri = prior.toLowerCase();

    if (task.trim() === "") {
        showToast('Please enter a task');
        return;
    }
    if (prior === "None") {
        showToast('Please select a priority')
        return;
    }
    else {
        const card = document.createElement('div');
        card.innerHTML = `
                        <div class="card td">
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
                </div>
    `;

        pcont1.appendChild(card);
        pcont1.insertBefore(card, inputBox);

        inputBox.remove();
        addBtn.style.display = 'block';
    }

}

function cancelCard(inputBox) {
    inputBox.remove();
    addBtn.style.display = 'block';
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