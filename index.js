const addBtn = document.querySelector(".addBtn");
const cardscont = document.querySelector(".container-cards");
const td = document.querySelector(".td");
const inputBtn = document.querySelector(".inpBtns");


addBtn.addEventListener("click", function () {
    showinput();
});


function showinput() {
    addBtn.style.display = 'none';
    const inputBox = document.createElement('div');
    inputBox.classList.add('td');
    inputBox.innerHTML = `
                <div class="td">
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

    cardscont.appendChild(inputBox);

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

    //inputBox.querySelector(".unknown").addEventListener("click", function () {
    //    showBtn(inputBox);
    //});

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
        card.classList.add('td');
        card.innerHTML = `
    <div class="card td">
        <p class="card-title">${task}</p>
        <span class="priority ${pri}">${prior}</span>
    </div>
    `;

        cardscont.insertBefore(card, inputBox);

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