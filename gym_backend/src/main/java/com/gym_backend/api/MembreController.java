package com.gym_backend.api;

import com.gym_backend.models.Membre;
import com.gym_backend.services.MembreService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("api/v1/membres")
@CrossOrigin(origins = "http://localhost:3000")
public class MembreController {
    @Autowired
    private MembreService membreService;

    @GetMapping("all")
    private List<Membre> afficher(){

        return membreService.findAll();
    }

    @PostMapping("save")
    private ResponseEntity<String> ajouter(@RequestBody Membre membre){
        membreService.addMembre(membre);
        return new ResponseEntity<>("Membre Ajouté", HttpStatus.CREATED);
    }
}
