package com.lwazir.project.schoolManagementsystem.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.lwazir.project.schoolManagementsystem.errors.UserNotFoundException;
import com.lwazir.project.schoolManagementsystem.model.Pupil;
import com.lwazir.project.schoolManagementsystem.model.PupilsSubjectsMap;
import com.lwazir.project.schoolManagementsystem.model.Subject;
import com.lwazir.project.schoolManagementsystem.model.Teacher;
import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetPupilIdByUsername;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetTeacherIdByUsername;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetUserIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectsPerTeacherDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.isTeacherAssignedSubjectDTO;
import com.lwazir.project.schoolManagementsystem.repository.PupilRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilsSubjectsMapRepository;
import com.lwazir.project.schoolManagementsystem.repository.SubjectRepository;
import com.lwazir.project.schoolManagementsystem.repository.TeacherRepository;
import com.lwazir.project.schoolManagementsystem.repository.UserRepository;
import com.lwazir.project.schoolManagementsystem.utility.UserPDFGenerator;
@RestController
//Allowing request from http://localhost:4500/
@CrossOrigin(origins = "http://localhost:4500/",exposedHeaders = {"Content-Disposition"})
public class UserController {
	@Autowired
	UserRepository repo;
	
	@Autowired
	PupilRepository pupilRepo;
	
	@Autowired
	TeacherRepository teacherRepo;
	
	@Autowired
	SubjectRepository subjRepo;

	@Autowired
	PupilsSubjectsMapRepository pupilSubjectRepo;
	
	
	@GetMapping(path= "/users")
	public List<User> getAllUsers() {
		return  repo.findAll();
	}
	
	@GetMapping(path= "/users/{id}")
	public User getUserById(@PathVariable Long id) {
		
			return repo.findById(id).get();
		
	}
	
	@GetMapping(path= "/GetUserIDByName/{name}")
	public GetUserIdDTO getUserIdByUsername(@PathVariable String name) {
		
			return  repo.fetchUserIdByUsername(name);
		
	}
	
	
	
	@GetMapping(path="/users/teacherId/{name}")
	public GetTeacherIdByUsername fetchTeacherIdByUserName(@PathVariable String name) {
		
		try {
			
			return repo.fetchTeacherIdByUsername(name);
			
		}catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		
	}
	
	
	 @GetMapping(path="/users/export/pdf",produces= 
             MediaType.APPLICATION_PDF_VALUE)
	 public ResponseEntity<InputStreamResource> userReport() 
			 throws IOException {
		
		 List<User> usersList = repo.findAll();

		 ByteArrayInputStream bis = UserPDFGenerator.UserPDFReport(usersList);
		

		 HttpHeaders headers = new HttpHeaders();
		 headers.add("Content-Disposition", "inline; filename=usersReport.pdf");

		 return ResponseEntity
				 .ok()
				 .headers(headers)
				 .contentType(MediaType.APPLICATION_PDF)
				 .body(new InputStreamResource(bis));
		 
		
	 }
	
	//TODO: Implementating Validation in Spring boot using 
	//@Valid Annotation
	@PostMapping(path="/addUser")
	public ResponseEntity<Object> addUser( @RequestBody User user) {
		User savedUser;
		try {
			user.setCreatedAt(new Date());
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String encodedPassword=encoder.encode(user.getPassword());
			if(user.getRole().equals("TEACHER")) {
				Teacher teacher = new Teacher();
				Teacher savedTeacher=teacherRepo.save(teacher);
				if(savedTeacher!=null) {
					user.setTeacher(savedTeacher);
				}
				user.setPassword(encodedPassword);
				//user.setTeacher(new Teacher(0));
			    savedUser = repo.save(user);
			  //Set the uri of created resource into the response
				URI createdResourceUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
				//Return Created status
				return ResponseEntity.created(createdResourceUri).build();
				
				
			}
			else if(user.getRole().equals("PUPIL")) {
				
				user.setPassword(encodedPassword);
				//user.setTeacher(new Teacher(0));
			    savedUser = repo.save(user);
			    if(savedUser!=null ) {
			    	if(savedUser.getRole().equals("PUPIL")){
			    		Pupil pupil = new Pupil();
			    		pupil.setUser(savedUser);
			    		pupilRepo.save(pupil);
			    	}
			    }
			  //Set the uri of created resource into the response
				URI createdResourceUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
				//Return Created status
				return ResponseEntity.created(createdResourceUri).build();
				
			}
			
		
		}catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		
		
		
	}
	
	
	@DeleteMapping(path= "/delete/{id}")
	public ResponseEntity<Object> deleteUserById(@PathVariable Long id) {
		try { 
			    User user = repo.findById(id).get();
			    if(user.getRole().equalsIgnoreCase("TEACHER")) {
			    	//isTeacherAssignedSubjectDTO result = repo.checkIfTeacherIsAssignedToSubject(id);
			    	List<SubjectsPerTeacherDTO> activeSubjects = subjRepo.fetchAllActiveSubjectsByTeacherId(user.getTeacher().getId());
			    	if(activeSubjects.isEmpty()) {
				    	  repo.deleteById(id);
				    	  return ResponseEntity.accepted().build();
				    }
			    	else {
						   return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Teacher is Assigned to Subject");   
				        }
			    }else if(user.getRole().equalsIgnoreCase("PUPIL")) {
			    	GetPupilIdByUsername pupil = repo.fetchPupilIdByUsername(user.getUsername());
			    	List<PupilsSubjectsMap> map = pupilSubjectRepo.findAll();
			    	List<PupilsSubjectsMap> assignedPupils = map.stream()
			    	.filter(
			    			p->p.getPupilId().equals(pupil.getPupilId())
			    	 )
			    	.collect(Collectors.toList());
			    	
			    	if(assignedPupils.isEmpty()) {
			    		pupilRepo.deleteById(pupil.getPupilId());
			    		repo.deleteById(id);
			    	    return ResponseEntity.accepted().build();
			    	}
			    	else {
			    		 return ResponseEntity.status(HttpStatus.FORBIDDEN)
			    				 .body("Pupil is Assigned to a Subject");   
					       
			    	}
			    	
			    }else if(user.getRole().equalsIgnoreCase("ADMIN")) {
			    	List<User> users = repo.findAll();
			    	Set<User> allAdmins = users
			    	.stream()
			    	.filter(u->u.getRole().equalsIgnoreCase("ADMIN"))
			    	.collect(Collectors.toSet());
			    	if(allAdmins.size()>1) {
			    		repo.deleteById(id);
				    	 return ResponseEntity.accepted().build();	
			    	}else {
			    		return ResponseEntity.status(HttpStatus.FORBIDDEN)
			    				 .body("You can't Delete Yourself!"); 
			    	}
			    }
			    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
				
				
				
		
		}catch(Exception e) {
			throw new UserNotFoundException("error "+e.getMessage());
		}
	}
	
	@DeleteMapping(path= "/delete")
	public void deleteAll() {
		try { 
		repo.deleteAll();
		}catch(Exception e) {
			throw new RuntimeException("Delete All Operation Failed!");
		}
	}

	@PutMapping(path="/users/{id}")
	public ResponseEntity<Object> updateUser(
			@PathVariable Long id, 
			@Valid @RequestBody User user){
		
		try {
			
			User extractedUser=repo.findById(id).get();
			extractedUser.setFirstName(user.getFirstName());
			extractedUser.setLastName(user.getLastName());
			extractedUser.setId(id);
			extractedUser.setUsername(user.getUsername());
			extractedUser.setRole(user.getRole());
			
			String password =user.getPassword();
			if(password!=null) {
				BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
				String encodedPassword=encoder.encode(user.getPassword());
				extractedUser.setPassword(encodedPassword);
				//repo.deleteById(id);
				
				//	ExtractedUser.setLastName()
					repo.save(extractedUser);
			}else {
			
			//repo.deleteById(id);
			
		//	ExtractedUser.setLastName()
			repo.save(extractedUser);
			}
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			throw new UserNotFoundException("User Not Found!");
		}
	
		
		return ResponseEntity.ok().build();
	}


}
