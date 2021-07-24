package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class SubjectsPerTeacherDTO {

	Long courseId;
	String courseName;
	String SubjectName;
	boolean isArchived;
	
	
	
	public SubjectsPerTeacherDTO(Long courseId, String courseName, String subjectName,boolean isArchived) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		SubjectName = subjectName;
		this.isArchived= isArchived;
	}
	
	public boolean isArchived() {
		return isArchived;
	}
	public void setArchived(boolean isArchived) {
		this.isArchived = isArchived;
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
		return SubjectName;
	}
	public void setSubjectName(String subjectName) {
		SubjectName = subjectName;
	}
	
	
	
}
