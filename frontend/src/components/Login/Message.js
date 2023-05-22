import LoginBtn from "./LoginBtn";

import "./Message.css";

const Message = (props) => {
  const closeHandler = () => {
    if (props.checkbox) {
      document.cookie = `lastVisit=${new Date().toISOString()}; path=/;`;
      props.setIsMessage(false);
    } else {
      props.setIsMessage(false);
    }
  };

  return (
    <div className="message">
      <div className="message-top"></div>
      <div className="message-bottom">
        <h2>Thanks for your interest in my project!</h2>
        <p>Few things to note before start:</p>
        <ol>
          <li>
            The application is deployed on Free tier server, this will take a
            long time to log in as service will be down if it is not in use.
            <ul>
              <li>Sorry for the inconvenience it may cause.</li>
            </ul>
          </li>
          <li>
            Account creation will require an email address. If you do not wish
            to make one, you may try with below test account:
            <ul>
              <li>id: tester</li>
              <li>pass: tester!</li>
            </ul>
          </li>
          <li>
            Account log in is restricted for an 1hour session for browsing only
            purpose.
          </li>
          <li>
            I will be keep on adding new features based on the feedback from
            logistics team members.
            <ul>
              <li>
                New features will be updated on my Github and my web page.
              </li>
            </ul>
          </li>
          <li>
            If you have any issue, improvement, suggestions or such, please feel
            free to email me!
          </li>
        </ol>
        <p>Once again thank you!</p>

        <div className="message-bottom__checkbox">
          <input
            type="checkbox"
            defaultChecked={props.checkbox}
            onChange={() => {
              props.setCheckbox(!props.checkbox);
            }}
          />{" "}
          Do not show this message for today.
          <LoginBtn
            className="loginBtn btnTwo"
            placeholder="Close"
            onClick={() => {
              closeHandler();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
