package com.lwazir.project.schoolManagementsystem.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.lwazir.project.schoolManagementsystem.model.compositekeys.PupilTestRecordKey;

@Entity
public class PupilsSubjectsMap {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	
    Long pupilId;

    
  
    String subjectId;
    
    
	public PupilsSubjectsMap() {
	}
	
	


	public PupilsSubjectsMap(Long pupilId, String subjectId) {
		super();
		this.pupilId = pupilId;
		this.subjectId = subjectId;
	}




	

	public Long getPupilId() {
		return pupilId;
	}


	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}


	public String getSubjectId() {
		return subjectId;
	}


	public void setSubjectId(String subjectId) {
		this.subjectId = subjectId;
	}
	
	

	


	
	
	
    
    

}
