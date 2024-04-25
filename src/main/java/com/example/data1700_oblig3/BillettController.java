package com.example.data1700_oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillettController{

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagreBillett")
    public Billett lagreBillett(Billett innBillett){
        return rep.lagreBillett(innBillett);
    }

    @GetMapping("/hentBillett")
    public List<Billett> hentBillett(){
        return rep.hentBilletter();
    }

    @GetMapping("/slettBilletter")
    public void slett(){
       rep.slett();
    }
}