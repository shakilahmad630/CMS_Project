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
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;


import javax.sql.DataSource;
import org.springframework.context.annotation.PropertySource;

@Configuration
@EnableJpaRepositories(basePackages = "com.vivatech.repository.corporate",
        entityManagerFactoryRef = "corporateEntityManagerFactory",
        transactionManagerRef= "corporateTransactionManager")

// @PropertySource("file:////home/core/crbtcms/database.properties")
@PropertySource("classpath:database.properties")
public class CorporateDataSourceConfiguration {

    @Bean
    @ConfigurationProperties("app.datasource.corporate")
    public DataSourceProperties corporateDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties("app.datasource.corporate.configuration")
    public DataSource corporateDataSource() {
        return corporateDataSourceProperties().initializeDataSourceBuilder()
                .type(BasicDataSource.class).build();
    }

    @Bean(name = "corporateEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean corporateEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(corporateDataSource())
                .packages(new String[] {"com.vivatech.model.corporate"})
                .build();
    }

    @Bean
    public PlatformTransactionManager corporateTransactionManager(
            final @Qualifier("corporateEntityManagerFactory") LocalContainerEntityManagerFactoryBean corporateEntityManagerFactory) {
        return new JpaTransactionManager(corporateEntityManagerFactory.getObject());
    }

}
