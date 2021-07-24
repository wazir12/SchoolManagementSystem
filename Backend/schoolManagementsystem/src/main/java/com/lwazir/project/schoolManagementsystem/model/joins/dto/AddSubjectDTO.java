package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class AddSubjectDTO {
	
	private String subjectName;
	private Long teacherId;
	private String subjectDescription;
	
	
	public AddSubjectDTO(String subjectName,String subjectDescription, Long teacherId) {
		super();
		this.subjectName = subjectName;
		this.subjectDescription=subjectDescription;
		this.teacherId = teacherId;
	}
	
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	
	public Long getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}
	
	
	

	public String getSubjectDescription() {
		return subjectDescription;
	}

	public void setSubjectDescription(String subjectDescription) {
		this.subjectDescription = subjectDescription;
	}

	@Override
	public String toString() {
		return "AddSubjectDTO [subjectName=" + subjectName + ", teacherId=" + teacherId + ", subjectDescription="
				+ subjectDescription + "]";
	}

	
	
	
	
	

}
