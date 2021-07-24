package com.lwazir.project.schoolManagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetPupilIdByUsername;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetTeacherIdByUsername;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetUserIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.isTeacherAssignedSubjectDTO;

public interface UserRepository extends JpaRepository<User,Long> {

	//@Query("SELECT new com.lwazir.project.schoolManagementsystem.model.joins.dto.isTeacherAssignedSubjectDTO( "
	//	+ "u.teacher.id ) FROM User as u where u.id=:id")
	//isTeacherAssignedSubjectDTO checkIfTeacherIsAssignedToSubject(@Param("id") Long id);
	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.GetUserIdDTO( "
			+"u.id ) "
			+ "From User as u "
			+ "where u.username=:username")
	GetUserIdDTO fetchUserIdByUsername(@Param("username") String username);


	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.GetTeacherIdByUsername( "
			+ "u.teacher.id, "
			+ "u.firstName,"
			+ "u.LastName, "
			+ "u.id ) "
			+ "From User as u "
			+ "where u.username=:username")
	GetTeacherIdByUsername fetchTeacherIdByUsername(@Param("username") String username);

	@Query("SELECT new com.lwazir.project.schoolManagementsystem.model.joins.dto.GetPupilIdByUsername( "
			+ "p.id, "
			+ "u.firstName, "
			+ "u.LastName, "
			+ "u.id ) From Pupil as p "
			+ "Inner Join User as u on u.id=p.user.id "
			+ "where u.username = :username")
	GetPupilIdByUsername fetchPupilIdByUsername(@Param("username") String username);
}
