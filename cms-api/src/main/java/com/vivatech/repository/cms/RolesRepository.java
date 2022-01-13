package com.vivatech.repository.cms;

import java.util.List;

import com.vivatech.model.cms.Roles;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface RolesRepository extends CrudRepository<Roles, Integer> {

  @Query(value = "SELECT roleid FROM roles where loweredrolename = ?1", nativeQuery = true)
  String getRoleIDFromRoleName(String rolename);


  List<Roles> findByRolename(String rolename);

}
