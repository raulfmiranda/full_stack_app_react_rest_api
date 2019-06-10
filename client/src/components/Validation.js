import React from 'react';

const Validation = ({ emptyValues }) => {

    if (emptyValues.length > 0) {
        return (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {emptyValues.map(v => <li key={v}>Please provide a value for "{v}"</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return null;
}

export default Validation;