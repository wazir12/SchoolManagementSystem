package com.lwazir.project.schoolManagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.lwazir.project.schoolManagementsystem.model.PupilsSubjectsMap;


public interface PupilsSubjectsMapRepository 
extends JpaRepository<PupilsSubjectsMap,Long> 
{
	@Transactional
	@Modifying
	@Query("delete from PupilsSubjectsMap f where f.pupilId=:pupilId and f.subjectId=:subjectId")
	void deleteByPupilIdAndSubjectId(@Param("pupilId") Long pupilId,@Param("subjectId") String subjectId);

}
