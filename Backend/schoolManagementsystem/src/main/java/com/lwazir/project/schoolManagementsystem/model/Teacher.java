package com.lwazir.project.schoolManagementsystem.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Teacher{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	
	
	
	public Teacher(Long i) {
		super();
		this.id = i;
	}

	public Teacher() {
		// TODO Auto-generated constructor stub
	}

	@OneToMany(mappedBy="lecturer")
	@JsonIgnore
	private List<Subject> assignedSubjects;
	
	

	@OneToOne(mappedBy="teacher")
	@JsonIgnore
	private User user;

	

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

	

	
	
	
	
	
	
	

}
