package com.lwazir.project.schoolManagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lwazir.project.schoolManagementsystem.model.Teacher;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllPupilsDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllTeachersDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.PupilTestGradeDetailsDTO;

public interface TeacherRepository extends JpaRepository<Teacher,Long>{

	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllTeachersDTO( "+ 
			"t.id, "+
			"u.firstName, "+
			"u.LastName "+
			") "+
			"from Teacher as t "+
			"Left Join "+
			"User as u on u.teacher.id=t.id"
			)
			List<GetAllTeachersDTO> fetchAllTeachers();
	
	
}
