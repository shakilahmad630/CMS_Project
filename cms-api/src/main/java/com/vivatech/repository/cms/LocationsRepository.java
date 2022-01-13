package com.vivatech.repository.cms;

import com.vivatech.model.cms.Locations;
// import com.vivatech.model.User;

import org.springframework.data.repository.CrudRepository;

// import com.vivatech.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface LocationsRepository extends CrudRepository<Locations, Integer> {

  Locations findByName(String location);

}
