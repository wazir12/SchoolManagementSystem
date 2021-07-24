package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class GetPupilIdByUsername {
	private Long pupilId;
	private String firstName;
	private String lastName;
	private Long userId;
	
	
	
	public GetPupilIdByUsername() {}
	public GetPupilIdByUsername(
			Long pupilId,
			String firstName, 
			String lastName, 
			Long userId) {
		super();
		this.pupilId = pupilId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userId = userId;
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
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
}
