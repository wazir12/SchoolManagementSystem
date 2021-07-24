package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class GetTeacherIdByUsername {

	private Long teacherId;
	private String firstName;
	private String LastName;
	private Long id;
	
	
	
	
	public GetTeacherIdByUsername(Long teacherId,
			String firstName,
			String lastName, 
			Long id) {
		super();
		this.teacherId = teacherId;
		this.firstName = firstName;
		LastName = lastName;
		this.id = id;
	}


	public Long getTeacherId() {
		return teacherId;
	}
	
	
	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return LastName;
	}
	public void setLastName(String lastName) {
		LastName = lastName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	
}
