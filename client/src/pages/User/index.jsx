import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "../../components/Account";
import { useUserProfileMutation } from "../../features/userAuth/userAuthApi";
import { setUser } from "../../features/user/userSlice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, firstName, lastName, userName } = useSelector((state) => state.user);
  const [userProfile, { isLoading, error }] = useUserProfileMutation();
  const [editing, setEditing] = useState(false);
  const [userField, setUserField] = useState('');

  const fetchUser = async () => {
    try {
      const response = await userProfile({ token }).unwrap();
      dispatch(setUser(response.body));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (editing) {
      setUserField(userName);
    }
  }, [editing]);

  const handleEditForm = (e) => {
    e.preventDefault();
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {firstName ? (
          <h1>
            Welcome back
            <br />
            {`${firstName} ${lastName}`}
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
        { !editing ?
          <button className="edit-button" onClick={() => setEditing(true)}>Edit Name</button> :
          <form onSubmit={(e) => handleEditForm(e)}>
            <div className="edit-input">
              <label htmlFor="username">User name:</label>
              <input type="text" id="username" value={userField} onChange={(e) => setUserField(e.target.value)} />
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
              <button className="edit-button" type="submit" onClick={() => setEditing(false)}>Save</button>
              <button className="edit-button" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        }
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
