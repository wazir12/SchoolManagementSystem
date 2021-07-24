package com.lwazir.project.schoolManagementsystem.controllers;

import java.net.URI;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.lwazir.project.schoolManagementsystem.errors.UserAlreadyExist;
import com.lwazir.project.schoolManagementsystem.errors.UserNotFoundException;
import com.lwazir.project.schoolManagementsystem.model.Course;
import com.lwazir.project.schoolManagementsystem.model.Pupil;
import com.lwazir.project.schoolManagementsystem.model.PupilsSubjectsMap;
import com.lwazir.project.schoolManagementsystem.model.Subject;
import com.lwazir.project.schoolManagementsystem.model.Teacher;
import com.lwazir.project.schoolManagementsystem.model.Test;
import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AddSubjectDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.ArchiveSubjectDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.CourseDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.EditSubjectDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllCoursesDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllPupilsByCourseId;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.PupilAndTestCountDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.TestDetailsDTO;
import com.lwazir.project.schoolManagementsystem.repository.CourseRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilTestRecordRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilsSubjectsMapRepository;
import com.lwazir.project.schoolManagementsystem.repository.SubjectRepository;
import com.lwazir.project.schoolManagementsystem.repository.TestRepository;


@RestController
@CrossOrigin(origins = "http://localhost:4500/",exposedHeaders = {"Content-Disposition"})
public class SubjectAndClassController {

	@Autowired
	SubjectRepository repo;

	@Autowired
	PupilRepository pupilRepo;

	@Autowired
	CourseRepository courseRepo;
	
	@Autowired
	PupilTestRecordRepository testRecordRepo;
	
	@Autowired
	PupilsSubjectsMapRepository pupilSubjectRepo;
	
	@Autowired
	TestRepository testRepo;

	@DeleteMapping(path="/course/{courseId}/subject/{subjectName}")
	public ResponseEntity<Object> deleteSubjectById(
			@PathVariable Long courseId, @PathVariable String subjectName){
		
		List<TestDetailsDTO> allDependentsTests = testRepo.fetchTestBySubjectId(subjectName);
		if(allDependentsTests.isEmpty()) {
			try{
				repo.deassignCourseAndTeacherFromSubject(null, null, subjectName);
				repo.deleteById(subjectName);
				return ResponseEntity.ok().build();
			}catch(Exception e) {
				ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
			}
			
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		
		
		
	}
	@PutMapping(path="/course/{courseId}")
	public ResponseEntity<Object> editCourse(@PathVariable Long courseId,	
			@RequestBody Course course) {
		Course savedCourse;

		try {	
			savedCourse = courseRepo.findById(courseId).get();
			savedCourse.setCourseName(course.getCourseName());
			courseRepo.saveAndFlush(savedCourse);
		}catch(Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		return ResponseEntity.ok().build();



	}
	
	@PostMapping(path="/course")
	public ResponseEntity<Object> addCourse(
			@RequestBody Course course) {
		Course savedCourse;

		try {	
			savedCourse = courseRepo.saveAndFlush(course);
		}catch(Exception e) {
			throw new UserAlreadyExist("User Alread Present");
		}

		//Set the uri of created resource into the response
		URI createdResourceUri = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(savedCourse.getCourseId()).toUri();
		//Return Created status
		return ResponseEntity.created(createdResourceUri).build();



	}
	@PostMapping(path="/course/{subjectId}/edit/subject")
	public ResponseEntity<Object> editSubject(@PathVariable String subjectId,@RequestBody EditSubjectDTO subject )	{
		
		try {
				repo.updateDescriptionAndNameSubject(subject.getSubjectName(), subject.getDescription(), subjectId);
				return ResponseEntity.ok().build();
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.unprocessableEntity().build();
		}
			
	
	}
	
	@PutMapping(path="/subject/archive")
	public ResponseEntity<Object> archiveSubject(@RequestBody ArchiveSubjectDTO archiveStatus )	{
		
		try {
			if(repo.getById(archiveStatus.getSubjectName()).getTests().size()>0) {
				repo.archiveSubject(archiveStatus.isArchiveStatus(), archiveStatus.getSubjectName());
				return ResponseEntity.ok().build();
			}else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("The Subject with  Dependent Test can only be archived");
			}
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.unprocessableEntity().build();
		}
			
	
	}
	
	
	@PostMapping(path="/course/{id}/subject")
	public ResponseEntity<Object> addSubject(@PathVariable Long id ,@RequestBody AddSubjectDTO subjectDTO) {
		Subject savedSubject;
		Subject newSubject = new Subject();
		
		try {
			newSubject.setCourse(courseRepo.getById(id));
			newSubject.setArchived(false);
			//subject.setPupils(null);
			//subject.setTests( null);
			newSubject.setSubjectDescription(subjectDTO.getSubjectDescription());
			newSubject.setSubjectName(subjectDTO.getSubjectName());
			newSubject.setLecturer(new Teacher(subjectDTO.getTeacherId()));
			savedSubject = repo.saveAndFlush(newSubject);
			List<PupilsSubjectsMap> map = pupilSubjectRepo.findAll();
			List<GetAllPupilsByCourseId> assignedPupils = courseRepo.fetchAllPupilsByCourseId(savedSubject.getCourse().getCourseId());
			for(GetAllPupilsByCourseId pupil: assignedPupils) {
				PupilsSubjectsMap 
				newPupilSubjectMap = new PupilsSubjectsMap();
				newPupilSubjectMap.setPupilId(pupil.getPupilId());
				newPupilSubjectMap.setSubjectId(savedSubject.getSubjectName());
				
				map.add(newPupilSubjectMap);
				
			}
			pupilSubjectRepo.saveAll(map);
		}catch(Exception e) {
			throw new RuntimeException("Something Happened:  "+e.getMessage());
		}

		//Set the uri of created resource into the response
		URI createdResourceUri = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(savedSubject.getSubjectName()).toUri();
		//Return Created status
		return ResponseEntity.created(createdResourceUri).build();



	}
	
	@GetMapping("/subjects/{name}/details")
	SubjectDTO getAllSubjectsById(@PathVariable String name){

		return repo.fetchSubjectDetails(name);

	}
	
	
	
	@GetMapping("/jpa/courses/{id}")
	List<CourseDTO> getCourseDetailsById(@PathVariable Long id){

		return courseRepo.fetchCourseDetails(id);

	}
	

	@GetMapping("/courses/{name}/subjects")
	List<Subject> getAllSubjectsByCourseId(@PathVariable Long name){

		return courseRepo.findById(name).get().getSubjects();

	}

	
	@GetMapping("/course/{id}/allPupils")
	List<GetAllPupilsByCourseId> getAllPupils(@PathVariable Long id){

		return courseRepo.fetchAllPupilsByCourseId(id);

	}
	
	@GetMapping("/courses")
	List<GetAllCoursesDTO> getAllCourses(){

		return courseRepo.fetchAllCourses();
	

	}
	
	
	@GetMapping("/courses/{id}")
	Course getCourseById(@PathVariable Long id){

		return courseRepo.findById(id).get();

	}

	
	@GetMapping("/subjects/{id}")
	Subject getSubjectById(@PathVariable String id){

		return repo.findById(id).get();

	}
	
	
	@GetMapping("/subjects")
	List<Subject> getAllSubject(){

		return repo.findAll();

	}
	

	
	@GetMapping("/subject/{id}/test")
	List<Test> getAllTest(@PathVariable String id){

		return repo.findById(id).get().getTests();

	}

	
	@DeleteMapping(path= "/course/delete/{id}")
	public void deleteCourseById(@PathVariable Long id) {
		try { 
			Course course = courseRepo.findById(id).get();
			List<Subject> assignedSubjects = course.getSubjects();
			List<Pupil> assignedPupils = course.getPupils();

			Set<Subject> subjectNotWithTests = assignedSubjects
					 .stream()
					 .filter(subject->(subject.getTests().isEmpty()))
					 .collect(Collectors.toSet());
					
			Set<Subject> subjectWithTests = assignedSubjects
					 .stream()
					 .filter(subject->(!subject.getTests().isEmpty()))
					 .collect(Collectors.toSet());
			if(assignedSubjects.isEmpty()) {
				if(assignedPupils.isEmpty()) {	
				   courseRepo.deleteById(id);	 
				}
				else {
					deassignPupilFromCourseAndDeleteCourse(id, assignedPupils);		
				}
			}else 
			{
				if(assignedPupils.isEmpty()) {
					if(!subjectWithTests.isEmpty()) {
						subjectWithTests.forEach(subject->{
							List<Test> tests=subject.getTests();
							for(Test t:tests) {
								testRepo.deleteById(t.getId());
								testRecordRepo.deleteTestRecord(t.getId());						
							}
							repo.delete(subject);	
						});
					}else if(!subjectNotWithTests.isEmpty()) {
						subjectNotWithTests.forEach(subject->{
							repo.delete(subject);	
						});
					}
					courseRepo.deleteById(id);
					
					
					
				}
				/**else {
					subjectWithTests.forEach(subject->{
						//Archive Subject
						subject.setArchived(true);
						//Deassign course from subject
						subject.setCourse(null);
						//Save Subject
						repo.save(subject);
					});
					subjectNotWithTests.forEach(subject->{
						repo.delete(subject);
					});
					deassignPupilFromCourseAndDeleteCourse(id,assignedPupils);
				}**/
	
			}
		// courseRepo.deleteById(id);
		}catch(Exception e) {
			throw new UserNotFoundException("User Not Found with Id: "+id);
		}
	}

	private void deassignPupilFromCourseAndDeleteCourse(Long id, List<Pupil> assignedPupils) {
		for(Pupil p : assignedPupils)
		{	
			pupilRepo.deAssignPupil(null, p.getId());
			courseRepo.deleteById(id);
		}
	}




}
