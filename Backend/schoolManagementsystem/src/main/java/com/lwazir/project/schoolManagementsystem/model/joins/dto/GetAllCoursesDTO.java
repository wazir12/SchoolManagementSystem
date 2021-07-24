package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class GetAllCoursesDTO {

	private Long courseId;
	private String courseName;
	
	
	
	
	public GetAllCoursesDTO() {
	}

	public GetAllCoursesDTO(Long courseId, String courseName) {
		super();
		this.courseId = courseId;
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
	
	
}
