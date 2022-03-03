package dev.ismaellopezdev.springboot.repository;

import dev.ismaellopezdev.springboot.entities.Supplier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends CrudRepository<Supplier, Long> {
}
