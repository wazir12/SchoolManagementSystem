package com.lwazir.project.schoolManagementsystem.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserAlreadyExist extends RuntimeException {

	public UserAlreadyExist(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
	
	

}
