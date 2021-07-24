package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class PupilsAssignedToSubjectByIdDTO {

	private Long pupilId;
	private String firstName;
	private String lastName;
	
	
	public PupilsAssignedToSubjectByIdDTO(Long pupilId, String firstName, String lastName) {
		super();
		this.pupilId = pupilId;
		this.firstName = firstName;
		this.lastName = lastName;
	}
	public Long getPupilId() {
		return pupilId;
	}
	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
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
	
	
}
