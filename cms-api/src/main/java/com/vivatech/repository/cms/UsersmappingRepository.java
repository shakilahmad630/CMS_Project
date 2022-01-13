package com.vivatech.repository.cms;

import java.util.List;

// import java.util.List;

import com.vivatech.model.cms.Usersmapping;
import com.vivatech.model.cms.UsermappingIdentity;

// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// import com.vivatech.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UsersmappingRepository extends CrudRepository<Usersmapping, UsermappingIdentity> {



// @Query(value = "SELECT b.* FROM cptenantusers as a , users as b where a.userid = b.id and a.tenantuserid = ?1", nativeQuery = true)
// Iterable<Users> findByTenantuserid(String tenantuserid);
List<Usersmapping> findByUsermappingIdentityUserid(String userid);


}
