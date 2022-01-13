package com.vivatech.repository.cms;

import com.vivatech.model.cms.Userassignroles;
import com.vivatech.model.cms.UserassignrolesIdentity;
import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// import com.vivatech.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserassignrolesRepository extends CrudRepository<Userassignroles, UserassignrolesIdentity> {

  @Query(value = "SELECT b.type as contenttype, c.name as location, operation, b.id as contenttypeid, c.id FROM userassignroles as a, contenttypes as b, locations as c where a.contenttypeid = b.id and a.locationid = c.id and a.userid = ?1", nativeQuery = true)
  List<Object[]> findAllUserAssignedRoles(String userid);

Iterable<? extends Userassignroles> findByUserassignrolesIdentityUserid(String userid);
}
