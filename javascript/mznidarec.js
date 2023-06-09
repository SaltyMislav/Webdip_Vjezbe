window.onload = function () {
  let naslov = document.title;
  switch (naslov) {
    case "Obrazac":
      popunjavanjeObrasca();
      postavljenjeGumbaDalje();
      break;
  }
};

let brojPolja = 1;

function popunjavanjeObrasca() {
  const input2 = document.querySelector(".drugi_element");
  const input3 = document.querySelector(".treci_element");
  const input4 = document.querySelector(".cetverti_element");
  const input5 = document.querySelector(".peti_element");
  const input6 = document.querySelector(".sesti_element");
  const inputDodatniElementi = document.querySelector(".drugi");

  input2.style.visibility = "hidden";
  input3.style.visibility = "hidden";
  input4.style.visibility = "hidden";
  input5.style.visibility = "hidden";
  input6.style.visibility = "hidden";
  inputDodatniElementi.style.visibility = "hidden";
}

function postavljenjeGumbaDalje() {
  console.log("tui sam");
  document
    .querySelector(".dalje")
    .addEventListener("click", () => provjeraPolja());
}

function provjeraPolja() {
  switch (brojPolja) {
    case 1:
      provjeraNaslova();
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      document.querySelector(".dalje").disabled = true;
      break;
    default:
      document
        .querySelector(".dalje")
        .removeEventListener("click", () => provjeraPolja());
  }
  brojPolja++;
}
