package com.vivatech.repository.cms;

import com.vivatech.model.cms.Contenttypes;
// import com.vivatech.model.Location;
// import com.vivatech.model.User;

import org.springframework.data.repository.CrudRepository;

// import com.vivatech.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ContenttypesRepository extends CrudRepository<Contenttypes, String> {

  Contenttypes findByType(String type);

}
