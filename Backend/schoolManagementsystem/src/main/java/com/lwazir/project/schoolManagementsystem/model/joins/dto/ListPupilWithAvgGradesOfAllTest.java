package com.lwazir.project.schoolManagementsystem.model.joins.dto;

public class ListPupilWithAvgGradesOfAllTest {

	private Long pupilId;
	private String pupilFirstName;
	private String pupilLastName;
	private Double avgGrade;
	
	
	
	
	public ListPupilWithAvgGradesOfAllTest() {}

	public ListPupilWithAvgGradesOfAllTest(Long pupilId, String pupilFirstName, String pupilLastName, Double avgGrade) {
		super();
		this.pupilId = pupilId;
		this.pupilFirstName = pupilFirstName;
		this.pupilLastName = pupilLastName;
		this.avgGrade = avgGrade;
	}
	
	public Long getPupilId() {
		return pupilId;
	}
	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}
	public String getPupilFirstName() {
		return pupilFirstName;
	}
	public void setPupilFirstName(String pupilFirstName) {
		this.pupilFirstName = pupilFirstName;
	}
	public String getPupilLastName() {
		return pupilLastName;
	}
	public void setPupilLastName(String pupilLastName) {
		this.pupilLastName = pupilLastName;
	}
	public Double getAvgGrade() {
		return avgGrade;
	}
	public void setAvgGrade(Double avgGrade) {
		this.avgGrade = avgGrade;
	}
	
	
	
		
	
	
}
