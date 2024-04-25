package com.example.data1700_oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;

    public Billett lagreBillett (Billett innBillett) {
        String sql = "INSERT INTO Billett (fornavn, etternavn, telefonnummer, epost, film, antallBilletter) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTelefonnummer(), innBillett.getEpost(),
                innBillett.getFilm(), innBillett.getAntallBilletter());
        System.out.println("Lagret");
        return innBillett;
    }

    public List<Billett> hentBilletter() {
        String sql = "SELECT * FROM Billett";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        System.out.println(alleBilletter.toString());
        return alleBilletter;
    }

    public void slett(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}