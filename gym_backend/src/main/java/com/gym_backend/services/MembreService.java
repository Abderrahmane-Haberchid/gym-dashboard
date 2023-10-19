package com.gym_backend.services;

import com.gym_backend.models.Membre;
import com.gym_backend.repository.MembreRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.InstantSource;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class MembreService {
    @Autowired
    private MembreRepository membreRepository;
    public List<Membre> findAll(){

        return membreRepository.findAll();
    }
    public void addMembre(Membre newMembre){
        Membre membre = new Membre();
           membre.setNom(newMembre.getNom());
           membre.setPrenom(newMembre.getPrenom());
           membre.setTelephone(newMembre.getTelephone());
           membre.setStatut("Actif");
           membre.setDate_update("10/10/23");
           membre.setDate_inscription("10/10/23");
           membre.setState("Payé");
           membreRepository.save(membre);
    }
    public Optional<Membre> findByName(String name){
        return membreRepository.findByNom(name);
    }
    public Optional<Membre> findByStatut(String statut){
        return membreRepository.findByStatut(statut);
    }


}
