package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class PupilAndTestCountDTO {

	
	private long pupilCount;
	private long testCount;
	
	

	public PupilAndTestCountDTO() {
	}

	public PupilAndTestCountDTO(long pupilCount,long testCount) {
		super();
		this.pupilCount = pupilCount;
		this.testCount = testCount;
	}

	public long getPupilCount() {
		return pupilCount;
	}
	

	public long getTestCount() {
		return testCount;
	}

	public void setTestCount(long testCount) {
		this.testCount = testCount;
	}

	public void setPupilCount(long pupilCount) {
		this.pupilCount = pupilCount;
	}
	
	
	
}
