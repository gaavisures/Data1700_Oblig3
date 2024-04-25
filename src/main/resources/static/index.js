function kjop() {
    const billett = {
        film: $("#film").val(),
        antallBilletter: $("#antallBilletter").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnummer: $("#telefonnummer").val(),
        epost: $("#epost").val(),
    };
    // for å sjekke senere om variablene er true
    let erValid = true;

    //sjekker om informasjonen som er skrevet i hver input er riktig
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

    //hvis alt er riktig, vil det bli skrevet ut informasjonen som er lagt inn
    if (erValid) {
        $.post("/lagreBillett", billett, function () {
            //viser alle billettene som er lagt inn
            hentBillett();
        });
        // tømmer feltene etter at informasjonen er kjøpt
        clearFields();
    }
}

//tømmer all informasjonen i inputfeltene etter at de har blitt kjøpt, for å kjøpe en ny billett
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
        // sorterer billettene som er lagt inn etter etternavn
        billetter.sort((a,b) => {
            const etterNavnA = a.etternavn;
            const etterNavnB = b.etternavn;
            return etterNavnA.localeCompare(etterNavnB);
        });
        formaterData(billetter);
    });
}

function formaterData(billetter) {
    //definerer en variabel som inneholder en html tabell
    let ut = "<table><tr><th>Film:</th><th>Antall billetter:</th><th>Fornavn:</th>" +
        "<th>Etternavn:</th><th>Telefonnummer:</th><th>Epost:</th></tr>";
    //går gjennom hver billett i 'billetter'-arrayen
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antallBilletter + "</td><td>" + billett.fornavn + "</td>" +
            "<td>" + billett.etternavn + "</td><td>" + billett.telefonnummer + "</td><td>" + billett.epost + "</td></tr>";
    }
    ut += "</table>";
    //Setter innholdet av ut-variabelen i et html-element med id-en "billettene"
    $("#billettene").html(ut);
}


//tømmer billettlisten
function slett() {
    $.get("/slettBilletter", function () {
        hentBillett();
    });
    $("#billettene").html("Slett billetter");
}


    function validerAntallBilletter() {
        let antallBilletter = $("#antallBilletter").val();
        //tømmer innholdet dersom det har vaert tidligere feilmeldinger
        let antallFeil = $("#antallBilletterFeil");
        antallFeil.html("");
        //sjekker om antallBilletter er lik en tom streng
        if (antallBilletter === "") {
            //dersom denne linjen er tom, kommer det opp "antall billetter..."
            antallFeil.html("Antall billetter må fylles ut.").css("color", "red");
            return false;
            //sjekker om antall billetter er et tall, dersom det ikke er det returneres
        } else if (isNaN(antallBilletter) || antallBilletter <= 0) {
            antallFeil.html("Antall billetter må være et positivt tall.").css("color", "red");
            return false;
        }
        //hvis ingen av de nevnte over er false, vil det returnere true som gir et gyldig resultat
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
        //tilpasset validering for telefonnummer
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
        //tilpasset validering på epost
        //kilde: https://www.tempmail.us.com/no/jquery/validering-av-e-postadresser-med-jquery
        let epostRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!epostRegEx.test(epost)) {
            epostFeil.html("Vennligst skriv inn en gyldig epostadresse.").css("color", "red");
            return false;
        }
        return true;
    }
    //rullegardinmeny
    function velgFilm() {
        let valgtFilm = $("#film").val();
        //sjekker rullegardinmenyen er tom
        //kilde: https://www.drschore.com/tilordne-en-skjult-verdi-fra-en-nedtrekksmeny-i-javascript/
        if (valgtFilm === "Velg film her") {
            $("#feilmelding").html("Vennligst velg en film fra menyen.").css("color", "red");
            return false;
        } else {
            //skjuler feilmeldingen dersom en verdi er valgt
            $("#feilmelding").html("");
        }
}


//Kilder: https://simenskriver.no/Javascript
