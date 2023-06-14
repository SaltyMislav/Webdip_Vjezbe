$(document).ready(function () {
  let naslov = $(document).find("title").text();
  switch (naslov) {
    case "Početna stranica":
      zaglavlje();
      podnozje();
      break;
    case "Obrazac":
      zaglavljeObrasci();
      podnozje();
      break;
    case "Autentikacija":
      zaglavljeObrasci();
      pokretanjeFormi();
      podnozje();
      break;
    case "Multimedija":
      zaglavljeOstalo();
      podnozje();
      break;
    case "Popis":
      zaglavljeOstalo();
      generiranjeTablice();
      podnozje();
      break;
    case "O autoru":
      zaglavlje();
      podnozje();
      break;
    case "Era model":
      zaglavlje();
      podnozje();
      break;
    case "Navigacijski dijagram":
      zaglavlje();
      podnozje();
      break;
  }
});

var greska = "";

function zaglavlje() {
  var keywords = {};

  $.ajax({
    url: "json/search.json",
    datatype: "json",
    success: function (data) {
      keywords = data;
      $("#search").autocomplete({
        source: Object.keys(keywords),
        select: function (event, ui) {
          $(this).val(ui.item.value);
          $("#go").prop("disabled", false);
        },
      });
    },
    error: function (error) {
      console.error("Greška prilikom učitavanja search.json", error);
    },
  });

  $("#go").on("click", function () {
    var keyword = $("#search").val();
    if (keyword in keywords) {
      $(location).attr(
        "href",
        window.location.origin.concat("/", keywords[keyword])
      );
    }
  });
}

function zaglavljeObrasci() {
  var keywords = {};

  $.ajax({
    url: "../json/search.json",
    datatype: "json",
    success: function (data) {
      keywords = data;
      $("#search").autocomplete({
        source: Object.keys(keywords),
        select: function (event, ui) {
          $(this).val(ui.item.value);
          $("#go").prop("disabled", false);
        },
      });
    },
    error: function (error) {
      console.error("Greška prilikom učitavanja search.json", error);
    },
  });

  $("#go").on("click", function () {
    var keyword = $("#search").val();
    if (keyword in keywords) {
      $(location).attr(
        "href",
        window.location.origin.concat("/", keywords[keyword])
      );
    }
  });
}

function zaglavljeOstalo() {
  var keywords = {};

  $.ajax({
    url: "../json/search.json",
    datatype: "json",
    success: function (data) {
      keywords = data;
      $("#search").autocomplete({
        source: Object.keys(keywords),
        select: function (event, ui) {
          $(this).val(ui.item.value);
          $("#go").prop("disabled", false);
        },
      });
    },
    error: function (error) {
      console.error("Greška prilikom učitavanja search.json", error);
    },
  });

  $("#go").on("click", function () {
    var keyword = $("#search").val();
    if (keyword in keywords) {
      $(location).attr(
        "href",
        window.location.origin.concat("/", keywords[keyword])
      );
    }
  });
}

// function podnozje() {
//   var statistika = Cookies.getJSON("statistika") || [];

//   var updateVisitInfo = function (mode) {
//     var pageName = $(document).find("title").text();
//     var pageInfo = statistika.find(function (info) {
//       return info.pageName === pageName;
//     });

//     if (mode === "bez prikupljanja") {
//       // Ako je bez prikupljanja podataka, izbriši cijeli kolačić
//       Cookies.remove("statistika", { path: "/" });
//       statistika = [];
//     } else if (mode === "osnovno") {
//       // Ako je osnovno, postavi ili ažuriraj informacije o trenutnoj stranici
//       if (pageInfo) {
//         // Ako već postoji informacija o stranici, ažuriraj je
//         pageInfo.lastVisit = new Date();
//         pageInfo.visitCount += 1;
//       } else {
//         // Ako ne postoji informacija o stranici, stvori je
//         pageInfo = {
//           pageName: pageName,
//           lastVisit: new Date(),
//           visitCount: 1,
//         };
//         statistika.push(pageInfo);
//       }

//       // Ažuriraj kolačić (postavi ga za korijenski direktorij i postavi rok trajanja na 1 godinu)
//       Cookies.set("statistika", statistika, { expires: 365, path: "/" });
//     }
//   };

//   // Postavi vrijednost izbornika na temelju postojanja kolačića
//   if (statistika.length > 0) {
//     $("#podatci").val("osnovno");
//   } else {
//     $("#podatci").val("bez prikupljanja");
//   }

//   // Ažuriraj informacije o posjeti na temelju trenutno odabrane opcije
//   updateVisitInfo($("#podatci").val());

//   // Ažuriraj informacije o posjeti kad se odabir promijeni
//   $("#podatci").change(function () {
//     updateVisitInfo($(this).val());
//   });
// }

function podnozje() {
  var statistikaStr = getCookie("statistika");

  var updateVisitInfo = function (mode) {
    var path = $(document).find("title").text();
    var statistika;

    if (mode === "bez prikupljanja") deleteCookie("statistika");
    else if (mode === "osnovno") {
      if (statistikaStr) {
        statistika = JSON.parse(statistikaStr);
        if (statistika[path]) {
          statistika[path].count++;
          statistika[path].lastVisit = new Date().toISOString();
        } else {
          statistika[path] = { count: 1, lastVisit: new Date().toISOString() };
        }
      } else {
        statistika = {};
        statistika[path] = { count: 1, lastVisit: new Date().toISOString() };
      }
      setCookie("statistika", JSON.stringify(statistika), 7);
    }
  };

  if (statistikaStr == null) {
    $("#podatci").val("bez prikupljanja");
  } else {
    $("#podatci").val("osnovno");
  }

  if ($("#podatci").val() === "osnovno") {
    updateVisitInfo("osnovno");
  }

  $("#podatci").change(function () {
    updateVisitInfo($(this).val());
  });
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 25 * 60 * 1000);
    expires = ";Expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  if (ca != null)
    for (let index = 0; index < ca.length; index++) {
      var c = ca[index];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function pokretanjeFormi() {
  var greskaRegistracija = [];
  var greskaPrijava = [];
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  $(
    "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
  ).prop("disabled", true);
  $("#emailRegistracija").keyup(function () {
    var email = $(this).val();
    $("#emailRegistracija").removeClass("greska");
    obrisiGreske("Registracija", greskaRegistracija);
    greskaRegistracija = [];
    if (!regex.test(email)) {
      $(
        "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
      ).prop("disabled", true);
      $("#emailRegistracija").addClass("greska");
      greskaRegistracija.push(["Email je krivo unesen!"]);
      prikaziGreske("Registracija", greskaRegistracija);
    } else {
      $.getJSON("../json/users.json", function (data) {
        var user = data.find(function (user) {
          return user.email === email;
        });
        if (!user) {
          $(
            "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
          ).prop("disabled", false);
          $("#emailRegistracija").removeClass("greska");
          obrisiGreske("Registracija", greskaRegistracija);
          greskaRegistracija = [];
        } else {
          $(
            "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
          ).prop("disabled", true);
          greskaRegistracija.push(["Korisnik s tim mailom postoji!"]);
          prikaziGreske("Registracija", greskaRegistracija);
        }
      });
    }
  });

  $("#lozinkaRegistracija").focus(function () {
    $("#lozinkaRegistracija").removeClass("greska");
    greskaRegistracija = [];
  });

  // Polje lozinka
  $("#lozinkaRegistracija").blur(function () {
    obrisiGreske("Registracija", greskaRegistracija);
    var password = $(this).val();
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)(?!^[=*\/%])(?!.*[=*\/%]$).{15,25}$/;
    if (!passwordRegex.test(password)) {
      $("#lozinkaRegistracija").addClass("greska");
      greskaRegistracija.push([
        "Lozinka ne sadrži 1 veliko i 1 malo slovo, 1 broj ili ima razmak, te nije između 15 i 25 znakova",
      ]);
      prikaziGreske("Registracija", greskaRegistracija);
    }
  });

  // Kod slanja obrasca
  $("#submitRegistracija").click(function (e) {
    obrisiGreske("Registracija", greskaRegistracija);
    greskaRegistracija = [];
    var formData = {
      nameSurname: $("#imePrezimeRegistracija").val(),
      email: $("#emailRegistracija").val(),
      password: $("#lozinkaRegistracija").val(),
      confirmPassword: $("#potvrdaLozinkeRegistracija").val(),
      gender: $(".spol:checked").val(),
    };
    if (formData.password !== formData.confirmPassword) {
      $("#potvrdaLozinkeRegistracija").addClass("greska");
      greskaRegistracija.push(["Lozinke se ne podudaraju"]);
      prikaziGreske("Registracija", greskaRegistracija);
      e.preventDefault();
    } else {
      registracijaPrijavaCookie("Registracija", formData);
    }
  });

  $("#lozinkaPrijava").blur(function () {
    var email = $("#emailPrijava").val();
    var password = $(this).val();

    obrisiGreske("Prijava", greskaPrijava);
    greskaPrijava = [];

    var prijavaCookie = getCookie("prijava");

    if (prijavaCookie == null) {
      $.ajax({
        url: "https://barka.foi.hr/WebDiP/2022/materijali/zadace/dz3/users.php",
        type: "GET",
        data: {
          email: email,
          password: password,
        },
        success: function (data) {
          var found = $(data).find("found").text();
          if (found == "0") {
            $("#emailPrijava").addClass("greska");
            $("#lozinkaPrijava").addClass("greska");
            greskaPrijava.push(["Korisnik ne postoji!"]);
            prikaziGreske("Prijava", greskaPrijava);
          } else {
            alert("Korisnik pronađen: " + found);
          }
        },
      });
    }
  });

  $("#submitPrijava").click(function (e) {
    // Klik na gumb za slanje
    e.preventDefault();
    obrisiGreske("Prijava", greskaPrijava);
    greskaPrijava = [];

    var formData = {
      email: $("#emailPrijava").val(),
      password: $("#lozinkaPrijava").val(),
    };

    var prijavaCookie = getCookie("prijava");

    if (prijavaCookie == null) {
      // Slanje AJAX zahtjeva ako kolačić ne postoji
      $.ajax({
        url: "https://barka.foi.hr/WebDiP/2022/materijali/zadace/dz3/users.php",
        type: "GET",
        data: formData,
        success: function (data) {
          var found = $(data).find("found").text();
          if (found == "0") {
            greskaPrijava.push(["Korisnik ne postoji!"]);
            prikaziGreske("Prijava", greskaPrijava);
          } else {
            registracijaPrijavaCookie("Prijava", formData);
          }
        },
      });
    }
  });
}

function registracijaPrijavaCookie(forma, formData) {
  var registracijaPrijava = getCookie("prijava");
  var cookie = {};
  console.log(formData);

  if (registracijaPrijava) {
    cookie = JSON.parse(registracijaPrijava);
    if (forma == "Registracija") {
      if (cookie[forma]) {
        cookie[forma].ImePrezime = formData.nameSurname;
        cookie[forma].Email = formData.email;
        cookie[forma].Spol = formData.gender;
        cookie[forma].Password = formData.Password;
        cookie[forma].ConfirmPassword = formData.confirmPassword;
      } else {
        cookie[forma] = {
          ImePrezime: formData.nameSurname,
          Email: formData.email,
          Spol: formData.gender,
          Password: formData.password,
          ConfirmPassword: formData.confirmPassword,
        };
      }
    } else if (forma == "Prijava") {
      if (cookie[forma]) {
        cookie[forma].Email = formData.email;
        cookie[forma].Password = formData.password;
      } else {
        cookie[forma] = { Email: formData.email, Password: formData.password };
      }
    }
  } else {
    if (forma == "Registracija") {
      cookie[forma] = {
        ImePrezime: formData.nameSurname,
        Email: formData.email,
        Spol: formData.gender,
        Password: formData.password,
        ConfirmPassword: formData.confirmPassword,
      };
    } else if (forma == "Prijava") {
      cookie[forma] = { Email: formData.email, Password: formData.password };
    }
  }
  setCookie("prijava", JSON.stringify(cookie), 7);
}

function prikaziGreske(polje, greska) {
  if (polje === "Registracija") {
    $(".Registracija").removeClass("ispisUspjesnoRegistracija");
    $(".Registracija").addClass("ispisGreskeRegistracija");
    $(".Registracija").html("");
    $(".Registracija").show();

    for (let index = 0; index < greska.length; index++) {
      var errorMessage = greska[index];
      $(".Registracija").append("<p>" + errorMessage + "</p>");
    }
  } else if (polje === 'Prijava') {
    $(".Prijava").removeClass("ispisUspjesnoPrijava");
    $(".Prijava").addClass("ispisGreskePrijava");
    $(".Prijava").html("");
    $(".Prijava").show();
    for (let index = 0; index < greska.length; index++) {
      var errorMessage = greska[index];
      $(".Prijava").append("<p>" + errorMessage + "</p>");
    }
  }
}

function obrisiGreske(polje, greska) {
  if (polje === "Registracija") {
    $(".Registracija").addClass("ispisUspjesnoRegistracija");
    $(".Registracija").removeClass("ispisGreskeRegistracija");
    $(".Registracija").html("");
    $(".Registracija").hide();
  } else if (polje === 'Prijava') {
    $(".Prijava").addClass("ispisUspjesnoPrijava");
    $(".Prijava").removeClass("ispisGreskePrijava");
    $(".Prijava").html("");
    $(".Prijava").hide();
  }
}

function generiranjeTablice() {
  var tablica = "";
  htmlTablica = $("#tablica");
  $("#tablica").empty();
  tablica += "<caption>Email poruke</caption>";
  tablica +=
    "<thead><th>PorukaID</th><th>StatusID</th><th>Kategorije</th><th>Naslov</th><th>Pošiljatelj</th><th>Primatelj</th><th>Datum i vrijeme</th><th>Sadržaj</th><th>Prilog</th></thead>";
  tablica += '<tbody id="tableBody"></tbody>';

  htmlTablica.html(tablica);

  var registracijaPrijava = JSON.parse(getCookie("prijava"));
  var korisnik;

    var dohvatiPodatke = function (value) {
    var selectedCategory = value;
    $("#tableBody").empty();
    $.ajax({
      url: "../json/messages.json",
      type: "GET",
      data: {
        kategorije: selectedCategory,
        posiljatelj: korisnik,
        primatelj: korisnik,
      },
      dataType: "json",
      success: function (data) {
        var filteredMessages = data.filter(function (message) {
          var isteKategorije = message.kategorije.includes(selectedCategory);
          var istiPosiljatelj = message.posiljatelj === korisnik;
          var istiPrimatelj = message.primatelj === korisnik;

          return isteKategorije && (istiPosiljatelj || istiPrimatelj);
        });
        popuniTablicu(filteredMessages);
        $("#tablica").DataTable();
      },
    });
  };

  if (registracijaPrijava == null) {
    var row = $("<tr>").append(
      $('<td colspan = "9">').text(
        "Ne postoje podaci za prijavljenog korisnika!"
      )
    );
    $("#tableBody").append(row);
    $("#category-select").prop("disabled", true);
  } else {
    korisnik = registracijaPrijava.Prijava.Email;
    if ($("#category-select").val() == "1") {
      dohvatiPodatke("1");
    }
  }

  $("#category-select").change(function () {
    dohvatiPodatke($(this).val());
  });

  $("#tablica tbody").on("click", "tr", function () {

    redak = $(this).closest('tr');
    var vrijednostiArray = [];

    $(redak).find('td').each(function() {
      vrijednostiArray.push($(this).text());
    })

    var vrijednosti = Object.assign(
      {}, 
      {'PorukaID' : vrijednostiArray[0]},
      {'StanjeID' : vrijednostiArray[1]},
      {'Kategorije' : vrijednostiArray[2]},
      {'Naslov' : vrijednostiArray[3]},
      {'Posiljatelj': vrijednostiArray[4]},
      {'Primatelj': vrijednostiArray[5]},
      {'DatumVrijeme': vrijednostiArray[6]},
      {'Sadrzaj': vrijednostiArray[7]},
      {'Prilog': vrijednostiArray[8] == 'Nema priloga' ? null : vrijednostiArray[8]}
    );

    setCookie("popis", JSON.stringify(vrijednosti), 7);
    
    window.location.replace("../obrasci/obrazac.html");
  })
}

function popuniTablicu(poruke) {
  var row = "";

  if (poruke.length == 0) {
    var row = $("<tr>").append(
      $('<td colspan = "9">').text(
        "Ne postoje podaci za prijavljenog korisnika!"
      )
    );
    $("#tableBody").append(row);
  } else {
    $.each(poruke, function (i, item) {
      row = $("<tr>").append(
        $("<td>").text(item.id_poruke),
        $("<td>").text(item.id_status),
        $("<td>").text(item.kategorije.toString()),
        $("<td>").text(item.naslov),
        $("<td>").text(item.posiljatelj),
        $("<td>").text(item.primatelj),
        $("<td>").text(item.datum_vrijeme),
        $("<td>").text(item.sadrzaj),
        $("<td>").text(item.prilog ? item.prilog : "Nema priloga")
      );
      $("#tableBody").append(row);
    });
  }
}
