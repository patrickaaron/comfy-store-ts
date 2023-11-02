import { Outlet, useNavigation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Loading } from "../components/Loading";

export default function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
}
