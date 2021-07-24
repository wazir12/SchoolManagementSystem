package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class CourseDTO {

	private String subjectName;
	private boolean isArchived;
	private String teacherFirstName;
	private String teacherLastName;
	private Long courseId;
	private String courseName;
	
	
	
	public CourseDTO() {
	}



	public CourseDTO(
			String subjectName, 
			boolean isArchived,
			String teacherFirstName, 
			String teacherLastName,
			Long courseId,
			String courseName
			) {
		super();
		this.subjectName = subjectName;
		this.isArchived = isArchived;
		this.teacherFirstName = teacherFirstName;
		this.teacherLastName = teacherLastName;
		this.courseId =courseId;
		this.courseName = courseName;
		
	}


	

	


	public Long getCourseId() {
		return courseId;
	}



	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}



	public String getCourseName() {
		return courseName;
	}



	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}



	public String getSubjectName() {
		return subjectName;
	}



	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}



	public boolean isArchived() {
		return isArchived;
	}



	public void setArchived(boolean isArchived) {
		this.isArchived = isArchived;
	}



	public String getTeacherFirstName() {
		return teacherFirstName;
	}



	public void setTeacherFirstName(String teacherFirstName) {
		this.teacherFirstName = teacherFirstName;
	}



	public String getTeacherLastName() {
		return teacherLastName;
	}



	public void setTeacherLastName(String teacherLastName) {
		this.teacherLastName = teacherLastName;
	}
	
	
	
	
}
