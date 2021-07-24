package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class EditSubjectDTO {
		
	
		private String subjectName;
		private String description;
		
		
		public EditSubjectDTO(String subjectName, String description) {
			super();
			this.subjectName = subjectName;
			this.description = description;
		}
		public String getSubjectName() {
			return subjectName;
		}
		public void setSubjectName(String subjectName) {
			this.subjectName = subjectName;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		
		
}
