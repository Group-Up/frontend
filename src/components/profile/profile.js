import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as routes from '../../utils/routes';
import * as profileActions from '../../actions/profileAction';
import * as imageActions from '../../actions/image';

import autoBind from '../../utils/autobind';
import ProfileForm from '../profile-form/profile-form';
import ImageForm from '../image-form/image-form';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

    autoBind.call(this, Profile);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  render() {
    const { profile } = this.props;

    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (profile) {
      JSXEditing =
        <div>
          <ProfileForm profile={profile} onComplete={this.handleUpdate} />
          <button onClick={() => this.setState({ editing: false })}> Cancel</button>
        </div>;
      JSXDisplay =
        <div>
          <button onClick={() => this.setState({ editing: true })}> Edit</button>
        </div>;

      JSXProfile =
        <div>
          <p>{profile.bio}</p>
          {this.state.editing ? JSXEditing : JSXDisplay}
        </div>;
    }
    return (
      <div>
        <h1>PROFILE</h1>
        {profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate} />}
        <ImageForm onComplete={this.props.doCreateImage} /> 
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileUpdate: PropTypes.func,
  profileCreate: PropTypes.func,
  doCreateImage: PropTypes.func,
  history: PropTypes.object,
};


const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileActions.profileCreateRequest(profile)),
  profileUpdate: profile => dispatch(profileActions.profileUpdateRequest(profile)),
  doCreateImage: image => dispatch(imageActions.createRequest(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
