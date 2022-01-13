/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vivatech.repository.corporate;

import com.vivatech.model.corporate.Card;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author KALAM
 */
public interface CardRepository extends CrudRepository<Card, Long> {

    public void deleteById(Integer id);
}

