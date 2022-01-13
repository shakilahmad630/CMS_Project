package com.vivatech.repository.cms;

import java.util.List;
import java.util.Optional;

import com.vivatech.model.cms.Contents;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ContentsRepository extends CrudRepository<Contents, String> {

  @Query(value = "SELECT max(cpid) FROM users", nativeQuery = true)
  String getMaxCPIDValue();

  @Query(value = "SELECT a.*,c.userid FROM contentproperties as a , contents as b, usercontents as c "
          + " where a.id = b.id and c.contentid = b.id and c.userid = ?1"
          + " and b.languageid = ?2 and b.contenttypeid = ?3 and a.contentstatus Like ?4 order by a.tonetag desc", nativeQuery = true)
  List<Object[]> getContentsforUserid(String userid, String languageid, String contenttypeid, String contentstatus);
  
  @Query(value = "SELECT a.*, b.languageid, b.locationid, b.contenttypeid, c.userid FROM contentproperties as a , contents as b, usercontents as c where a.id = b.id and c.contentid = b.id", nativeQuery = true)
  List<Object[]> findAllContents();

  Optional<Contents> findById(String id);

  @Query(value = "select  count(*) from contents as a, usercontents as b, contentproperties as c where  a.id = b.contentid and a.id =c.id and b.userid = ?1 and c.contentstatus = ?2", nativeQuery = true)
  Integer getContentCountForUserForGivenStatus(String userid, String status);
  
  @Query(value = "SELECT DATE_FORMAT(createddate, \"%D %b\") AS date, COUNT(id) AS count FROM contents"
          + " WHERE createddate BETWEEN DATE_SUB(now(), INTERVAL 7 DAY) AND now() group by DATE(createddate) order by createddate", nativeQuery = true)
  List<Object[]> getContentsCreatedinlast7days();
  
  @Query(value = "SELECT DATE_FORMAT(copyrightto, \"%D %b\") AS date, COUNT(id) AS count FROM contentproperties" 
        + "   WHERE copyrightto BETWEEN DATE_SUB(now(), INTERVAL 7 DAY) AND now() group by DATE(copyrightto) order by copyrightto", nativeQuery = true)
  List<Object[]> getContentsExpiredinlast7days();
}
