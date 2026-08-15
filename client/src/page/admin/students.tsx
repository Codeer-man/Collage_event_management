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
    <div className="space-y-2 my-3 mx-5">
      <SearchStudents
      // search={search}
      // onSearch={(value) => {
      //   setSearch(value);
      //   setPage(1);
      // }}
      />

      <ListStudents
        students={students}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
