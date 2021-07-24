package com.lwazir.project.schoolManagementsystem.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Pupil{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
	
	@OneToOne
	@JoinColumn(name="user_id")
	//@JsonIgnore
    private User user;
	
	//@OneToMany(mappedBy = "pupil_id")
	//Set<PupilTestRecord> grades;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="course_id")
	//@JsonIgnore
	private Course course;

	
	
//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="subject_id")
//	@JsonIgnore
//	Subject subject;

	
	private long avg_grade;
	
	public Pupil() {
		
	}
	public Pupil(long id, long avg_grade) {
		super();
		this.id = id;
		this.avg_grade = avg_grade;
	}
	
	
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
	
	
	
	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}




	public long getAvg_grade() {
		return avg_grade;
	}



	public void setAvg_grade(long avg_grade) {
		this.avg_grade = avg_grade;
	}




	
	
	
	
	

}
