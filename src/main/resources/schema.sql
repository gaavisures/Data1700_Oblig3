CREATE TABLE Billett
    (
        id INTEGER AUTO_INCREMENT NOT NULL,
        fornavn VARCHAR(255),
        etternavn VARCHAR(255),
        telefonnummer VARCHAR(255),
        epost VARCHAR(255),
        film  VARCHAR(255),
        antallBilletter INTEGER NOT NULL,
        PRIMARY KEY (id)
    );