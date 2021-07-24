package com.lwazir.project.schoolManagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;

import com.lwazir.project.schoolManagementsystem.model.Course;
import com.lwazir.project.schoolManagementsystem.model.Teacher;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.CourseDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllCoursesDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllPupilsByCourseId;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectDTO;

public interface CourseRepository extends JpaRepository<Course,Long> {

	@Query("SELECT new com.lwazir.project.schoolManagementsystem.model.joins.dto.CourseDTO( "
			+ "s.subjectName, "
			+ "s.isArchived, "
			+ "u.firstName, "
			+ "u.LastName, "
			+ "c.courseId, "
			+ "c.courseName) "
			+ "FROM User as u "
			+ "LEFT JOIN Teacher as t on u.teacher.id=t.id "
			+ "LEFT JOIN Subject as s "
			+"on t.id=s.lecturer.id "
			+ "Left Join Course as c "
			+ "on c.courseId=s.course.courseId "
			+"where c.courseId = :id"
			)
	List<CourseDTO> fetchCourseDetails(@Param("id") Long id);
	
	@Query("SELECT new com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllCoursesDTO(c.courseId,c.courseName) "
			+ "FROM Course as c"
			)
	List<GetAllCoursesDTO> fetchAllCourses();
	
	@Query(
			"Select "
			+ "new com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllPupilsByCourseId( "
			+ "u.firstName, "
			+ "u.LastName, "
			+ "p.id )"
			+ " From Pupil as p "
			+ "Inner Join User as u "
			+ "on p.user.id = u.id "
			+ "where p.course.id=:courseId "
			+ "order by p.id ASC"
	)
	List<GetAllPupilsByCourseId> fetchAllPupilsByCourseId(@Param("courseId") Long courseId);

	
	
}
