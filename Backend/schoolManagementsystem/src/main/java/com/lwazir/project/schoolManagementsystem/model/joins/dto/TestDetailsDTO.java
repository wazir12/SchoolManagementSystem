package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class TestDetailsDTO {
		private Long id;
		private String testName;
		private String createdAt;
		
		
		public TestDetailsDTO() {
		}
		public TestDetailsDTO(Long id, String testName, String createdAt) {
			super();
			this.id = id;
			this.testName = testName;
			this.createdAt = createdAt;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getTestName() {
			return testName;
		}
		public void setTestName(String testName) {
			this.testName = testName;
		}
		public String getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(String createdAt) {
			this.createdAt = createdAt;
		}
		
		
		
}
