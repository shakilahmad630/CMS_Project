/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vivatech.config;
import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
/**
 *
 * @author KALAM
 */
class AuditorAwareImpl implements AuditorAware<String> {

    
    @Override
    public Optional<String> getCurrentAuditor() {
        //return "Naresh";
        // Can use Spring Security to return currently logged in user
         String username =  ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
         return Optional.ofNullable(username);
    }
}