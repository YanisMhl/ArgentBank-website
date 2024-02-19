import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "../../components/Account";
import {
  useUserProfileMutation,
  useUsernameEditMutation,
} from "../../features/userAuth/userAuthApi";
import { setUser, setUsername } from "../../features/user/userSlice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [userField, setUserField] = useState("");
  const { token, firstName, lastName, userName } = useSelector((state) => state.user);
  const [userProfile, { isLoading: profileLoading, error: profileError }] = useUserProfileMutation();
  const [updateUsername, { isLoading: usernameEditLoading, error: usernameEditError }] = useUsernameEditMutation();


  const fetchUser = async () => {
    try {
      const response = await userProfile({ token }).unwrap();
      dispatch(setUser(response.body));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (editing) {
      setUserField(userName);
    }
  }, [editing]);

  const handleEditForm = async (e, newUsername) => {
    e.preventDefault();
    if (!newUsername) {
      console.log("Veillez mettre un nouveau username.");
    } else {
      try {
        const response = await updateUsername({ newUsername, token }).unwrap();
        console.log(response);
        dispatch(setUsername(newUsername));
        setEditing(false);
        if (localStorage.getItem("rememberMe")) {
          localStorage.setItem("userName", newUsername);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {
          profileError ?
          <h1>An error occured : {profileError.message}</h1> :
          profileLoading ?
          <h1>Loading...</h1>:
          <h1>Welcome back <br />{`${firstName} ${lastName}`}</h1>
        }
        {!editing ? (
          <button className="edit-button" onClick={() => setEditing(true)}>
            Edit Name
          </button>
        ) : (
          <form onSubmit={(e) => handleEditForm(e, userField)}>
            {usernameEditLoading && <p>Saving changes...</p>}
            {usernameEditError && <p>An error occured : {usernameEditError.message}</p>}
            <div className="edit-input">
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                value={userField}
                onChange={(e) => setUserField(e.target.value)}
              />
            </div>
            <div className="edit-input">
              <label htmlFor="firstname">First name:</label>
              <input type="text" id="firstname" value={firstName} disabled />
            </div>
            <div className="edit-input">
              <label htmlFor="lastname">Last name:</label>
              <input type="text" id="lastname" value={lastName} disabled />
            </div>
            <div className="edit-btns">
              <button
                className="edit-button"
                type="submit">
                Save
              </button>
              <button className="edit-button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
};

export default User;
