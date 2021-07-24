package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class AllPupilsByTestID {

	private Long testId;
	private String firstName;
	private String lastName;
	private Long pupilId;
	private Long grade;
	
	
	
	public AllPupilsByTestID(Long testId, String firstName, String lastName, Long pupilId, Long grade) {
		super();
		this.testId = testId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.pupilId = pupilId;
		this.grade = grade;
	}
	public Long getTestId() {
		return testId;
	}
	public void setTestId(Long testId) {
		this.testId = testId;
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
	public Long getPupilId() {
		return pupilId;
	}
	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}
	public Long getGrade() {
		return grade;
	}
	public void setGrade(Long grade) {
		this.grade = grade;
	}
	
	
	
	
}
