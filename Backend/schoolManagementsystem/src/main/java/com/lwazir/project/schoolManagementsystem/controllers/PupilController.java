package com.lwazir.project.schoolManagementsystem.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lwazir.project.schoolManagementsystem.model.Pupil;
import com.lwazir.project.schoolManagementsystem.model.PupilTestRecord;
import com.lwazir.project.schoolManagementsystem.model.PupilsSubjectsMap;
import com.lwazir.project.schoolManagementsystem.model.Subject;
import com.lwazir.project.schoolManagementsystem.model.Test;
import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AllAssignedSubjectsWithAvgGradeByPupilIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AllTestBySubjectId;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllPupilsDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetPupilIdByUsername;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectByCourseIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.TestDetailsDTO;
import com.lwazir.project.schoolManagementsystem.repository.PupilRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilTestRecordRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilsSubjectsMapRepository;
import com.lwazir.project.schoolManagementsystem.repository.SubjectRepository;
import com.lwazir.project.schoolManagementsystem.repository.TestRepository;
import com.lwazir.project.schoolManagementsystem.repository.UserRepository;

@RestController
//Allowing request from http://localhost:4500/
@CrossOrigin(origins = "http://localhost:4500/",exposedHeaders = {"Content-Disposition"})
public class PupilController {
	@Autowired 
	PupilRepository pupilRepo;
	
	
	
	@Autowired
	SubjectRepository subjectRepo;
	
	@Autowired
	PupilsSubjectsMapRepository repo;
	
	@Autowired 
	TestRepository testRepo;
	
	@Autowired
	PupilTestRecordRepository testRecordRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping(path= "/pupil")
	public List<GetAllPupilsDTO> getAllPupil(){
		
		return pupilRepo.fetchAllPupils();
	}
	
	@GetMapping("/pupil/{username}/GetDetails")
	public GetPupilIdByUsername fetchPupilByUsername(@PathVariable String username) {
		return userRepo.fetchPupilIdByUsername(username);
	}
	
	@GetMapping("/pupil/{pupilId}/{subjectName}/tests")
	public List<AllTestBySubjectId> fetchAllTestBySubjectId(
			@PathVariable Long pupilId,
			@PathVariable String subjectName){
		return testRecordRepo.fetchTestBySubjectsId(subjectName, pupilId);
	}
	
	@GetMapping("/pupil/{pupilId}/AssignedSubjects")
	public List<AllAssignedSubjectsWithAvgGradeByPupilIdDTO> fetchAssignedSubjects(@PathVariable Long pupilId){
		return pupilRepo.fetchAssignedSubjectWithGradesByPupilId(pupilId);
	}
	
	@GetMapping(path= "/pupil/{id}")
	public User getPupilById(@PathVariable Long id){
		
		return pupilRepo.findById(id).get().getUser();
	}
	
	@PutMapping(path="/course/{courseId}/assign/pupil/{pupilId}")
	public ResponseEntity<Object> assignPupil(
			@PathVariable Long courseId,
			@PathVariable Long pupilId)
	{
		
		Pupil pupil = pupilRepo.findById(pupilId).get();
		if(pupil.getCourse()!=null) {
		Long prevCourseId=pupil.getCourse().getCourseId()==null?0:pupil.getCourse().getCourseId();
		if(prevCourseId!=0) {

			List<SubjectByCourseIdDTO>  subjects = 
					subjectRepo.fetchAllSubejectByCourseId(prevCourseId);
			try {
				
				//List<PupilsSubjectsMap> map = repo.findAll();
				
				for(SubjectByCourseIdDTO s : subjects) {
					
					List<AllTestBySubjectId> allTestOfDeassignedPupils = testRecordRepo.fetchTestBySubjectsId(s.getSubjectName(), pupilId);
					for(AllTestBySubjectId testRecord: allTestOfDeassignedPupils) {
						testRecordRepo.deleteTestRecordByPupilIdAndTestId(testRecord.getTestId(), pupilId);
					}
					repo.deleteByPupilIdAndSubjectId(pupilId, s.getSubjectName());
				
					
				}
				pupilRepo.deAssignPupil(null, pupilId);
				
				}catch(Exception e) {
					System.out.println(e.getMessage());
				}		

		}
		}
		pupilRepo.assignPupil(
				courseId, 
				pupilId);
		
		
		
		List<SubjectByCourseIdDTO>  subjects = 
		subjectRepo.fetchAllSubejectByCourseId(courseId);
		try {
		
		List<PupilsSubjectsMap> map = repo.findAll();
		
		
		for(SubjectByCourseIdDTO s : subjects) {
			List<TestDetailsDTO> tests = testRepo.fetchTestBySubjectId(s.getSubjectName());
			if(!tests.isEmpty() || tests!=null) {
				Set<PupilTestRecord> testRecords=tests
						.stream()
						.map(
								test->{
										PupilTestRecord testRecord = new PupilTestRecord();
										testRecord.setPupilId(pupilId);
										testRecord.setTestId(test.getId());
										return testRecord;
					//testRecordRepo.save(testRecord);
									}).collect(Collectors.toSet());
				List<PupilTestRecord> savedTestRecords= testRecordRepo.saveAll(testRecords);
			}
			
			PupilsSubjectsMap 
			newPupilSubjectMap = new PupilsSubjectsMap();
			newPupilSubjectMap.setPupilId(pupilId);
			newPupilSubjectMap.setSubjectId(s.getSubjectName());
			
			map.add(newPupilSubjectMap);
			
		}
		
		
		repo.saveAll(map);
		
		
		
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		//pupil.setSubjects(assignedSubjects);
		//pupilRepo.save(pupil);
		return ResponseEntity.ok().build();
	}
	
	
	@PutMapping(path="/course/{courseId}/pupil/{pupilId}")
	public ResponseEntity<Object> deassignPupil(@PathVariable Long courseId,@PathVariable Long pupilId){
		
		List<SubjectByCourseIdDTO>  subjects = 
				subjectRepo.fetchAllSubejectByCourseId(courseId);
		try {
			
			//List<PupilsSubjectsMap> map = repo.findAll();
			
			for(SubjectByCourseIdDTO s : subjects) {
				
				List<AllTestBySubjectId> allTestOfDeassignedPupils = testRecordRepo.fetchTestBySubjectsId(s.getSubjectName(), pupilId);
				for(AllTestBySubjectId testRecord: allTestOfDeassignedPupils) {
					testRecordRepo.deleteTestRecordByPupilIdAndTestId(testRecord.getTestId(), pupilId);
				}
				repo.deleteByPupilIdAndSubjectId(pupilId, s.getSubjectName());
			
				
			}
			pupilRepo.deAssignPupil(null, pupilId);
			
			}catch(Exception e) {
				System.out.println(e.getMessage());
			}		
		return ResponseEntity.ok().build();
	}
	
	
	

}
