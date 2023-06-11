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
  const input2 = document.querySelector(".drugiElement");
  const input3 = document.querySelector(".treciElement");
  const input4 = document.querySelector(".cetvertiElement");
  const input5 = document.querySelector(".petiElement");
  const input6 = document.querySelector(".sestiElement");
  const inputDodatniElementi = document.querySelector(".drugi");

  input2.style.visibility = "hidden";
  input3.style.visibility = "hidden";
  input4.style.visibility = "hidden";
  input5.style.visibility = "hidden";
  input6.style.visibility = "hidden";
  inputDodatniElementi.style.visibility = "hidden";
}

function postavljenjeGumbaDalje() {
  document
    .querySelector(".dalje")
    .addEventListener("click", () => provjeraPolja());
}

function provjeraPolja() {
  switch (brojPolja) {
    case 1:
      var input = document.getElementById("naslov");
      var provjera = provjeraNaslova(input);
      bojanjePolja(provjera, input);
      break;
    case 2:
      var input = document.getElementById("posiljatelj");
      var provjera = provjeraMaila(input);
      bojanjePolja(provjera, input);
      break;
    case 3:
      var input = document.getElementById("primatelj");
      var provjera = provjeraMaila(input);
      bojanjePolja(provjera, input);
      break;
    case 4:
      var input = document.getElementsByName("poruka");
      var provjera = provjeraCheckboxa(input);
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
}

function provjeraNaslova(input) {
  const inputValue = input.value;
  var zabranjeniZnakovi = ['"', "'", "%", "+", "-"];
  var greska = false;

  for (let index = 0; index < inputValue.length; index++) {
    if (zabranjeniZnakovi.includes(inputValue[index])) {
      greska = true;
      break;
    }
  }

  if (!greska) {
    return true;
  }
  return false;
}

function bojanjePolja(vrijednost, input) {
  if (!vrijednost) {
    input.classList.add("greska");
    return;
  }
  input.classList.remove("greska");
  brojPolja++;
  input.parentElement.parentElement.children[brojPolja].style.visibility =
    "visible";
}

function provjeraMaila(email) {
  var emailValue = email.value;

  var user = "";
  var domain = "";
  var domainType = "";

  var atIndex = emailValue.indexOf("@");
  var dotIndex = emailValue.lastIndexOf(".");

  if (atIndex > 0 && dotIndex > atIndex) {
    user = emailValue.slice(0, atIndex);
    domain = emailValue.slice(atIndex + 1, dotIndex);
    domainType = emailValue.slice(dotIndex + 1);
  }

  var allowedUserSpecialChars = [".", "_", "-", "+"];
  var allowedDomainSpecialChars = [".", "-"];
  var allowedDomainTypes = ["com", "hr", "info"];

  var userValid =
    user.length <= 64 &&
    user.length > 0 &&
    !allowedUserSpecialChars.includes(user[0]) &&
    !allowedUserSpecialChars.includes(user[user.length - 1]);
  var domainValid =
    domain.length <= 253 &&
    domain.length > 0 &&
    !allowedDomainSpecialChars.includes(domain[0]) &&
    !allowedDomainSpecialChars.includes(domain[domain.length - 1]);
  var domainTypeValid = allowedDomainTypes.includes(domainType);

  if (userValid && domainValid && domainTypeValid) {
    return true;
  } else {
    return false;
  }
}

function provjeraCheckboxa(checkboxes) {
  var selectedCategories = [];
  
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedCategories.push(checkboxes[i].id);
    }
  }

  console.log(selectedCategories);
  if (selectedCategories.length < 1) {
    return false;
  } else {
    return true;
  }
}

function bojanjeCheckboxa(vrijednost, input) {
  if (!vrijednost) {
    for (let index = 0; index < input.length; index++) {
      input[index].classList.add("greska");
    }
    return;
  }

  for (let index = 0; index < input.length; index++) {
    input[index].classList.remove("greska");
  }

  brojPolja++;
  input.parentElement.parentElement.children[brojPolja].style.visibility =
    "visible";
}
