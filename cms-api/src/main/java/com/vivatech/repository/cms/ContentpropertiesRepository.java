package com.vivatech.repository.cms;

// import java.util.List;
import java.util.Optional;

import com.vivatech.model.cms.Contentproperties;

import org.springframework.data.repository.CrudRepository;

// import com.vivatech.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ContentpropertiesRepository extends CrudRepository<Contentproperties, String> {

  Optional<Contentproperties> findById(String id);

}
