package com.lwazir.project.schoolManagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.lwazir.project.schoolManagementsystem.model.Test;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.TestDetailsDTO;

public interface TestRepository extends JpaRepository<Test,Long> {

	
	@Query(
			"Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.TestDetailsDTO( "
			+ "test.id, "
			+ "test.testname, "
			+ "test.createdAt ) "
			+ "From Test as test "
			+ "where test.subject.subjectName=:subjectId"
			
			)
	List<TestDetailsDTO> fetchTestBySubjectId(@Param("subjectId") String subjectId);

	@Transactional
	@Modifying
	@Query("update Test as test set test.testname = :value where test.id = :id and test.subject.subjectName=:subjectName")
	void editTest(@Param("value") String value,
			@Param("id") Long id,
			@Param("subjectName") String subjectName);


}
