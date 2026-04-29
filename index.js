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
    inputBox.classList.add('card,td');
    inputBox.innerHTML = `
                <div class="td">
                    <input type="text" placeholder="New Task..." class="card-title newTsk" id="ntask" />
                    <div class="inpBtns">
                        <button class="confirmBtn nbtn">Confirm</button>
                        <button class="cancelBtn nbtn">Cancel</button>
                    </div>
                    <div class="divi"></div>
                    <button class="priority unknown" id="unkBtn">...</button>
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


    inputBox.querySelector('.confirmBtn').addEventListener("click", function () {
        createCard(inputBox);
    });

    inputBox.querySelector('.cancelBtn').addEventListener("click", function () {
        cancelCard(inputBox);
    });

    inputBox.querySelector(".unknown").addEventListener("click", function () {
        showBtn(inputBox);
    });

    document.getElementById("ntask").addEventListener("keydown", function (e) {
        if (e.key === 'Enter') {
            createCard(inputBox)
        };
        if (e.key === 'Escape') {
            cancelCard(inputBox);
        };
    })
}

function createCard(inputBox) {
    const taskName = document.getElementById("ntask");
    const task = taskName.value

    if (task.trim() === "") {
        window.alert("Please enter a Task!");
        return;
    }
    else {
        const card = document.createElement('div');
        card.classList.add('card,td');
        card.innerHTML = `
    <div class="card td">
        <p class="card-title">${task}</p>
        <span class="priority Unkown">Unknown</span>
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

async function showBtn(inputBox) {
    const unknown = await inputBox.querySelector(".unknown");
    const low = await inputBox.querySelector(".pbtn.low");
    const med = await inputBox.querySelector(".pbtn.medium");
    const high = await inputBox.querySelector(".pbtn.high");
    const alls = await inputBox.querySelectorAll(".pbtn");
    let prior = "";
    unknown.style.display = 'none';

    alls.forEach(all => {
        all.style.display = 'inline-block';

    });

    low.addEventListener("click", () => {
        if (med.style.display && high.style.display === 'inline-block') {
            med.style.display = 'none';
            high.style.display = 'none';
            let prior = low;
        }
        else {
            med.style.display = 'inline-block';
            high.style.display = 'inline-block';
        };
    });

    med.addEventListener("click", () => {
        if (low.style.display && high.style.display === 'inline-block') {
            low.style.display = 'none';
            high.style.display = 'none';
            let prior = med;
        }
        else {
            low.style.display = 'inline-block';
            high.style.display = 'inline-block';
        };
    });

    high.addEventListener("click", () => {
        if (low.style.display && med.style.display === 'inline-block') {
            low.style.display = 'none';
            med.style.display = 'none';
            let prior = high;
        }
        else {
            med.style.display = 'inline-block';
            low.style.display = 'inline-block';
        };
    });

    return prior;
}