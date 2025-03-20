module.exports = {
  handleError(err) {
    let errors = {
      username: '',
      email: '',
      password: '',
    };

    if (err.message === 'incorrect email') {
      errors.email = 'Incorrect email!';
    }

    if (err.message === 'incorrect password') {
      errors.password = 'Incorrect password!';
    }

    // unique field validation through err.code
    if (err.code === 11000) {
      errors.email = 'This user already exists!';
      return errors;
    }

    // all other validations
    if (err.message.includes('User validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }

    return errors;
  },
};
