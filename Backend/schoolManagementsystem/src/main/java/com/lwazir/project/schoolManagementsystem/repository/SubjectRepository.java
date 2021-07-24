package com.lwazir.project.schoolManagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.lwazir.project.schoolManagementsystem.model.Subject;
import com.lwazir.project.schoolManagementsystem.model.Teacher;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.PupilsAssignedToSubjectByIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectByCourseIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectsPerTeacherDTO;
@Transactional
public interface SubjectRepository extends JpaRepository<Subject,String> {

	@Query("SELECT new com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectDTO("
			+ " s.subjectName, "
			+ "s.subjectDescription, "
			+ "s.lecturer.id, "
			+ "s.isArchived, "
			+ "u.firstName, "
			+ "u.LastName) "
			+ "FROM Subject as s Left Join User as u on s.lecturer.id = u.teacher.id "
			+"where s.subjectName = :name"
			)
	SubjectDTO fetchSubjectDetails(@Param("name") String subjectName);
	
	
	@Query(
"SELECT new com.lwazir.project.schoolManagementsystem.model.joins.dto.PupilsAssignedToSubjectByIdDTO( "
			+ "map.pupilId, "
			+ "u.firstName, "
			+ "u.LastName ) "
			+ "From PupilsSubjectsMap  as map "
			+ "Inner Join Pupil as p "
			+ "on p.id=map.pupilId "
			+ "Inner Join User as u "
			+ "on u.id=p.user.id "
			+ "where map.subjectId=:subjectId order by map.pupilId ASC"
	)
	List<PupilsAssignedToSubjectByIdDTO> getAllPupilBySubjectId(@Param("subjectId") String subjectId);
	
	
	@Modifying
	@Query("update Subject as s set "
			+ "s.isArchived = :value"
			+ " where s.subjectName = :subjectName ")
	void archiveSubject(
			@Param("value")  boolean archive, 
			@Param("subjectName") String subjectName);
	
	@Query("Select  new com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectByCourseIdDTO( s.subjectName ) from Subject as s where s.course.courseId=:courseId")
	List<SubjectByCourseIdDTO>  fetchAllSubejectByCourseId(@Param("courseId") Long courseId);
	
	@Modifying
	@Query("update Subject as s set "
			+ "s.subjectName = :value, "
			+ "s.subjectDescription= :description"
			+ " where s.subjectName = :subjectName")
	void updateDescriptionAndNameSubject(
			@Param("value")  String modifiedSubjectName, 
			@Param("description") String desc, 
			@Param("subjectName") String subjectName);
	
	
	@Modifying
	@Query("update Subject as s set "
			+ "s.course.courseId = :value, "
			+ "s.lecturer.id= :teacherId"
			+ " where s.subjectName = :subjectName")
	void deassignCourseAndTeacherFromSubject(
			@Param("value") Long courseId, 
			@Param("teacherId") Long teacherId, 
			@Param("subjectName") String subjectName);
	//TODO:Fetching Active and Archived Subjects
	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectsPerTeacherDTO( "
			+ "s.course.courseId, "
			+ "c.courseName, "
			+ "s.subjectName, "
			+ "s.isArchived ) "
			+ "From Subject as s"
			+ " Left Join Course as c "
			+ "on c.courseId=s.course.courseId "
			+ "where s.lecturer.id = :teacherId and s.isArchived=false")
	List<SubjectsPerTeacherDTO> fetchAllActiveSubjectsByTeacherId(@Param("teacherId") Long teacherId); 
	
	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.SubjectsPerTeacherDTO( "
			+ "s.course.courseId, "
			+ "c.courseName, "
			+ "s.subjectName, "
			+ "s.isArchived ) "
			+ "From Subject as s"
			+ " Left Join Course as c "
			+ "on c.courseId=s.course.courseId "
			+ "where s.lecturer.id = :teacherId and s.isArchived=true")
	List<SubjectsPerTeacherDTO> fetchAllArchivedSubjectsByTeacherId(@Param("teacherId") Long teacherId); 
	

}
