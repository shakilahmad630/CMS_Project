package com.vivatech.repository.cms;

import java.util.List;
import java.util.Optional;

import com.vivatech.model.cms.Users;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UsersRepository extends CrudRepository<Users, String> {

  @Query(value = "SELECT max(cpid) FROM users", nativeQuery = true)
  String getMaxCPIDValue();

  Users findByUsername(String username);

  @Query(value = "SELECT b.id, b.username, b.passwordhash as password, b.firstname, b.lastname, b.email, b.phonenumber, b.status, d.rolename  FROM usersmapping as a , users as b, usersinroles as c, roles as d where a.userid = b.id and a.userid = c.userid and c.roleid = d.roleid and a.puserid = ?1", nativeQuery = true)
  List<Object[]> findByPUserid(String puserid);
  
  @Query(value = "SELECT b.id, b.username, b.passwordhash as password, b.firstname, b.lastname, b.email, b.phonenumber, b.status, d.rolename  FROM usersmapping as a , users as b, usersinroles as c, roles as d where a.userid = b.id and a.userid = c.userid and c.roleid = d.roleid", nativeQuery = true)
  List<Object[]> findAllUsers();

  @Query(value = "SELECT b.id, b.username, b.passwordhash as password, b.firstname, b.lastname, b.email, b.phonenumber, b.status, d.rolename  FROM users as b, usersinroles as c, roles as d where b.id = c.userid and c.roleid = d.roleid and b.username = ?1", nativeQuery = true)
  List<Object[]> getUserAndRoleDetailsFromUsername(String username);

  @Query(value = "SELECT b.id, b.username, b.passwordhash as password, b.firstname, b.lastname, b.email, b.phonenumber, b.status, d.rolename  FROM users as b, usersinroles as c, roles as d where b.id = c.userid and c.roleid = d.roleid and b.id = ?1", nativeQuery = true)
  List<Object[]> findByUserid(String userid);
  
  @Query(value = "SELECT d.rolename, b.cpid, b.sequenceno FROM users as b, usersinroles as c, roles as d where b.id = c.userid and c.roleid = d.roleid and b.id = ?1", nativeQuery = true)
  List<Object[]> getrolenameAndDetailsforUserid(String userid);
  
  @Query(value = "SELECT d.rolename FROM users as b, usersinroles as c, roles as d where b.id = c.userid and c.roleid = d.roleid and b.id = ?1", nativeQuery = true)
  String getrolenameforUserid(String userid);

  Optional<Users> findById(String id);

  @Query(value = "SELECT cpid, sequenceno, b.puserid FROM users as a, usersmapping as b where a.id = b.puserid and b.userid =  ?1", nativeQuery = true)
  List<Object[]> getCPId(String userid);



}
