package com.lwazir.project.schoolManagementsystem.utility;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.lwazir.project.schoolManagementsystem.model.Pupil;
import com.lwazir.project.schoolManagementsystem.model.Teacher;
import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.repository.PupilRepository;
import com.lwazir.project.schoolManagementsystem.repository.TeacherRepository;
import com.lwazir.project.schoolManagementsystem.repository.UserRepository;

@Component
public class CustomCommandLineRunner implements CommandLineRunner {

	@Autowired
	UserRepository repo;
	
	@Autowired
	TeacherRepository teacherRepo;
	
	@Autowired
	PupilRepository pupilRepo;
	
	@Override
	public void run(String... args) throws Exception {
		List<User> userList= new ArrayList();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String encodedPassword =encoder.encode("1234");
		
		User user1= new User(
				"lwazir",
				"Lalit",
				"Wazir",
				encodedPassword,
				new Date(),
				"ADMIN"
				
			
				);
		
		User user2= new User(
				"pupil1",
				"anupal",
				"mishra",
				encodedPassword,
				new Date(),
				"PUPIL"
			
				);
		
	
		User user3= new User(
				"pupil2",
				"aman",
				"khosla",
				encodedPassword,
				new Date(),
				"PUPIL"
			
				);
		
		
		User user4= new User(
				"pupil3",
				"susan",
				"jane",
				encodedPassword,
				new Date(),
				"PUPIL"
			
				);
		
		User user5= new User(
				"pupil4",
				"aditya",
				"shukla",
				encodedPassword,
				new Date(),
				"PUPIL"
				);
		
		userList.add(user1);
		userList.add(user2);
		userList.add(user3);
		userList.add(user4);
		userList.add(user5);
		
		
		List<User> users=repo.saveAll(userList);
		
		List<User> pupils = users
				.stream()
				.filter( user -> user.getRole().equals("PUPIL"))
				.collect(Collectors.toList());
		
		
		pupils
		.stream()
		.forEach
			((pupil)->{
				Pupil newPupil = new Pupil();
				newPupil.setUser(pupil);
				pupilRepo.save(newPupil);
			});
		
	}

}
