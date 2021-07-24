package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class SubjectDTO {

	private String subjectName;
	private String description;
	private Long teacherId;
	private boolean is_archived;
	private String teacher_firstName;
	private String teach_lastname;
	
	
	
	public SubjectDTO() {}



	public SubjectDTO( 
			String subjectName,
			String description,
			Long teacherId,
			boolean is_archived, 
			String teacher_firstName,
			String teach_lastname) {
		super();
		this.subjectName = subjectName;
		this.description = description;
		this.teacherId = teacherId;
		this.is_archived = is_archived;
		this.teacher_firstName = teacher_firstName;
		this.teach_lastname = teach_lastname;
	}

	


	public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



	public Long getTeacherId() {
		return teacherId;
	}



	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}



	



	public String getSubjectName() {
		return subjectName;
	}



	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}



	public boolean isIs_archived() {
		return is_archived;
	}



	public void setIs_archived(boolean is_archived) {
		this.is_archived = is_archived;
	}



	public String getTeacher_firstName() {
		return teacher_firstName;
	}



	public void setTeacher_firstName(String teacher_firstName) {
		this.teacher_firstName = teacher_firstName;
	}



	public String getTeach_lastname() {
		return teach_lastname;
	}



	public void setTeach_lastname(String teach_lastname) {
		this.teach_lastname = teach_lastname;
	}
	
	
	
	
	
}
