// Bookmarklet for  UmaMusume Wiki of Gamewith
// javascript:void
(function () {
    let [cardName, cardType, cardRank] = document.querySelector("._main").textContent.replace(/[\(\)]/g, "/").split("/");
    let umaChoiceTables = document.querySelectorAll(".uma_choice_table");
    let rows = Array.from(umaChoiceTables).map(umaChoice => {
        let row = [];
        row.push(cardType);
        row.push(cardName);
        row.push(cardRank);
        row.push(umaChoice.previousElementSibling.textContent);
        umaChoice.querySelectorAll("table > tbody > tr").forEach(tr => {
            row.push(tr.querySelector("th").textContent);
            row.push(`"${tr.querySelector("td").innerHTML.replace(/<br>/g, "\n")}"`);
        });
        return row;
    });
    let message = "";
    for (let row of rows) {
        message += row.join("\t") + "\n";
    }
    console.log(message);
})();
