package com.vivatech.repository.cms;

import java.util.List;

// import com.vivatech.model.Contenttypes;
// import com.vivatech.model.Location;
// import com.vivatech.model.User;
// import com.vivatech.model.Languages;
import com.vivatech.model.cms.Usercontents;
import com.vivatech.model.cms.UsercontentsIdentity;

import org.springframework.data.repository.CrudRepository;

// import com.vivatech.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UsercontentsRepository extends CrudRepository<Usercontents, UsercontentsIdentity> {

  List<Usercontents>  findByUsercontentsIdentityUserid(String userid);
  //List<Usercontents> findByUsercontents(String userid);


  Usercontents  findByUsercontentsIdentityContentid(String contentid);
  // Iterable<? extends Usercontents> findByContentid(String contentid);
  //Usercontents findByContentid(String contentid);


  // @Query(value = "delete from usercontents b where b.contentid=?1", nativeQuery = true)
  // int deleteusercontent(String contentid);

  // void deleteByContentid(String contentid);




}
