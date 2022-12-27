let API_URL;

if ((process.env.ENV || process.env.REACT_APP_PUBLIC_ENV) === "production")
  API_URL =
    process.env.BASE_URL_PROD || process.env.REACT_APP_PUBLIC_BASE_URL_PROD;
else if ((process.env.ENV || process.env.REACT_APP_PUBLIC_ENV) === "test")
  API_URL =
    process.env.BASE_URL_TEST || process.env.REACT_APP_PUBLIC_BASE_URL_TEST;
else if (
  (process.env.ENV || process.env.REACT_APP_PUBLIC_ENV) === "development"
)

  API_URL =
    process.env.BASE_URL_DEV || process.env.REACT_APP_PUBLIC_BASE_URL_DEV;

// console.log("apiUrl", API_URL);
export default API_URL;
