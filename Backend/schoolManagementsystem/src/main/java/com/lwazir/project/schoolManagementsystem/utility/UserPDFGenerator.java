package com.lwazir.project.schoolManagementsystem.utility;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletResponse;

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
import com.lwazir.project.schoolManagementsystem.model.User;

public class UserPDFGenerator {


   
    public static ByteArrayInputStream UserPDFReport
                         (List<User> users) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);
            document.open();

            // Add Text to PDF file ->
            Font font = FontFactory.getFont(FontFactory.COURIER, 14, 
                                          BaseColor.BLACK);
            Paragraph para = new Paragraph("Users Table", font);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(4);
            // Add PDF Table Header ->
            Stream.of("ID", "Name", "Role","CreatedAt").forEach(headerTitle -> 
                                     {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
                header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });

            for (User user : users) {
                PdfPCell idCell = new PdfPCell(new Phrase(user.getId().
                                             toString()));
                idCell.setPaddingLeft(4);
                idCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(idCell);

                PdfPCell nameCell = new PdfPCell(new Phrase
                                 (user.getName()));
                nameCell.setPaddingLeft(4);
                nameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                nameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(nameCell);

                PdfPCell roleCell = new PdfPCell(new Phrase
                          (String.valueOf(user.getRole())));
                roleCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                roleCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                roleCell.setPaddingRight(4);
                table.addCell(roleCell);
                PdfPCell createdAtCell = new PdfPCell(new Phrase
                        (String.valueOf(user.getCreatedAt().toGMTString())));
                createdAtCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                createdAtCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                createdAtCell.setPaddingRight(4);
                table.addCell(createdAtCell);
            }
            document.add(table);

            document.close();
        } catch (DocumentException e) {
            
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
