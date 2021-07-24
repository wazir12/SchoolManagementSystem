package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class isTeacherAssignedSubjectDTO {

	private Long teacherId;
	
	//private String teacher_id;

	
	
	public isTeacherAssignedSubjectDTO() {
	}
	


	public isTeacherAssignedSubjectDTO(Long teacherId) {
		super();
		this.teacherId = teacherId;
	}

	public Long getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}
	
	
	
	
	
}
