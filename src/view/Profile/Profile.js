import { CircularProgress, Modal } from "@material-ui/core";
import { toast } from 'react-toastify';
import React from "react";
import { USER_STORAGE } from "constants/storage";
import { MENU } from "constants/menu";
import { removeStorage } from "utils/storage.helper";
import { isUndefined } from "lodash";


export default class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: {},
      isConfirmModal: false,
    };
  }
  componentDidMount = async () => {
    const { user } = this.props;
    await this.props.getUser(user.id, user.token);
    this.setState({
      profile: this.props.profile?.data,
    });
  };
  notifyCreate = (message) => {
    toast.success(`${message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
notifyFailed = (message) => {
    toast.error(`${message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
handleAuth = () => {
    removeStorage(USER_STORAGE)
    this.props.resetAuthorize()
    this.props.navigateTo(MENU.LOGIN)
}
  handleUpdateProfile = async (profile) => {
      const {isConfirmModal} = this.state;
    const { user } = this.props;
    delete profile.created;
    delete profile.createdBy;
    delete profile.updated;
    delete profile.updatedBy;
    await this.props.updateProfile(profile, user.token);
    if (this.props.updateResponse) {
        this.setState({isConfirmModal:!isConfirmModal})
        setInterval(this.handleAuth(),5000)
        
    }else{
        this.notifyFailed('User unsuccessful updated!')
        this.setState({isConfirmModal:!isConfirmModal})
    }
  };
  handleShowModal = (data) => {
    const { isConfirmModal } = this.state;
    this.setState({ isConfirmModal: !isConfirmModal });
  };

  
  renderProfile = () => {
    const { profile } = this.state;
    return (
      <div
        class="ui form"
        style={{ backgroundColor: "white", padding: "10px" }}
      >
        <div class="field">
          <label>Name</label>
          <input
            type="text"
            name="first-name"
            placeholder="Name"
            value={isUndefined(profile) ? null : profile.name }
            onChange={(e) =>
              this.setState({ profile: { ...profile, name: e.target.value } })
            }
          />
        </div>
        <div class="field">
          <label>Username</label>
          <input 
            placeholder={profile?.userName} 
            value={profile?.userName}
            onChange={(e) => this.setState({ profile: { ...profile, userName: e.target.value } })}
          />
        </div>
        <div class="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={profile?.password}
            onChange={(e) =>
              this.setState({
                profile: { ...profile, password: e.target.value },
              })
            }
          />
          {profile?.password?.length < 5 ? (
            <div className="error-text">{"Password min 5 character"}</div>
          ) : null}
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={profile?.confirmPassword}
            onChange={(e) =>
              this.setState({
                profile: { ...profile, confirmPassword: e.target.value },
              })
            }
          />
          {profile?.password !== profile?.confirmPassword ? (
            <div className="error-text">{`Password Not Match`}</div>
          ) : null}
        </div>
        <button
          disabled={profile?.password !== profile?.confirmPassword}
          class="ui button"
          onClick={() => this.handleShowModal(profile)}
        >
          Update
        </button>
      </div>
    );
  };
  render() {
    const { isLoading } = this.props;
    const {profile,isConfirmModal} = this.state;
    if (isLoading) {
      return <CircularProgress className="circular-progress" size={100} />;
    }
    return (
      <div className="container">
        {this.renderProfile()}
        <Modal open={isConfirmModal} className="modal-pop-up">
        <div className="modal-container">
          <div className="modal-header">Update User</div>
          <div className="modal-content">
            <p>Are you sure want to update this user ?</p>
          </div>
          <div className="modal-action">
            <button
              className="button-action"
              onClick={() => this.setState({ isConfirmModal: !isConfirmModal })}
            >
              No
            </button>
            <button
              className="button-action"
              onClick={() => this.handleUpdateProfile(profile)}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      </div>
    );
  }
}
