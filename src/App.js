import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAnother,
  addFav,
  getFavsFromLocalStorage,
  localStorageReset,
} from "./actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const notify = () => {
    toast.info(
      "Şakanız favoriye eklendi. Sonraki şaka için lütfen bekleyin.",
      {
        position:"bottom-left",
        autoClose:2000,
        hideProgressBar:false,
        rtl:false,
        theme:"colored",
      }
    );
  };

  const { loading, current, favs } = useSelector((store) => store);
  const dispatch = useDispatch();

  function addToFavs() {
    dispatch(addFav());
    notify();
    setTimeout(() => {
      dispatch(fetchAnother());
    }, 2000);
  }

  const anotherJoke = () => {
    dispatch(fetchAnother());
  };
  const handleLocalStorage = () => {
    dispatch(getFavsFromLocalStorage());
  };
  const handleResetLocalStorage = () => {
    dispatch(localStorageReset());
  };

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md"></div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={() => anotherJoke()}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            {current && <button
              onClick={addToFavs}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>}
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item) => (
                <FavItem key={item.id} id={item.id}  title={item.setup} />
              ))
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
            <button
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              onClick={() => handleLocalStorage()}
            >
              Hafızadan Al
            </button>
            <button
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              onClick={() => handleResetLocalStorage()}
            >
              Hafıza Sıfırla
            </button>
          </div>
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
