
document.addEventListener("DOMContentLoaded", e => {
    document.querySelector(".inputbox > input[type=text]").addEventListener("keyup", e => {
        applyFilter(e.target.value);
        updateEventCounter();
    });
    document.querySelector(".inputbox > button").addEventListener("click", e => {
        e.target.parentNode.querySelector("input[type=text]").value = "";
        applyFilter("");
        updateEventCounter();

    });
    initialize();
});

function initialize() {
    fetch("data/events.json")
    .then(response => response.json())
    .then(data => {
        initializeEventList(data);
    });
}

function initializeEventList(data) {
    /* clear event list */
    let eventListElement = document.querySelector(".event-list");
    const clone = eventListElement.cloneNode(false);
    eventListElement.parentNode.replaceChild(clone , eventListElement);
    eventListElement = document.querySelector(".event-list");

    data.forEach(event => {
        const eventElement = createEventElement(event);
        eventListElement.appendChild(eventElement);
    });
    updateEventCounter();
}

function createEventElement(event) {
    const eventElement = document.querySelector(".event-template > .event").cloneNode(true);
    eventElement.querySelector(".title").textContent = event.title;
    eventElement.querySelector(".card-type").textContent = event.card.type;
    eventElement.querySelector(".card-name").textContent = event.card.name;
    eventElement.querySelector(".card-rank").textContent = event.card.rank;
    let fullText = event.title;
    const tbody = eventElement.querySelector("table > tbody");
    event.options.forEach(option => {
        fullText += option.text;
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = option.text;
        tr.appendChild(th);
        const td = document.createElement("td");
        td.innerHTML = option.result.replace(/\s/g, "<br>");
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    eventElement.querySelector(".fulltext").textContent = fullText;
    return eventElement;
}

function applyFilter(query) {
    const patterns = query.replace(/[\s　]/g, " ").split(" ").map(word => new RegExp(word, "i"));
    const events = document.querySelectorAll(".event-list > .event");
    events.forEach(event => {
        const fullText = event.querySelector(".fulltext").textContent;
        let matched = patterns.some(pattern => pattern.test(fullText));
        if (matched) {
            event.classList.remove("hidden");
        } else {
            event.classList.add("hidden");
        }
    });
}

function updateEventCounter() {
    const eventList = document.querySelector(".event-list");
    const eventCount = eventList.querySelectorAll(".event").length;
    const visibleCount = eventCount - eventList.querySelectorAll(".event.hidden").length;
    const text = `(${visibleCount}/${eventCount})`; 
    document.querySelector(".event-counter").textContent = text;
}
