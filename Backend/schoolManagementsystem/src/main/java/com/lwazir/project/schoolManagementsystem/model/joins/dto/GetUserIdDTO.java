package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class GetUserIdDTO {
		private Long userId;
		

		public GetUserIdDTO() {
		}

		public GetUserIdDTO(Long userId) {
			super();
			this.userId = userId;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}
		
		
}
