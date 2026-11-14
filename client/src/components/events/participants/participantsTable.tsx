import { Mail, Phone } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import ParticipantAvatar from "./avatar";
import type { soloParticipants } from "../../../feature/event/type";

type Props = {
  participants: soloParticipants[];
};

export default function ParticipantTable({ participants }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead>Participant</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {participants.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-32 text-center text-slate-500"
              >
                No participants found.
              </TableCell>
            </TableRow>
          ) : (
            participants.map((participant, index) => (
              <TableRow key={`${participant.email}-${index}`}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ParticipantAvatar
                      name={participant.full_name}
                      image={participant.image_url}
                    />
                    <span className="font-medium text-slate-800">
                      {participant.full_name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {participant.faculty}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail size={15} className="text-slate-400" />
                    {participant.email}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={15} className="text-slate-400" />
                    {participant.contact_number || "N/A"}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
