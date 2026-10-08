import PDFDocument from "pdfkit";

type Participant = {
  full_name: string;
  email: string;
  contact_number?: string | null;
  faculty: string;
  image_url?: string | null;
};

type TeamParticipant = {
  leader: string;
  teamName?: string;
  member: Participant[];
};

type EventInfo = {
  title: string;
  event_date: string;
  location: string;
  isTeamEvent: boolean;
};

function getPdfImageUrl(imageUrl: string) {
  return imageUrl.replace("/image/upload/", "/image/upload/f_png/");
}

async function getImageBuffer(imageUrl?: string | null) {
  if (!imageUrl) return null;

  try {
    const pdfImageUrl = getPdfImageUrl(imageUrl);

    const response = await fetch(pdfImageUrl);

    if (!response.ok) {
      console.log("Failed to fetch image:", response.status);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Image download failed:", error);
    return null;
  }
}

export async function generateParticipantPdf(
  event: EventInfo,
  participants: Participant[],
  teamParticipants: TeamParticipant[],
) {
  const doc = new PDFDocument({
    margin: 50,
  });

  // Header
  doc.fontSize(20).text("CEMS", {
    align: "center",
  });

  doc.moveDown(0.5);

  doc.fontSize(16).text("Event Participants", {
    align: "center",
  });

  doc.moveDown();

  // Event information
  doc.fontSize(12);

  doc.text(`Event: ${event.title}`);
  doc.text(`Date: ${event.event_date}`);
  doc.text(`Location: ${event.location}`);

  // solo event

  if (!event.isTeamEvent) {
    doc.text(`Total Participants: ${participants.length}`);

    doc.moveDown();

    doc.text("--------------------------------------------------");

    for (const [index, participant] of participants.entries()) {
      doc.moveDown();

      doc.fontSize(12).text(`${index + 1}. ${participant.full_name}`);

      const image = await getImageBuffer(participant.image_url);

      if (image) {
        doc.image(image, {
          width: 80,
          height: 80,
        });

        doc.moveDown(0.5);
      }

      doc.fontSize(10);

      doc.text(`Email: ${participant.email}`);

      doc.text(`Contact: ${participant.contact_number || "N/A"}`);

      doc.text(`Faculty: ${participant.faculty}`);

      doc.moveDown();

      doc.text("--------------------------------------------------");
    }
  }

  // team event
  else {
    doc.text(`Total Teams: ${teamParticipants.length}`);

    doc.moveDown();

    doc.text("--------------------------------------------------");

    for (const [teamIndex, team] of teamParticipants.entries()) {
      doc.moveDown();

      doc
        .fontSize(14)
        .text(`Team ${teamIndex + 1}: ${team.teamName || "Unnamed Team"}`);

      doc.fontSize(11);

      doc.text(`Leader: ${team.leader}`);

      doc.text(`Total Members: ${team.member.length}`);

      doc.moveDown();

      for (const [memberIndex, member] of team.member.entries()) {
        doc.fontSize(11).text(`${memberIndex + 1}. ${member.full_name}`);

        const image = await getImageBuffer(member.image_url);

        if (image) {
          doc.image(image, {
            width: 100,
            height: 80,
          });

          doc.moveDown(0.5);
        }

        doc.fontSize(10);

        doc.text(`Email: ${member.email}`);

        doc.text(`Contact: ${member.contact_number || "N/A"}`);

        doc.text(`Faculty: ${member.faculty}`);

        doc.moveDown();
      }

      doc.text("--------------------------------------------------");
    }
  }

  doc.end();

  return doc;
}
