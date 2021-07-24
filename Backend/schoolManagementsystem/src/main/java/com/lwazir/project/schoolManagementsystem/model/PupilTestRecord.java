package com.lwazir.project.schoolManagementsystem.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import javax.persistence.Id;
import com.lwazir.project.schoolManagementsystem.model.compositekeys.PupilTestRecordKey;

@Entity
public class PupilTestRecord {
	
	//@EmbeddedId
    // PupilTestRecordKey id;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

   // @ManyToOne
   // @MapsId("pupilId")
  //  @JoinColumn(name = "pupil_id")
    Long pupilId;

   // @ManyToOne
   // @MapsId("testId")
   // @JoinColumn(name = "test_id")
    Long testId;

    Long grade;
    
    public PupilTestRecord() {
		
	}
    
    

	

	public Long getId() {
		return id;
	}





	public void setId(Long id) {
		this.id = id;
	}





	public Long getPupilId() {
		return pupilId;
	}





	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}





	public Long getTestId() {
		return testId;
	}





	public void setTestId(Long testId) {
		this.testId = testId;
	}





	public Long getGrade() {
		return grade;
	}

	public void setGrade(Long grade) {
		this.grade = grade;
	}

	
    
    
    
    
    

}
