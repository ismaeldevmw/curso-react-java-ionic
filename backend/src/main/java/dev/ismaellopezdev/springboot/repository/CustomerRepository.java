package dev.ismaellopezdev.springboot.repository;

import dev.ismaellopezdev.springboot.entities.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
