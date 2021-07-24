package com.lwazir.project.schoolManagementsystem.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;

import org.hibernate.validator.constraints.UniqueElements;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames = {"course_id" , "course_name"})})
public class Course {
	
	@Id
	@Column(name="course_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long courseId;
	
	@Column(name="course_name" ,unique = true)
	private String courseName;
	
	@OneToMany(mappedBy="course",cascade = CascadeType.ALL)
	private List<Pupil> pupils;
	
	@OneToMany(mappedBy="course")
	private List<Subject> subjects;
	

	public Course() {
	}


	public Course(Long courseId, String courseName, List<Pupil> pupils, List<Subject> subjects) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		this.pupils = pupils;
		this.subjects = subjects;
	}


	public Long getCourseId() {
		return courseId;
	}


	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}


	public String getCourseName() {
		return courseName;
	}


	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}


	public List<Pupil> getPupils() {
		return pupils;
	}


	public void setPupils(List<Pupil> pupils) {
		this.pupils = pupils;
	}


	public List<Subject> getSubjects() {
		return subjects;
	}


	public void setSubjects(List<Subject> subjects) {
		this.subjects = subjects;
	}


	@Override
	public String toString() {
		return "Course [courseId=" + courseId + ", courseName=" + courseName + ", pupils=" + pupils + ", subjects="
				+ subjects + "]";
	}
	
	
	
	
	
	
	
}
