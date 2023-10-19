package com.gym_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Membre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_membre;

    private String nom;

    private String prenom;

    private int telephone;

    private String statut;

    private String date_inscription;

    private String date_update;

    private String state;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "faire_paiement",
            joinColumns = { @JoinColumn(name = "id_membre") },
            inverseJoinColumns = { @JoinColumn(name = "id_paiement") }
    )
    Set<Paiements> paiementsSet = new HashSet<>();
}
