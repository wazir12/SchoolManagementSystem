package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class PupilTestGradeDetailsDTO {

	private Long pupilId;
	private String pupilFName;
	private String pupilLast;
	private Long testId;
	private Double testGrade;
	private String subjectName;
	private String subjectDescription;
	private Boolean isSubjectArchived;
	
	
	
	public PupilTestGradeDetailsDTO(
			Long pupilId, 
			String pupilFName,
			String pupilLast,
			Long testId,
			Double testGrade,
			String subjectName, String subjectDescription, Boolean isSubjectArchived) {
		super();
		this.pupilId = pupilId;
		this.pupilFName = pupilFName;
		this.pupilLast = pupilLast;
		this.testId = testId;
		this.testGrade = testGrade;
		this.subjectName = subjectName;
		this.subjectDescription = subjectDescription;
		this.isSubjectArchived = isSubjectArchived;
	}
	public Long getPupilId() {
		return pupilId;
	}
	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}
	public String getPupilFName() {
		return pupilFName;
	}
	public void setPupilFName(String pupilFName) {
		this.pupilFName = pupilFName;
	}
	public String getPupilLast() {
		return pupilLast;
	}
	public void setPupilLast(String pupilLast) {
		this.pupilLast = pupilLast;
	}
	public Long getTestId() {
		return testId;
	}
	public void setTestId(Long testId) {
		this.testId = testId;
	}
	public Double getTestGrade() {
		return testGrade;
	}
	public void setTestGrade(Double testGrade) {
		this.testGrade = testGrade;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	public String getSubjectDescription() {
		return subjectDescription;
	}
	public void setSubjectDescription(String subjectDescription) {
		this.subjectDescription = subjectDescription;
	}
	public Boolean getIsSubjectArchived() {
		return isSubjectArchived;
	}
	public void setIsSubjectArchived(Boolean isSubjectArchived) {
		this.isSubjectArchived = isSubjectArchived;
	}
	
	
	
	
	
	
	
}
