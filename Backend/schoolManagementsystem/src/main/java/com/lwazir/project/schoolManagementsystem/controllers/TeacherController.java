package com.lwazir.project.schoolManagementsystem.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.lwazir.project.schoolManagementsystem.model.Pupil;
import com.lwazir.project.schoolManagementsystem.model.PupilTestRecord;
import com.lwazir.project.schoolManagementsystem.model.Subject;
import com.lwazir.project.schoolManagementsystem.model.Teacher;
import com.lwazir.project.schoolManagementsystem.model.Test;
import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.model.compositekeys.PupilTestRecordKey;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AllPupilsByTestID;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.EditGradeDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllTeachersDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.ListPupilWithAvgGradesOfAllTest;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.PupilTestGradeDetailsDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.PupilsAssignedToSubjectByIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectsPerTeacherDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.TestDetailsDTO;
import com.lwazir.project.schoolManagementsystem.repository.PupilRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilTestRecordRepository;
import com.lwazir.project.schoolManagementsystem.repository.PupilsSubjectsMapRepository;
import com.lwazir.project.schoolManagementsystem.repository.SubjectRepository;
import com.lwazir.project.schoolManagementsystem.repository.TeacherRepository;
import com.lwazir.project.schoolManagementsystem.repository.TestRepository;
import com.lwazir.project.schoolManagementsystem.repository.UserRepository;
import com.lwazir.project.schoolManagementsystem.utility.AllPupilGradePerTest;
import com.lwazir.project.schoolManagementsystem.utility.AllPupulsWithAverageGradeReport;
import com.lwazir.project.schoolManagementsystem.utility.UserPDFGenerator;

@RestController
//Allowing request from http://localhost:4500/
@CrossOrigin(origins = "http://localhost:4500/",exposedHeaders = {"Content-Disposition"})
public class TeacherController {
	@Autowired
	UserRepository userRepo;
	
	@Autowired 
	PupilRepository pupilRepo;
	
	@Autowired
	TeacherRepository repo;
	
	@Autowired
	SubjectRepository subjRepo;
	
	@Autowired
	TestRepository testRepo;
	
	@Autowired 
	PupilTestRecordRepository testRecordRepo;
	
	@Autowired
	PupilsSubjectsMapRepository pupilSubjectRepo;
	
	@PutMapping("teacher/{subjectId}/edit/{testId}")
	public ResponseEntity<Object> editTest(@PathVariable String subjectId,@PathVariable Long testId,@RequestBody Test test){
		String testName = test.getTestname();
		
		testRepo.editTest(testName,testId, subjectId);
		
		
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("test/{testId}/{pupilId}")
	public ResponseEntity<Object> editTestRecordByTestIdAndPupilId(
			@PathVariable Long testId,
			@PathVariable Long pupilId,
			@RequestBody EditGradeDTO edittedGrade){
		try {
		testRecordRepo.updateGrade(edittedGrade.getGrade(), testId, pupilId);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		return ResponseEntity.ok().build();
		
	}
	
	@PostMapping("/teacher/{subjectId}/add/test")
	public ResponseEntity<Object> addTest(
			@PathVariable String subjectId, 
			@RequestBody Test test){
		
        LocalDateTime now = LocalDateTime.now();   
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");  
        String formattedDateTime = now.format(format);
        Subject subject = subjRepo.findById(subjectId).get();
        test.setCreatedAt(formattedDateTime);
        test.setSubject(subject);
		Test savedTest = testRepo.save(test);
		
		List<PupilsAssignedToSubjectByIdDTO> 
		assignedPupils = subjRepo
							.getAllPupilBySubjectId(subjectId);
		
		Set<PupilTestRecord> testRecords=assignedPupils
				.stream()
				.map(
						pupil->{
								PupilTestRecord testRecord = new PupilTestRecord();
								testRecord.setPupilId(pupil.getPupilId());
								testRecord.setTestId(savedTest.getId());
								return testRecord;
			//testRecordRepo.save(testRecord);
							}).collect(Collectors.toSet());
	
		List<PupilTestRecord> savedTestRecords= testRecordRepo.saveAll(testRecords);
		savedTestRecords.stream()
		.forEach(record->System.out.println(record.getId().toString()));
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/test/{testId}/pupils")
	public List<AllPupilsByTestID> fetchPupilsByTestId(@PathVariable Long testId){

		return testRecordRepo.fetchAllPupilByTestID(testId);
		
	}
	 @GetMapping(path="/teacher/export/{testId}/pupils/grades/pdf",produces= 
             MediaType.APPLICATION_PDF_VALUE)
	 public ResponseEntity<InputStreamResource> exportAllPupilTestRecords(@PathVariable Long testId) 
			 throws IOException {
		
		 List<AllPupilsByTestID> pupilsRecords = testRecordRepo.fetchAllPupilByTestID(testId);
		// List<ListPupilWithAvgGradesOfAllTest> avgGradeList = pupilRepo.getPupilListWithGrade(subjectId);

		 ByteArrayInputStream bis = AllPupilGradePerTest.UserPDFReport(pupilsRecords);
		

		 HttpHeaders headers = new HttpHeaders();
		 headers.add("Content-Disposition", "inline; filename=AllPupilAvgGradeReport.pdf");

		 return ResponseEntity
				 .ok()
				 .headers(headers)
				 .contentType(MediaType.APPLICATION_PDF)
				 .body(new InputStreamResource(bis));
		 
		
	 }
	
	 @GetMapping(path="/teacher/export/{subjectId}/grades/pdf",produces= 
             MediaType.APPLICATION_PDF_VALUE)
	 public ResponseEntity<InputStreamResource> avgGradeReport(@PathVariable String subjectId) 
			 throws IOException {
		
		 List<ListPupilWithAvgGradesOfAllTest> avgGradeList = pupilRepo.getPupilListWithGrade(subjectId);

		 ByteArrayInputStream bis = AllPupulsWithAverageGradeReport.UserPDFReport(avgGradeList);
		

		 HttpHeaders headers = new HttpHeaders();
		 headers.add("Content-Disposition", "inline; filename=AllPupilAvgGradeReport.pdf");

		 return ResponseEntity
				 .ok()
				 .headers(headers)
				 .contentType(MediaType.APPLICATION_PDF)
				 .body(new InputStreamResource(bis));
		 
		
	 }
	
	@DeleteMapping("/teacher/{testId}/delete")
	public ResponseEntity<Object> DeleteTest( 
			@PathVariable Long testId){
		
			testRepo.deleteById(testId);
			List<PupilTestRecord> records = testRecordRepo.findAll();
			if(!records.isEmpty() ||records!=null) {
			testRecordRepo.deleteTestRecord(testId);
			}
		return ResponseEntity.ok().build();
	}
	
	@GetMapping(path= "/teacher/{id}/details")
	public User getTeacherDetails(@PathVariable Long id){
	
		return repo.findById(id).get().getUser();
	}
	
	
	@GetMapping(path= "/teacher/{id}")
	public Teacher getTeacher(@PathVariable Long id){
		
		return repo.findById(id).get();
	}
	
	@GetMapping(path= "/teachers")
	public List<GetAllTeachersDTO> getAllTeacher(){
		
		return repo.fetchAllTeachers();
	}
	
	@GetMapping("/teacher/{subjectId}/pupils/grades")
	public List<ListPupilWithAvgGradesOfAllTest> getPupilsWithAvgGrades(@PathVariable String subjectId){
		return pupilRepo.getPupilListWithGrade(subjectId);
	}
	
	@GetMapping("/teacher/{id}/active/subjects")
	public List<SubjectsPerTeacherDTO> getAllActiveSubjectsById(@PathVariable Long id){
		return subjRepo.fetchAllActiveSubjectsByTeacherId(id);
	}
	
	@GetMapping("/teacher/{id}/archived/subjects")
	public List<SubjectsPerTeacherDTO> getAllArchivedSubjectsById(@PathVariable Long id){
		return subjRepo.fetchAllArchivedSubjectsByTeacherId(id);
	}
	
	@GetMapping("/teacher/{subjectName}/tests")
	public List<TestDetailsDTO> fetchAllTestBySubjectId(@PathVariable String subjectName){
		return testRepo.fetchTestBySubjectId(subjectName);
	}
	

}
