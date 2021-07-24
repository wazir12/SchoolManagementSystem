package com.lwazir.project.schoolManagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.lwazir.project.schoolManagementsystem.model.Pupil;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AllAssignedSubjectsWithAvgGradeByPupilIdDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllPupilsDTO;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.ListPupilWithAvgGradesOfAllTest;
@Transactional
public interface PupilRepository extends JpaRepository<Pupil,Long> {
	
	@Modifying
	@Query("update Pupil as p set p.course.courseId = :value where p.id = :id")
	void deAssignPupil(@Param("value") Long value,@Param("id") Long id);

	//@Modifying
	//@Query("insert into PUPILS_SUBJECTS_MAP ( PUPIL_ID, SUBJECT_ID ) values ( :pupilId, :subjectId )")
	//void assignPupilToSubject(@Param("pupilId") Long pupilId,@Param("subjectid") Long subjectId);

	@Modifying
	@Query("update Pupil as p set p.course.courseId = :value where p.id = :id")
	void assignPupil(@Param("value") Long value,@Param("id") Long id);

	@Query("SELECT  new com.lwazir.project.schoolManagementsystem.model.joins.dto.AllAssignedSubjectsWithAvgGradeByPupilIdDTO("
			+ " map.subjectId, "
			+ "AVG(record.grade), "
			+ "map.pupilId ) "
			+ "FROM PupilsSubjectsMap as map "
			+ "LEFT JOIN Test as t "
			+ "on t.subject.subjectName=map.subjectId "
			+ "LEFT JOIN  PupilTestRecord as record "
			+ "on record.testId=t.id   "
			+ "where map.pupilId=:pupilId "
			+ "group by map.subjectId"
			)
	List<AllAssignedSubjectsWithAvgGradeByPupilIdDTO> fetchAssignedSubjectWithGradesByPupilId(
			@Param("pupilId") Long pupilId);
	
	
	
	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.GetAllPupilsDTO( "+ 
	"p.id, "+
	"p.course.courseId, "+
	"u.firstName, "+
	"u.LastName "+
	") "+
	"from Pupil as p "+
	"Inner Join "+
	"User as u on u.id=p.user.id"
	)
	List<GetAllPupilsDTO> fetchAllPupils();
	
	
	/** * Select 
        s.course_course_id,
	    te.subject_id, 
	    AVG(te.grade),
        te.pupil_id,
        u.first_name,
        u.last_name,
        t.id
		from Test as te 
	    Right Join  Subject as s
	    on te.subject_id=s.subject_name
	    Left Join Teacher as t
        on t.id=s.lecturer_id
        Left Join Pupil as p 
           on te.pupil_id=p.id
        Left Join User as u
           on u.id=p.user_id
		where te.grade>=0  AND t.id = 1 OR te.grade!=null
		group by te.subject_id
	 *         
	 */
	
	
	/**SELECT  map.pupil_id, u.firstName, 
			+ u.LastName,  AVG(testRecord.grade) 
			FROM PUPILS_SUBJECTS_MAP  as map 
			inner join 
			PUPIL_TEST_RECORD  as testRecord 
			on testRecord.pupil_id=map.pupil_id 
			inner join 
			Pupil as p
			on p.id=map.pupil.id
			Inner Join 
			User as u
			on u.id=p.user.id
			where map.subject_id=:subjectId 
			group by map.pupil_id****/
	
	
	@Query("Select new com.lwazir.project.schoolManagementsystem.model.joins.dto.ListPupilWithAvgGradesOfAllTest( "+
			"map.pupilId, "+
			"u.firstName, "+
			"u.LastName, "
			+ "AVG(record.grade) "
			+ ")" 
			+ "FROM PupilsSubjectsMap  as map " 
			+"left join "
			+ "Test as t "
			+ "on t.subject.subjectName = map.subjectId "
			+ "left join " 
			+"PupilTestRecord  as record "
			+"on record.testId=t.id and record.pupilId = map.pupilId "
			+"right  join "
			+"Pupil as p "
			+"on p.id=map.pupilId "
			+"right join "
			+"User as u "
			+" on u.id=p.user.id "
			+" where map.subjectId=:subjectId  "
			+"group by map.pupilId")
	List<ListPupilWithAvgGradesOfAllTest> getPupilListWithGrade(@Param("subjectId") String subjectId);

}
