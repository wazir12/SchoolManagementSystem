package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class AllAssignedSubjectsWithAvgGradeByPupilIdDTO {

	
	private String subjectName;
	private Double grade;
	private Long pupilId;
	
	
	public AllAssignedSubjectsWithAvgGradeByPupilIdDTO() {
	}
	
	public AllAssignedSubjectsWithAvgGradeByPupilIdDTO(
			String subjectName, 
			Double grade,
			Long pupilId) {
		super();
		this.subjectName = subjectName;
		this.grade = grade;
		this.pupilId = pupilId;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	public Double getGrade() {
		return grade;
	}
	public void setGrade(Double grade) {
		this.grade = grade;
	}
	public Long getPupilId() {
		return pupilId;
	}
	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}
	
	
	
}
