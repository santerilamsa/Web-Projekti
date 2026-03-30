const pelit = [
    { nimi: "Peli 1 (Santeri)", avain: "peli1_Santeri", max: 10 },
    { nimi: "Peli 2", avain: "peli2", max: 10 },
    { nimi: "Peli 3", avain: "peli3", max: 5 }
];

let yhteispisteet = 0;
let maksimipisteet = 0;
const lista = document.getElementById("pisteLista");

function paivitaPisteet() {
    lista.innerHTML = '';
    yhteispisteet = 0;
    maksimipisteet = 0;

    pelit.forEach(peli => {
        const pisteet = parseInt(localStorage.getItem(peli.avain)) || 0;

        yhteispisteet += pisteet;
        maksimipisteet += peli.max;

        const li = document.createElement("li");
        li.innerHTML = `${peli.nimi}: ${pisteet} / ${peli.max}`;
        lista.appendChild(li);
    });

    document.getElementById("kokonaisPisteet").textContent =
        `Yhteensä: ${yhteispisteet} / ${maksimipisteet}`;
}

function tyhjennaPisteet() {
    pelit.forEach(peli => {
        localStorage.removeItem(peli.avain);
    });

    paivitaPisteet();
}

paivitaPisteet();