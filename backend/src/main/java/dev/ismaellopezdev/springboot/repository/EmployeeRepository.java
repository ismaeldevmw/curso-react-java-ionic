package dev.ismaellopezdev.springboot.repository;

import dev.ismaellopezdev.springboot.entities.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}
