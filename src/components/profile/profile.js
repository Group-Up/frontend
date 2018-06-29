import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as routes from '../../utils/routes';
import * as profileActions from '../../actions/profile';
import * as imageActions from '../../actions/image';
import autoBind from '../../utils/autobind';
import ProfileForm from '../profile-form/profile-form';
import ImageForm from '../image-form/image-form';
import './profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editingImage: false,
    };

    autoBind.call(this, Profile);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      });
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  handleImageUpdate(profile, image) {
    this.props.profileImageUpdate(profile, image);
    this.setState({ editingImage: false });
  }

  render() {
    const { profile } = this.props;

    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;
    let JSXUpdatingImage = null;

    if (profile) {
      JSXEditing =
        <div className='profile-display'>
          <ProfileForm profile={profile} onComplete={this.handleUpdate} />
          <button onClick={() => this.setState({ editing: false })}> Cancel </button>
        </div>;
      JSXUpdatingImage = 
        <div className='profile-display'>
          <ImageForm 
            profile={profile} 
            show={this.props.showCaption} 
            onComplete={this.handleImageUpdate}
          />
          <button onClick={() => this.setState({ editingImage: false })}> Cancel </button>
        </div>;
      JSXDisplay =
        <div className='profile-display'>
          <button onClick={() => this.setState({ editing: true })}> Edit Bio </button>
          <button onClick={() => this.setState({ editingImage: true })}> 
            Edit Profile Image 
          </button>
        </div>;
      JSXProfile =
        <div>
          <img src={profile.profileImage}/>
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          {!this.state.editing && !this.state.editingImage ? JSXDisplay : undefined}
          {this.state.editing && JSXEditing}
          {this.state.editingImage && JSXUpdatingImage}
        </div>;
    }
    return (
      <div className='profile'>
        {profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate} />}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileUpdate: PropTypes.func,
  profileCreate: PropTypes.func,
  doCreateImage: PropTypes.func,
  profileImageUpdate: PropTypes.func,
  history: PropTypes.object,
  showCaption: PropTypes.bool,
};


const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileActions.profileCreateRequest(profile)),
  profileUpdate: profile => dispatch(profileActions.profileUpdateRequest(profile)),
  profileImageUpdate: (profile, image) => {
    return dispatch(profileActions.profileUpdateImage(profile, image));
  },
  doCreateImage: image => dispatch(imageActions.createRequest(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
