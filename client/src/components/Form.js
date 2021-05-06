/**
 * From Treehouse Workshop React Authentication
* This functional component renders validation errors sent from API via 
  <ErrorsDisplay> function component
 * Renders and handles functionality for 'submit' and 'cancel' buttons
 * Parent component will pass down data it needs
 */

import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
            {elements()}
            <button className="button" type="submit">{submitButtonText}</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
      </div>
    );
  }

  return errorsDisplay;
}
