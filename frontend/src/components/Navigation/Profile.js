import "./Profile.css";

const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile__menu">
        <p onClick={props.onLogOut}>Log Out</p>
      </div>
    </div>
  );
};

export default Profile;
