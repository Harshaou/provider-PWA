import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import moment from 'moment';

export const generateClaimForm = async (templateURL, member, doctor) => {
  try {
    if (member) {
      // setNewClaimFormState({ ...newClaimFormState, loading: true });
      const existingPdfBytes = await fetch(templateURL)
        .then((res) => res.arrayBuffer())
        .catch((err) => alert('error loading template, try again'));

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const wingdings = await pdfDoc.embedFont(StandardFonts.ZapfDingbats);

      const texts = [
        [member.member_number?.toString() ?? '', { x: 165, y: 722, size: 10 }],
        [member.name?.split(' ')[1] ?? '', { x: 135, y: 697, size: 10 }],
        [member.name?.split(' ')[0] ?? '', { x: 235, y: 680, size: 10 }],
        [member.email ?? '', { x: 162, y: 617, size: 10 }],
        [member.contact_number ?? '', { x: 162, y: 632, size: 10 }],
        [doctor.name ?? '', { x: 135, y: 567, size: 10 }],
        [doctor.discipline ?? '', { x: 150, y: 549, size: 10 }],
        [
          member.gender === 'Male' ? '\u2714' : '',
          { font: wingdings, x: member.gender === 'Male' ? 469 : 496, y: 655, size: 10 },
        ],
      ];

      const gapedText = (strings, startX, y, size, charGap, gap) => {
        strings?.map((str, i) => {
          str?.split('').map((c, j) => {
            firstPage.drawText(c, { x: startX + j * charGap + i * gap, y: y, size: size });
          });
        });
      };
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      texts?.map((item) => {
        firstPage.drawText(...item);
      });
      const today = new moment();
      gapedText(
        [today?.format('DD'), today.format('MM'), today.format('YYYY')],
        390,
        163,
        10,
        14,
        40,
      );
      gapedText(
        [today?.format('DD'), today.format('MM'), today.format('YYYY')],
        390,
        113,
        10,
        14,
        40,
      );
      const dob = new moment(member?.date_of_birth);
      member?.date_of_birth &&
        gapedText([dob.format('DD'), dob.format('MM'), dob.format('YYYY')], 162, 655, 10, 14, 40);
      const pdfBytes = await pdfDoc.save();

      window
        .open(window.URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' })))
        .print();
    }
  } catch (e) {
    alert(e);
  } finally {
    // setNewClaimFormState({ loading: false, loaded: true, status: 'success' });
  }
};
