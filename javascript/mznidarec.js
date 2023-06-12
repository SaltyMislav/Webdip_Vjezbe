window.onload = function () {
  let naslov = document.title;
  switch (naslov) {
    case "Obrazac":
      popunjavanjeObrasca();
      postavljenjeGumbaDalje();
      checkboxEventListener();
      provjeraSadrzajaEvent();
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

function checkboxEventListener() {
  var checkboxes = document.querySelectorAll("input[type=checkbox]");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      checkIfAnyCheckboxSelected(checkboxes);
    });
  });
}

function checkIfAnyCheckboxSelected(checkboxes) {
  var atLeastOneSelected = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  );
  if (!atLeastOneSelected) {
    for (let index = 0; index < checkboxes.length; index++) {
      checkboxes[index].nextElementSibling.classList.add("greskaCheckbox");
    }
    document.querySelector(".dalje").disabled = true;
  } else {
    for (let index = 0; index < checkboxes.length; index++) {
      checkboxes[index].nextElementSibling.classList.remove("greskaCheckbox");
    }
    document.querySelector(".dalje").disabled = false;
  }
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
      bojanjeCheckboxa(provjera, input);
      break;
    case 5:
      var input = document.getElementById('sadrzaj');
      var provjera = provjeraSadrzaja(input);
      bojanjePolja(provjera, input);
      break;
    case 6:
      var input = document.getElementById('prilog');
      input.parentElement.parentElement.nextElementSibling.style.visibility = 'visible';
      brojPolja++;
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

  if (selectedCategories.length < 1) {
    return false;
  } else {
    return true;
  }
}

function bojanjeCheckboxa(vrijednost, input) {
  if (!vrijednost) {
    for (let index = 0; index < input.length; index++) {
      input[index].nextElementSibling.classList.add("greskaCheckbox");
    }
    return;
  }

  for (let index = 0; index < input.length; index++) {
    input[index].nextElementSibling.classList.remove("greskaCheckbox");
  }

  brojPolja++;
  input[0].parentElement.parentElement.parentElement.parentElement.children[
    brojPolja
  ].style.visibility = "visible";
}

function provjeraSadrzajaEvent() {
  var input = document.getElementById("sadrzaj");
  input.addEventListener("blur", function () {
    var text = this.value;

    if (text.length < 50) {
      input.classList.add("greska");
      return;
    }

    var cleanedText = "";
    var isTag = false;

    for (var i = 0; i < text.length; i++) {
      if (text[i] === "<") {
        isTag = true;
      }
      if (text[i] === ">") {
        isTag = true;
      }
      if (!isTag) {
        cleanedText += text[i];
      }
      isTag = false;
    }
    if (cleanedText.length !== text.length) {
      alert("HTML oznake nisu dozvoljene.");
      this.value = cleanedText;
    }
    if (cleanedText.length < 50) {
      input.classList.add("greska");
    }
    else {
      input.classList.remove("greska");
    }
  });
}

function provjeraSadrzaja (input) {
  var text = input.value;

    if (text.length < 50) {
      return false;
    }

    var cleanedText = "";
    var isTag = false;

    for (var i = 0; i < text.length; i++) {
      if (text[i] === "<") {
        isTag = true;
      }
      if (text[i] === ">") {
        isTag = true;
      }
      if (!isTag) {
        cleanedText += text[i];
      }
      isTag = false;
    }
    if (cleanedText.length !== text.length) {
      alert("HTML oznake nisu dozvoljene.");
      input.value = cleanedText;
    }
    if (cleanedText.length < 50) {
      return false;
    }
    return true;
}