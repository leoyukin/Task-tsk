const addBtn = document.querySelector(".addBtn");
const cardscont = document.querySelector(".container-cards");

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
                    <button class="priority Unknown">Unknown</button>
                </div>
        `;

    cardscont.appendChild(inputBox);

    document.getElementById("ntask").focus();

    inputBox.querySelector('.confirmBtn').addEventListener("click", function () {
        createCard(inputBox);
    });

    inputBox.querySelector('.cancelBtn').addEventListener("click", function () {
        cancelCard(inputBox);
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
