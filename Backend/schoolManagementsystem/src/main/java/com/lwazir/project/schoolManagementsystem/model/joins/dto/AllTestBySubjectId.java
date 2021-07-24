package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class AllTestBySubjectId {

	private Long testId;
	private String testName;
	private Long grade;
	
	
	
	public AllTestBySubjectId() {}
	public AllTestBySubjectId(Long testId, String testName, Long grade) {
		super();
		this.testId = testId;
		this.testName = testName;
		this.grade = grade;
	}
	public Long getTestId() {
		return testId;
	}
	public void setTestId(Long testId) {
		this.testId = testId;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public Long getGrade() {
		return grade;
	}
	public void setGrade(Long grade) {
		this.grade = grade;
	}
	
	
}
