package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class GetAllTeachersDTO {
	
	private Long teacherId;
	private String firstName;
	private String lastName;
	
	public GetAllTeachersDTO() {
	}

	public GetAllTeachersDTO(Long teacherId, String firstName, String lastName) {
		super();
		this.teacherId = teacherId;
		this.firstName = firstName;
		this.lastName = lastName;
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
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return "GetAllTeachersDTO [teacherId=" + teacherId + ", firstName=" + firstName + ", lastName=" + lastName
				+ "]";
	}
	
	
	

}
