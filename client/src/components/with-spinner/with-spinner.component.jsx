import React from 'react';

import Spinner from '../spinner/spinner.component';

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    const SpinnerComponent = (
        <Spinner />
    );

    return isLoading ? SpinnerComponent : <WrappedComponent {...otherProps} />
}

export default WithSpinner;