import { useEffect, useState } from "react";
import ListStudents from "../../components/admin/students/list";
import SearchStudents from "../../components/admin/students/search";
import useAdmin from "../../feature/admin/useAdmin";

export default function Students() {
  const { students, getAllStudents, pagination, loading } = useAdmin();
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllStudents(page, limit, search);
  }, [page, limit, search]);

  return (
    <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <div className="page-wrap space-y-5">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Faculty workspace</p><h1 className="mt-2 text-3xl font-semibold">Students</h1><p className="mt-2 text-sm text-muted-foreground">View student accounts and check their approval status.</p></div>
        <SearchStudents value={search} onChange={(value) => { setSearch(value); setPage(1); }} />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><ListStudents students={students} loading={loading} pagination={pagination} onPageChange={setPage} /></div>
      </div>
    </div>
  );
}
