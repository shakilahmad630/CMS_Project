package com.vivatech.repository.cms;

// import com.vivatech.model.Contenttypes;
// import com.vivatech.model.Location;
// import com.vivatech.model.User;
import com.vivatech.model.cms.Languages;

import org.springframework.data.repository.CrudRepository;

// import com.vivatech.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface LanguagesRepository extends CrudRepository<Languages, Integer> {


  Languages findByLanguage(String language);
}
