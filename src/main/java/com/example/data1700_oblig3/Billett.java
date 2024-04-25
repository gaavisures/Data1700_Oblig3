package com.example.data1700_oblig3;


public class Billett {
    private int id;
    private String film;
    private int antallBilletter;
    private String fornavn;
    private String etternavn;
    private String telefonnummer;
    private String epost;

    // Full konstruktør
    public Billett(int id, String film, int antallBilletter, String fornavn, String etternavn, String telefonnummer, String epost) {
        this.id= id;
        this.film = film;
        this.antallBilletter = antallBilletter;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnummer = telefonnummer;
        this.epost = epost;
    }

    // Tom konstruktør
    public Billett() {}

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }

    // Getters og setters
    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntallBilletter() {
        return antallBilletter;
    }

    public void setAntallBilletter(int antallBilletter) {
        this.antallBilletter = antallBilletter;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTelefonnummer() {
        return telefonnummer;
    }

    public void setTelefonnummer(String telefonnummer) {
        this.telefonnummer = telefonnummer;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }
    @Override
    public String toString() {
        return "Billett{" +
                "id=" + id +
                ", film='" + film + '\'' +
                ", antallBilletter=" + antallBilletter +
                ", fornavn='" + fornavn + '\'' +
                ", etternavn='" + etternavn + '\'' +
                ", telefonnummer='" + telefonnummer + '\'' +
                ", epost='" + epost + '\'' +
                '}';
    }
}
