export default function ActivitySectoin() {
  return <div>ActivitySectoin under development</div>;
}

export type ActivityType = "participant" | "team" | "news" | "update";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string; // "New participant registered"
  subtitle: string; // "Aarav Shrestha" / "Code Warriors"
  created_at: string; // ISO string
  avatar_url?: string; // optional, only for participant activity
}

//   {activities.length === 0 ? (
//             <p className="py-10 text-center text-sm text-gray-500">
//               No activity yet. New registrations and updates will show up here.
//             </p>
//           ) : (
//             <ul className="mt-5 space-y-5">
//               {activities.map((item, index) => (
//                 <li key={item.id} className="relative flex items-center gap-4">
//                   {/* timeline line + dot */}
//                   <div className="relative flex w-3 shrink-0 justify-center self-stretch">
//                     {index !== activities.length - 1 && (
//                       <span className="absolute top-1/2 h-[calc(100%+1.25rem)] w-px bg-primary/20" />
//                     )}
//                     <span className="relative top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary" />
//                   </div>

//                   {item.avatar_url ? (
//                     <img
//                       src={item.avatar_url}
//                       alt={item.subtitle}
//                       className="h-11 w-11 shrink-0 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
//                       {activityIcon[item.type]}
//                     </div>
//                   )}

//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-semibold text-gray-900">
//                       {item.title}
//                     </p>
//                     <p className="truncate text-sm text-gray-500">
//                       {item.subtitle}
//                       <span className="mx-1.5">•</span>
//                       {timeAgo(item.created_at)}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
