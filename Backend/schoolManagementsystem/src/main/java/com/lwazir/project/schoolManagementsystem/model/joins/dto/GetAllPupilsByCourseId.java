package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class GetAllPupilsByCourseId {
		private String firstName;
		private String lastName;
		private Long pupilId;
		
		
		public GetAllPupilsByCourseId() {
		}
		
		public GetAllPupilsByCourseId(
				String firstName, 
				String lastName, 
				Long pupilId
				) {
			super();
			this.firstName = firstName;
			this.lastName = lastName;
			this.pupilId = pupilId;
		}
		
		
		public Long getPupilId() {
			return pupilId;
		}

		public void setPupilId(Long pupilId) {
			this.pupilId = pupilId;
		}

		
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		
		

		

		
		
		
		
		
}
