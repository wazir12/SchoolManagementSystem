package com.lwazir.project.schoolManagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.lwazir.project.schoolManagementsystem.model.PupilTestRecord;
import com.lwazir.project.schoolManagementsystem.model.compositekeys.PupilTestRecordKey;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AllPupilsByTestID;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AllTestBySubjectId;

public interface PupilTestRecordRepository  
	extends JpaRepository<PupilTestRecord,Long>{
	
	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.AllPupilsByTestID( "
			+ "record.testId, "
			+"u.firstName, "
			+ "u.LastName, "
			+ "record.pupilId, "
			+ "record.grade ) "
			+ "From PupilTestRecord as record "
			+ "Left Join "
			+ "Pupil as p "
			+ "on p.id=record.pupilId "
			+ "Left Join "
			+ "User as u "
			+ "on u.id=p.user.id "
			+ "where record.testId=:testId")
	List<AllPupilsByTestID> fetchAllPupilByTestID(
			@Param("testId") Long testId);
	
	
	@Transactional
	@Modifying
	@Query("delete from PupilTestRecord as record where record.testId = :testId")
	void deleteTestRecord(
			@Param("testId") Long testId
	);
	@Transactional
	@Modifying
	@Query("delete from PupilTestRecord as record "
			+ "where record.testId = :testId and record.pupilId= :pupilId")
	void deleteTestRecordByPupilIdAndTestId(
			@Param("testId") Long testId,
			@Param("pupilId") Long pupilId
	);

	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.AllTestBySubjectId( "
			+ "record.testId, t.testname, record.grade ) "
			+ "from  PupilTestRecord  as record "
			+ "Left Join "
			+ "Test as t on t.id=record.testId "
			+ "where record.pupilId=:pupilId and t.subject.subjectName=:subjectId ")
	List<AllTestBySubjectId> fetchTestBySubjectsId(
			@Param("subjectId") String subjectId,
			@Param("pupilId") Long pupilId);
	
	@Transactional
	@Modifying
	@Query("update PupilTestRecord as record set record.grade = :value where record.testId = :testId and record.pupilId=:pupilId")
	void updateGrade(@Param("value") Long value,@Param("testId") Long testId, @Param("pupilId") Long pupilId);

}
