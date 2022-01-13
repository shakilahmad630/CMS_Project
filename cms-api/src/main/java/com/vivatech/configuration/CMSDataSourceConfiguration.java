/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vivatech.configuration;

/**
 *
 * @author KALAM
 */

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import org.springframework.context.annotation.PropertySource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.vivatech.repository.cms",
        entityManagerFactoryRef = "cmsEntityManagerFactory",
        transactionManagerRef= "cmsTransactionManager"
)
// @PropertySource("file:////home/core/crbtcms/database.properties")
@PropertySource("classpath:database.properties")
public class CMSDataSourceConfiguration {

    @Bean
    @Primary
    @ConfigurationProperties("app.datasource.cms")
    public DataSourceProperties cmsDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    @ConfigurationProperties("app.datasource.cms.configuration")
    public DataSource cmsDataSource() {
        return cmsDataSourceProperties().initializeDataSourceBuilder()
                .type(HikariDataSource.class).build();
    }

    @Primary
    @Bean(name = "cmsEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean cmsEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(cmsDataSource())
                .packages(new String[] {"com.vivatech.model.cms"})
                .build();
    }

    @Primary
    @Bean
    public PlatformTransactionManager cmsTransactionManager(
            final @Qualifier("cmsEntityManagerFactory") LocalContainerEntityManagerFactoryBean cmsEntityManagerFactory) {
        return new JpaTransactionManager(cmsEntityManagerFactory.getObject());
    }

}

