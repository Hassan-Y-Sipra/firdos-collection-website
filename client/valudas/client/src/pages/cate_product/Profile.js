// import React, { useState } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode"; // JWT टोकन डिकोड करने के लिए

// const clientId = "464501845933-bdq50dpege11hh4976tkfl8j5oik4i3p.apps.googleusercontent.com"; // अपनी Google OAuth Client ID डालें

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   const handleSuccess = (credentialResponse) => {
//     const decoded = jwtDecode(credentialResponse.credential); // JWT से User Info डिकोड करें
//     setUser(decoded);
//     console.log("User Info:", decoded);
//   };

//   const handleError = () => {
//     console.log("Login Failed");
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2>Google OAuth Login</h2>
        
//         {user ? (
//           <div>
//             <h3>Welcome, {user.name}!</h3>
//             <p>Email: {user.email}</p>
//             <img src={user.picture} alt="User Profile" style={{ borderRadius: "50%" }} />
//           </div>
//         ) : (
//           <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
//         )}
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Profile;
