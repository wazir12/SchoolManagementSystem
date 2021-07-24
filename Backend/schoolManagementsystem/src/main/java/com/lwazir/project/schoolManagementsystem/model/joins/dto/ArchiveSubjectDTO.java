package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class ArchiveSubjectDTO {

	
	private boolean archiveStatus;
	private String subjectName;
	
	
	public ArchiveSubjectDTO(boolean archiveStatus, String subjectName) {
		super();
		this.archiveStatus = archiveStatus;
		this.subjectName = subjectName;
	}
	
	public boolean isArchiveStatus() {
		return archiveStatus;
	}
	public void setArchiveStatus(boolean archiveStatus) {
		this.archiveStatus = archiveStatus;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	
	
}
