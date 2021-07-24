package com.lwazir.project.schoolManagementsystem.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.FetchMode;
import org.hibernate.annotations.Fetch;

import com.lwazir.project.schoolManagementsystem.model.Course;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Subject {
	
	@Id
	private String subjectName;
	
	private String subjectDescription;
	
	private boolean isArchived;

	//@OneToMany(mappedBy="subject")
	//private List<Pupil> pupils;
	
	@OneToMany(mappedBy="subject")
	@JsonIgnore
	private List<Test> tests;
	
	//@OneToMany(targetEntity=PupilsSubjectsMap.class, mappedBy = "subjectTable")
	//private Set<Pupil> pupils ;
	
	
	
	@ManyToOne(targetEntity = Teacher.class,
			fetch=FetchType.LAZY)
	//@JsonIgnore
	private Teacher lecturer;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnore
	private Course course;
	
	
	/**
	
	public Set<Pupil> getPupils() {
		return pupils;
	}


	public void setPupils(Set<Pupil> pupils) {
		this.pupils = pupils;
	}
**/

	public Teacher getLecturer() {
		return lecturer;
	}


	public void setLecturer(Teacher lecturer) {
		this.lecturer = lecturer;
	}

//	public List<Pupil> getPupils() {
//		return pupils;
////	}


//	public void setPupils(List<Pupil> pupils) {
//		this.pupils = pupils;
//	}


	public List<Test> getTests() {
		return tests;
	}


	public String getSubjectDescription() {
		return subjectDescription;
	}


	public void setSubjectDescription(String subjectDescription) {
		this.subjectDescription = subjectDescription;
	}


	public void setTests(List<Test> tests) {
		this.tests = tests;
	}


	


	public String getSubjectName() {
		return subjectName;
	}


	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}


	public Course getCourse() {
		return course;
	}


	public void setCourse(Course course) {
		this.course = course;
	}





	public boolean isArchived() {
		return isArchived;
	}


	public void setArchived(boolean isArchived) {
		this.isArchived = isArchived;
	}


	public Subject(String subjectName, 
			Course course,
		 boolean isArchived,String description) {
		super();
		this.subjectName = subjectName;
		this.course = course;
		this.isArchived = isArchived;
		this.subjectDescription = description;
	}


	public Subject() {
		
	}


	@Override
	public String toString() {
		return "Subject [subjectName=" + subjectName + ", subjectDescription=" + subjectDescription + ", isArchived="
				+ isArchived + ", tests=" + tests + ", lecturer=" + lecturer + ", course=" + course + "]";
	}



	
	
	
	
	
	
	
	
	

}
