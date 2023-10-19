package com.gym_backend.repository;

import com.gym_backend.models.Membre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface MembreRepository extends JpaRepository<Membre, Long> {

    Optional<Membre> findByNom(String name);

    Optional<Membre> findByStatut(String statut);

}
