window.onload = function () {
  const input1 = document.querySelector(".prvi_element");
  const input2 = document.querySelector(".drugi_element");
  const input3 = document.querySelector(".treci_element");
  const input4 = document.querySelector(".cetverti_element");
  const input5 = document.querySelector(".peti_element");
  const input6 = document.querySelector(".sesti_element");
  const inputDodatniElementi = document.querySelector(".drugi");

  const dalje = document.getElementsByClassName("dalje");

  console.log(input2);

  input2.style.visibility = "hidden";
  input3.style.visibility = "hidden";
  input4.style.visibility = "hidden";
  input5.style.visibility = "hidden";
  input6.style.visibility = "hidden";
  inputDodatniElementi.style.display = "none";
};
