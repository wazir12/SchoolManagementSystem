package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class GetAllPupilsDTO {

	private Long pupilId;
	private Long CourseId;
	private String firstName;
	private String lastName;
	
	public GetAllPupilsDTO() {
		
	}
	
	public GetAllPupilsDTO(
			Long pupilId, 
			Long courseId, 
			String firstName, 
			String lastName) {
		super();
		this.pupilId = pupilId;
		this.CourseId = courseId;
		this.firstName = firstName;
		this.lastName = lastName;
	}
	public Long getPupilId() {
		return pupilId;
	}
	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}
	public Long getCourseId() {
		return CourseId;
	}
	public void setCourseId(Long courseId) {
		CourseId = courseId;
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
		return "GetAllPupilsDTO [pupilId=" + pupilId + ", CourseId=" + CourseId + ", firstName=" + firstName
				+ ", lastName=" + lastName + "]";
	}
	
	
	
	
}
