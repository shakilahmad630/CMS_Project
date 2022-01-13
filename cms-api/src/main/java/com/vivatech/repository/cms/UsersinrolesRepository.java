package com.vivatech.repository.cms;

import java.util.List;

import com.vivatech.model.cms.Usersinroles;

import org.springframework.data.repository.CrudRepository;
import com.vivatech.model.cms.UserinrolesIdentity;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UsersinrolesRepository extends CrudRepository<Usersinroles, UserinrolesIdentity> {

  List<Usersinroles> findByUserinrolesIdentityUserid(String userid);

}
