function kjop() {
    const billett = {
        film: $("#film").val(),
        antallBilletter: $("#antallBilletter").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnummer: $("#telefonnummer").val(),
        epost: $("#epost").val(),
    };

    let erValid = true;

    if (!validerAntallBilletter()) {
        erValid = false;
    }
    if (!validerFornavn()) {
        erValid = false;
    }
    if (!validerEtternavn()) {
        erValid = false;
    }
    if (!validerTelefonnummer()) {
        erValid = false;
    }
    if (!validerEpost()) {
        erValid = false;
    }

    if (erValid) {
        $.post("/lagreBillett", billett, function () {
            hentBillett();
        });

        clearFields();
    }
}

function clearFields() {
    $("#film").val("Velg film her");
    $("#antallBilletter").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnummer").val("");
    $("#epost").val("");
}

function hentBillett() {
    $.get("/hentBillett", function (billetter) {
        billetter.sort((a,b) => {
            const etterNavnA = a.etternavn;
            const etterNavnB = b.etternavn;
            return etterNavnA.localeCompare(etterNavnB);
        });
        formaterData(billetter);
    });
}

function formaterData(billetter) {
    let ut = "<table><tr><th>Film:</th><th>Antall billetter:</th><th>Fornavn:</th>" +
        "<th>Etternavn:</th><th>Telefonnummer:</th><th>Epost:</th></tr>";
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antallBilletter + "</td><td>" + billett.fornavn + "</td>" +
            "<td>" + billett.etternavn + "</td><td>" + billett.telefonnummer + "</td><td>" + billett.epost + "</td></tr>";
    }
    ut += "</table>";
    $("#billettene").html(ut);
}


function slett() {
    $.get("/slettBilletter", function () {
        hentBillett();
    });
    $("#billettene").html("Slett billetter");
}


    function validerAntallBilletter() {
        let antallBilletter = $("#antallBilletter").val();
        let antallFeil = $("#antallBilletterFeil");
        antallFeil.html("");
        if (antallBilletter === "") {
            antallFeil.html("Antall billetter må fylles ut.").css("color", "red");
            return false;
        } else if (isNaN(antallBilletter) || antallBilletter <= 0) {
            antallFeil.html("Antall billetter må være et positivt tall.").css("color", "red");
            return false;
        }
        return true;
    }

    function validerFornavn() {
        let fornavn = $("#fornavn").val();
        let fornavnFeil = $("#fornavnFeil");
        fornavnFeil.html("");
        if (fornavn === "") {
            fornavnFeil.html("Fornavn må fylles ut.").css("color", "red");
            return false;
        }
        return true;
    }

    function validerEtternavn() {
        let etternavn = $("#etternavn").val();
        let etternavnFeil = $("#etternavnFeil");
        etternavnFeil.html("");
        if (etternavn === "") {
            etternavnFeil.html("Etternavn må fylles ut.").css("color", "red");
            return false;
        }
        return true;
    }

    function validerTelefonnummer() {
        let telefonnummer = $("#telefonnummer").val();
        let telefonnummerFeil = $("#telefonnummerFeil");
        telefonnummerFeil.html("");
        let telefonRegEx = /^[0-9]+$/;
        if (!telefonRegEx.test(telefonnummer)) {
            telefonnummerFeil.html("Vennligst skriv inn en gyldig telefonnummer").css("color", "red");
            return false;
        }
        return true;
    }

    function validerEpost() {
        let epost = $("#epost").val();
        let epostFeil = $("#epostFeil");
        epostFeil.html("");
        let epostRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!epostRegEx.test(epost)) {
            epostFeil.html("Vennligst skriv inn en gyldig epostadresse.").css("color", "red");
            return false;
        }
        return true;
    }

    function velgFilm() {
        let valgtFilm = $("#film").val();
        if (valgtFilm === "Velg film her") {
            $("#feilmelding").html("Vennligst velg en film fra menyen.").css("color", "red");
            return false;
        } else {
            $("#feilmelding").html("");
        }
}


//Kilder: https://simenskriver.no/Javascript