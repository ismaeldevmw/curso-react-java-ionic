package dev.ismaellopezdev.springboot.services;

import dev.ismaellopezdev.springboot.entities.Supplier;

import java.util.List;

public interface ISupplierService {
    List<Supplier> getAll();

    Supplier getById(Long id);

    void remove(Long id);

    void save(Supplier supplier);
}
