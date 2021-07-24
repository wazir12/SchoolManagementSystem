package com.lwazir.project.schoolManagementsystem.model.compositekeys;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PupilTestRecordKey implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6774242234065941129L;

	@Column(name = "pupil_id")
    Long pupilId;

    @Column(name = "test_id")
    Long testId;
    
    
    

	public PupilTestRecordKey() {
	}

	public PupilTestRecordKey(Long pupilId, Long testId) {
		super();
		this.pupilId = pupilId;
		this.testId = testId;
	}

	public Long getPupilId() {
		return pupilId;
	}

	public void setPupilId(Long pupilId) {
		this.pupilId = pupilId;
	}

	public Long getTestId() {
		return testId;
	}

	public void setTestId(Long testId) {
		this.testId = testId;
	}
    
    

}
