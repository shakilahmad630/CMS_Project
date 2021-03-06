package com.vivatech.repository.cms;

import javax.persistence.EntityManager;
// import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

interface CustomizedSave<T> {
  <S extends T> S save(S entity);
}

class CustomizedSaveImpl<T> implements CustomizedSave<T> {

  @Autowired
  private EntityManager entityManager;


  public <S extends T> S save(S entity) {

    // Your custom implementation
    entityManager.persist(entity);
     return entity;
  }

  // @Transactional
  // public <S extends T> void delete(S entity) {

  //   // Your custom implementation
  //   entityManager.remove(entity);
  // }
}
