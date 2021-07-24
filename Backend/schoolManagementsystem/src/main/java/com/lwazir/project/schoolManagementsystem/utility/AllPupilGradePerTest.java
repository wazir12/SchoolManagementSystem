package com.lwazir.project.schoolManagementsystem.utility;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.lwazir.project.schoolManagementsystem.model.PupilTestRecord;
import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.model.joins.dto.AllPupilsByTestID;

public class AllPupilGradePerTest {
	 
    public static ByteArrayInputStream UserPDFReport
                         (List<AllPupilsByTestID> testRecords) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);
            document.open();

            // Add Text to PDF file ->
            Font font = FontFactory.getFont(FontFactory.COURIER, 14, 
                                          BaseColor.BLACK);
            Paragraph para = new Paragraph("List of Pupils with Grades Table", font);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(4);
            // Add PDF Table Header ->
            Stream.of("ID", "Pupil Name", "Test ID","Grade").forEach(headerTitle -> 
                                     {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
                header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });

            for (AllPupilsByTestID testRecord : testRecords) {
                PdfPCell idCell = new PdfPCell(
                		new Phrase(testRecord.getPupilId().toString())
                		);
                idCell.setPaddingLeft(4);
                idCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(idCell);

                PdfPCell nameCell = new PdfPCell(new Phrase(
                		testRecord.getFirstName() + ' '+testRecord.getLastName()
                		)
                	);
                nameCell.setPaddingLeft(4);
                nameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                nameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(nameCell);
                
                PdfPCell testIdCell = new PdfPCell(new Phrase(
                		testRecord.getTestId().toString()
                		)
                	);
                testIdCell.setPaddingLeft(4);
                testIdCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                testIdCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(testIdCell);
                
               

                PdfPCell gradeCell = new PdfPCell(new Phrase
                          (String.valueOf(testRecord.getGrade())));
                gradeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                gradeCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                gradeCell.setPaddingRight(4);
                table.addCell(gradeCell);
             
            }
            document.add(table);

            document.close();
        } catch (DocumentException e) {
            
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
