import { useRouter } from "next/router";
import { useEffect } from "react";
import Search from "../components/Search";

const SearchPage = () => {
  const router = useRouter();

  useEffect(() => {
    document.getElementById("search").focus();
  }, []);

  useEffect(() => {
    if (router.query.query === "") {
      router.push("/");
    }
  }, [router]);

  return <Search />;
};

export default SearchPage;
