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
public class Paiements {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String date_paiement;
    @Column
    private Double prix;
    @Column
    private String type_abonnement;
    @Column
    private String type_paiement;

    @ManyToMany(mappedBy = "paiementsSet")
    Set<Membre> membreSet = new HashSet<>();
}
