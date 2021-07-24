package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class EditGradeDTO {

	private Long grade;
	
	

	public EditGradeDTO() {
	}

	public EditGradeDTO(Long grade) {
		super();
		this.grade = grade;
	}

	public Long getGrade() {
		return grade;
	}

	public void setGrade(Long grade) {
		this.grade = grade;
	}
	
}
