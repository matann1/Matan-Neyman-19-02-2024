import { Link } from "react-router-dom";
import useTheme from "../context/theme";

const Header = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
      localStorage.setItem("themeMode", "dark");
    } else {
      lightTheme();
      localStorage.setItem("themeMode", "light");
    }
  };

  return (
    <header className="bg-primary py-4 sm:py-5 border-b dark:border-white/10 border-black/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <Link to="/">
            <h1 className="font-bold font-Pacifico text-black dark:text-white text-[1.875rem] leading-[2.344rem] sm:text-[2.188rem] sm:leading-[2.734rem] md:text-[2.625rem] md:leading-[3.281rem]">
              Weather
            </h1>
          </Link>
          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  to="/"
                  className="font-mont text-black dark:text-white leading-[1.6rem] text-base hover:opacity-80"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="font-mont text-black dark:text-white leading-[1.6rem] text-base hover:opacity-80"
                >
                  Favorities
                </Link>
              </li>
              <li>
                <div className="text-black flex items-center space-x-2">
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={onChangeBtn}
                        checked={themeMode === "dark"}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#83D7EE]">
                        <div className="dark:text-red-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`${
                              themeMode === "light" ? "block" : "hidden"
                            } w-4 h-4 ml-[23px] mt-[4px]`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                            />
                          </svg>
                        </div>
                        <div className="dark:text-red-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`${
                              themeMode === "dark" ? "block" : "hidden"
                            } w-4 h-4 ml-1 mt-[4px]`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
