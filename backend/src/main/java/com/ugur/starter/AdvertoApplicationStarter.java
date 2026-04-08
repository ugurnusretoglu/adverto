package com.ugur.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = {"com.ugur"})
@EntityScan(basePackages = {"com.ugur"})
@EnableJpaRepositories(basePackages = {"com.ugur"})
@SpringBootApplication
public class AdvertoApplicationStarter {

	public static void main(String[] args) {
		SpringApplication.run(AdvertoApplicationStarter.class, args);
	}

}
