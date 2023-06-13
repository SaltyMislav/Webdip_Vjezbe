$(document).ready(function () {
  let naslov = $(document).find("title").text();
  console.log(naslov);
  console.log($(location).attr("host"));
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

function podnozje() {
  var statistika = Cookies.getJSON("statistika") || [];

  var updateVisitInfo = function (mode) {
    var pageName = $(document).find("title").text();
    var pageInfo = statistika.find(function (info) {
      return info.pageName === pageName;
    });

    if (mode === "bez prikupljanja") {
      // Ako je bez prikupljanja podataka, izbriši cijeli kolačić
      Cookies.remove("statistika", { path: "/" });
      statistika = [];
    } else if (mode === "osnovno") {
      // Ako je osnovno, postavi ili ažuriraj informacije o trenutnoj stranici
      if (pageInfo) {
        // Ako već postoji informacija o stranici, ažuriraj je
        pageInfo.lastVisit = new Date();
        pageInfo.visitCount += 1;
      } else {
        // Ako ne postoji informacija o stranici, stvori je
        pageInfo = {
          pageName: pageName,
          lastVisit: new Date(),
          visitCount: 1,
        };
        statistika.push(pageInfo);
      }

      // Ažuriraj kolačić (postavi ga za korijenski direktorij i postavi rok trajanja na 1 godinu)
      Cookies.set("statistika", statistika, { expires: 365, path: "/" });
    }
  };

  // Postavi vrijednost izbornika na temelju postojanja kolačića
  if (statistika.length > 0) {
    $("#podatci").val("osnovno");
  } else {
    $("#podatci").val("bez prikupljanja");
  }

  // Ažuriraj informacije o posjeti na temelju trenutno odabrane opcije
  updateVisitInfo($("#podatci").val());

  // Ažuriraj informacije o posjeti kad se odabir promijeni
  $("#podatci").change(function () {
    updateVisitInfo($(this).val());
  });
}

function pokretanjeFormi() {
  $(
    "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
  ).prop("disabled", true);
  $("#emailRegistracija").keyup(function () {
    var email = $(this).val();
    console.log(email);
    if (email.trim() == "" || email == null) {
      $(
        "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
      ).prop("disabled", true);
    } else {
      $.getJSON("../json/users.json", function (data) {
        var user = data.find(function (user) {
          return user.email === email;
        });
        if (!user) {
          // Email ne postoji, otključaj polja
          $(
            "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
          ).prop("disabled", false);
        } else {
          $(
            "#imePrezimeRegistracija, #musko, #zensko, #ostalo, #lozinkaRegistracija, #potvrdaLozinkeRegistracija"
          ).prop("disabled", true);
        }
      });
    }
  });

  // Polje lozinka
  $("#lozinkaRegistracija").blur(function () {
    var password = $(this).val();
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)(?!^[=*\/%])(?!.*[=*\/%]$).{15,25}$/;
    if (!passwordRegex.test(password)) {
      alert("Lozinka ne zadovoljava uvjete.");
    }
  });

  // Kod slanja obrasca
  $("#submitRegistracija").click(function (e) {
    var password = $("#lozinkaRegistracija").val();
    var confirmPassword = $("#potvrdaLozinkeRegistracija").val();
    if (password !== confirmPassword) {
      alert("Lozinka i ponovljena lozinka nisu iste.");
      e.preventDefault(); // Zaustavi slanje obrasca
    } else {
      // Sve provjere su prošle, možete nastaviti s obradom obrasca
    }
  });

  $("#lozinkaPrijava").blur(function () {
    // Izlazak iz polja emaila
    var email = $("#emailPrijava").val();
    var password = $(this).val();

    // Provjera postoji li korisnik u kolačiću
    var prijavaCookie = getCookie("prijava");

    if (prijavaCookie == "") {
      // Slanje AJAX zahtjeva ako kolačić ne postoji
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
            alert("Korisnik nije pronađen");
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

    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();

    // Provjera postoji li korisnik u kolačiću
    var prijavaCookie = getCookie("prijava");

    if (prijavaCookie == "") {
      // Slanje AJAX zahtjeva ako kolačić ne postoji
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
            alert("Neispravni podaci");
          } else {
            alert("Podaci su ispravni");
            // ovdje možete preusmjeriti korisnika ili učiniti nešto slično
          }
        },
      });
    }
  });

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
